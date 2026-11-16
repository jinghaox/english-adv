import { PRACTICE } from '../data/sentences.js';
import { state, touchStreak } from '../lib/store.js';
import { esc, matchWords, shuffle } from '../lib/util.js';
import { speak, canSpeak, canListen, listen, stopListen } from '../lib/speech.js';

let mode = 'shadow';
let order = null;
let idx = 0;

function buildOrder() {
  const lv = state.profile?.level ?? 3;
  const pref = lv >= 4 ? [3, 2, 1] : lv === 3 ? [2, 3, 1] : [1, 2, 3];
  return pref.flatMap((l) => shuffle(PRACTICE.filter((p) => p.lv === l)));
}

const LV = { 1: '中高级', 2: '高级', 3: '精通' };

export default function speakView(root) {
  if (!order) order = buildOrder();

  function render() {
    stopListen();
    const item = order[idx % order.length];
    root.innerHTML = `
      <h1>听力与口语</h1>
      <div class="seg">
        <button data-m="shadow" class="${mode === 'shadow' ? 'on' : ''}">🎤 跟读</button>
        <button data-m="dictation" class="${mode === 'dictation' ? 'on' : ''}">✍️ 听写</button>
      </div>
      <div class="row spread small muted"><span>第 ${(idx % order.length) + 1} / ${order.length} 句</span><span class="tag gray">${LV[item.lv]}</span></div>
      <div id="pane" class="mt"></div>
      <div class="row mt">
        <button class="grow" id="prev">‹ 上一句</button>
        <button class="grow" id="next">下一句 ›</button>
      </div>`;
    root.querySelectorAll('.seg button').forEach((b) => {
      b.onclick = () => {
        mode = b.dataset.m;
        render();
      };
    });
    root.querySelector('#prev').onclick = () => {
      idx = (idx - 1 + order.length) % order.length;
      render();
    };
    root.querySelector('#next').onclick = () => {
      idx++;
      render();
    };
    const pane = root.querySelector('#pane');
    const playRow = canSpeak
      ? `<div class="row"><button class="grow" id="play">🔊 播放</button><button class="grow" id="slow">🐢 慢速</button></div>`
      : '<div class="card small muted">这个浏览器不支持语音朗读。</div>';
    const bindPlay = () => {
      pane.querySelector('#play')?.addEventListener('click', () => speak(item.s));
      pane.querySelector('#slow')?.addEventListener('click', () => speak(item.s, { rate: 0.65 }));
    };
    const diffHtml = (res) =>
      `<div class="diff">${res.parts.map((p) => `<span class="${p.ok ? 'ok' : 'no'}">${esc(p.w)}</span>`).join('')}</div>`;
    const verdict = (score) => (score >= 90 ? '非常好 🎉' : score >= 70 ? '不错,注意标红的词' : '再听一遍,多练几次');

    if (mode === 'shadow') {
      pane.innerHTML = `
        <div class="card"><div class="quote" style="margin:0">${esc(item.s)}</div></div>
        ${playRow}
        ${
          canListen
            ? '<button class="primary block mt" id="rec">🎤 开始跟读</button>'
            : '<div class="card small muted mt">这个浏览器不支持语音识别。请在 Android 的 Chrome 中打开本应用来使用跟读打分。</div>'
        }
        <div id="out" class="mt"></div>`;
      bindPlay();
      const rec = pane.querySelector('#rec');
      const out = pane.querySelector('#out');
      let stop = null;
      rec?.addEventListener('click', () => {
        if (stop) {
          stop();
          return;
        }
        out.innerHTML = '<p class="muted small">正在听…中间可以停顿,不用着急。读完后点“结束”(停顿超过 8 秒会自动结束)。</p><p id="live"></p>';
        rec.textContent = '⏹ 读完了,结束';
        rec.classList.add('rec');
        stop = listen({
          sustained: true,
          onText: (t) => {
            const live = out.querySelector('#live');
            if (live) live.textContent = t;
          },
          onError: (msg) => {
            out.innerHTML = `<div class="card small muted">${esc(msg)}</div>`;
          },
          onEnd: (finalText) => {
            stop = null;
            if (!rec.isConnected) return;
            rec.textContent = '🎤 再读一次';
            rec.classList.remove('rec');
            if (!finalText) {
              if (out.querySelector('#live')) out.innerHTML = '<div class="card small muted">没有识别到内容,请再试一次。</div>';
              return;
            }
            const res = matchWords(item.s, finalText);
            out.innerHTML = `<div class="card">
              <div class="row spread"><h3>${res.score} 分</h3><span class="muted small">${verdict(res.score)}</span></div>
              ${diffHtml(res)}
              <p class="small muted" style="margin:6px 0 0">识别结果:${esc(finalText)}</p>
            </div>`;
            touchStreak();
          },
        });
        if (!stop) {
          rec.textContent = '🎤 开始跟读';
          rec.classList.remove('rec');
        }
      });
    } else {
      pane.innerHTML = `
        <div class="card small muted">听句子,把听到的内容完整写下来。可以反复播放。</div>
        ${playRow}
        <textarea id="ans" rows="4" class="mt" placeholder="在这里输入你听到的句子…" autocapitalize="sentences" autocomplete="off" autocorrect="off" spellcheck="false"></textarea>
        <button class="primary block mt" id="check">检查</button>
        <div id="out" class="mt"></div>`;
      bindPlay();
      pane.querySelector('#check').onclick = () => {
        const val = pane.querySelector('#ans').value.trim();
        if (!val) return;
        const res = matchWords(item.s, val);
        pane.querySelector('#out').innerHTML = `<div class="card">
          <div class="row spread"><h3>${res.score} 分</h3><span class="muted small">${verdict(res.score)}</span></div>
          ${diffHtml(res)}
          <p class="small muted" style="margin:6px 0 0">原句:${esc(item.s)}</p>
        </div>`;
        touchStreak();
      };
    }
  }

  render();
}
