import { state } from './store.js';

const synth = window.speechSynthesis;
let voice = null;

function pickVoice() {
  if (!synth) return;
  const vs = synth.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  voice =
    vs.find((v) => /en[-_]US/i.test(v.lang) && /google|natural|samantha/i.test(v.name)) ||
    vs.find((v) => /en[-_]US/i.test(v.lang)) ||
    vs.find((v) => /en[-_]GB/i.test(v.lang)) ||
    vs[0] ||
    null;
}
if (synth) {
  pickVoice();
  synth.addEventListener?.('voiceschanged', pickVoice);
}

export const canSpeak = !!synth;

// 朗读文本。长文本按句切分逐句排队,避免部分浏览器朗读长段时中断。
export function speak(text, { rate, onend } = {}) {
  if (!synth) return;
  synth.cancel();
  const chunks = String(text).match(/[^.!?;—]+[.!?;—]*\s*/g) || [text];
  chunks.forEach((chunk, i) => {
    const u = new SpeechSynthesisUtterance(chunk.trim());
    u.lang = voice?.lang || 'en-US';
    if (voice) u.voice = voice;
    u.rate = rate ?? state.settings.rate;
    if (i === chunks.length - 1 && onend) u.onend = onend;
    synth.speak(u);
  });
}

export function stopSpeak() {
  synth?.cancel();
}

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canListen = !!SR;

let active = null;

const ERRORS = {
  'not-allowed': '麦克风权限被拒绝,请在浏览器设置中允许',
  'service-not-allowed': '语音识别服务不可用',
  'no-speech': '没有听到声音,请再试一次',
  network: '语音识别需要联网',
};

// 开始语音识别。返回 stop 函数;不支持时返回 null。
//
// sustained = true 时为“持续收听”:浏览器在说话人停顿 1–2 秒后会自行结束一次识别,
// 这里会立刻接着开下一次并把文字累加起来,直到用户手动结束,
// 或者连续 silenceMs 毫秒没有任何新内容(还没开口时放宽到 startMs)。
export function listen({ onText, onEnd, onError, sustained = false, silenceMs = 8000, startMs = 15000 }) {
  if (!SR) return null;
  stopListen();

  let rec = null;
  let done = ''; // 之前各次识别已确定的文字
  let sessionFinal = '';
  let interim = '';
  let stopped = false;
  let finished = false;
  let timer = null;

  const join = (...parts) => parts.join(' ').replace(/\s+/g, ' ').trim();
  const all = () => join(done, sessionFinal, interim);

  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    if (active === ctl) active = null;
    onEnd?.(all());
  };

  const stop = () => {
    stopped = true;
    clearTimeout(timer);
    try {
      rec?.stop();
    } catch {
      /* ignore */
    }
    setTimeout(finish, 1500); // 兜底:个别浏览器 stop 后不触发 onend
  };

  const arm = () => {
    if (!sustained) return;
    clearTimeout(timer);
    timer = setTimeout(stop, all() ? silenceMs : startMs);
  };

  function startSession() {
    rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      sessionFinal = '';
      interim = '';
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) sessionFinal += t + ' ';
        else interim += t;
      }
      onText?.(all());
      arm();
    };
    rec.onerror = (e) => {
      // 持续收听时,停顿造成的 no-speech 不算错误,接着听
      if (sustained && !stopped && (e.error === 'no-speech' || e.error === 'aborted')) return;
      if (stopped && e.error === 'aborted') return;
      stopped = true;
      onError?.(ERRORS[e.error] || `语音识别出错:${e.error}`);
    };
    rec.onend = () => {
      done = all();
      sessionFinal = '';
      interim = '';
      if (sustained && !stopped) {
        try {
          startSession();
          return;
        } catch {
          /* 无法续听则就此结束 */
        }
      }
      finish();
    };
    rec.start();
  }

  const ctl = {
    abort() {
      stopped = true;
      clearTimeout(timer);
      try {
        rec?.abort();
      } catch {
        /* ignore */
      }
    },
  };

  try {
    startSession();
  } catch {
    onError?.('无法启动语音识别');
    return null;
  }
  active = ctl;
  arm();
  return stop;
}

export function stopListen() {
  active?.abort();
  active = null;
}
