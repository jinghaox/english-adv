import { SCENARIOS } from '../data/sentences.js';
import { state, save, touchStreak } from '../lib/store.js';
import { esc, toast } from '../lib/util.js';
import { speak, canSpeak, canListen, listen } from '../lib/speech.js';
import { hasKey, ask, errorText, learnerLine } from '../lib/ai.js';
import { cachedHeadlines } from './read.js';

const textOf = (m) =>
  typeof m.content === 'string'
    ? m.content
    : m.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');

function systemPrompt() {
  const sc = SCENARIOS.find((s) => s.id === state.chat.scenario) || SCENARIOS[0];
  const headlines = sc.id === 'news' ? cachedHeadlines().slice(0, 6) : [];
  return `You are a friendly, sharp English conversation partner for a native Chinese speaker. Their English level is ${learnerLine()}.

Scenario: ${sc.prompt}${headlines.length ? `\n\nRecent headlines:\n${headlines.map((h) => '- ' + h).join('\n')}` : ''}

How to talk:
- Speak natural, idiomatic English pitched slightly above the learner's level. Keep each reply to at most three short paragraphs and end with a question that keeps the conversation going.
- If the learner's latest message contained grammar mistakes, unnatural phrasing, or a clearly better word choice, finish your reply with a section that starts with the line "✏️ Corrections" and lists each fix as: original → improved, followed by a brief reason in Chinese. Leave the section out entirely when nothing needs fixing.
- If the learner writes in Chinese, show them how to say it in English, then carry on.
- Plain text only: no markdown, no asterisks, no headings.`;
}

export default function chat(root) {
  if (!hasKey()) {
    root.innerHTML = `
      <h1>AI 对话</h1>
      <div class="card">
        <h3>需要 Claude API 密钥</h3>
        <p class="muted">对话练习由 Claude 提供。在设置中填写你自己的 Anthropic API 密钥后即可使用;密钥只保存在这台手机的浏览器里。</p>
        <a class="btn primary block" href="#/settings">去设置</a>
      </div>`;
    return;
  }

  let busy = false;
  root.innerHTML = `
    <div class="row spread">
      <h1>AI 对话</h1>
      <button id="new" class="ghost small">新对话</button>
    </div>
    <select id="scenario">${SCENARIOS.map((s) => `<option value="${s.id}" ${s.id === state.chat.scenario ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select>
    <div class="chat-log mt" id="log"></div>`;

  const composer = document.createElement('div');
  composer.className = 'composer';
  composer.innerHTML = `<div class="row">
      ${canListen ? '<button class="icon" id="mic" aria-label="语音输入">🎤</button>' : ''}
      <textarea id="input" rows="1" class="grow" placeholder="Type in English…" autocapitalize="sentences"></textarea>
      <button class="primary" id="send">发送</button>
    </div>`;
  document.body.appendChild(composer);

  const log = root.querySelector('#log');
  const input = composer.querySelector('#input');
  const scrollDown = () => window.scrollTo(0, document.body.scrollHeight);

  function bubble(role, text) {
    const el = document.createElement('div');
    el.className = `bubble ${role}`;
    el.innerHTML = `<span class="t">${esc(text)}</span>`;
    if (role === 'assistant' && canSpeak) {
      const say = document.createElement('div');
      say.className = 'say';
      say.textContent = '🔊 朗读';
      say.onclick = () => speak(el.querySelector('.t').textContent.split('✏️')[0]);
      el.appendChild(say);
    }
    log.appendChild(el);
    return el;
  }

  function renderAll() {
    log.innerHTML = '';
    // 第一条是隐藏的开场指令,不显示
    state.chat.messages.slice(1).forEach((m) => bubble(m.role, textOf(m)));
    scrollDown();
  }

  async function run() {
    busy = true;
    const el = bubble('assistant', '');
    el.querySelector('.t').innerHTML = '<span class="spinner"></span>';
    scrollDown();
    try {
      const res = await ask({
        system: systemPrompt(),
        messages: state.chat.messages,
        onText: (t) => {
          el.querySelector('.t').textContent = t;
          scrollDown();
        },
      });
      // 原样保存完整内容块(含思考块),下一轮必须原样回传
      state.chat.messages.push({ role: 'assistant', content: res.content });
      save();
      el.querySelector('.t').textContent = res.text;
      touchStreak();
    } catch (e) {
      el.remove();
      toast(errorText(e));
      // 回滚没有得到回复的那条用户消息,方便重发
      const last = state.chat.messages[state.chat.messages.length - 1];
      if (last?.role === 'user') {
        state.chat.messages.pop();
        if (state.chat.messages.length) {
          input.value = textOf(last);
          log.lastElementChild?.remove();
        }
        save();
      }
      if (!state.chat.messages.length) {
        log.innerHTML = `<div class="card"><p class="muted">${esc(errorText(e))}</p><button class="primary block" id="retry">重试</button></div>`;
        log.querySelector('#retry').onclick = () => {
          if (!busy) start();
        };
      }
    }
    busy = false;
    scrollDown();
  }

  function start() {
    state.chat.messages = [{ role: 'user', content: 'Hi! Please start the conversation.' }];
    save();
    renderAll();
    run();
  }

  function send() {
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    state.chat.messages.push({ role: 'user', content: text });
    save();
    bubble('user', text);
    run();
  }

  composer.querySelector('#send').onclick = send;
  root.querySelector('#new').onclick = () => {
    if (!busy) start();
  };
  root.querySelector('#scenario').onchange = (e) => {
    if (busy) {
      e.target.value = state.chat.scenario;
      return;
    }
    state.chat.scenario = e.target.value;
    start();
  };

  const mic = composer.querySelector('#mic');
  let stop = null;
  mic?.addEventListener('click', () => {
    if (stop) {
      stop();
      return;
    }
    const before = input.value ? input.value.trim() + ' ' : '';
    mic.classList.add('rec');
    stop = listen({
      sustained: true, // 说话中途停顿不会被打断,再点一次麦克风结束
      onText: (t) => {
        input.value = before + t;
      },
      onError: (msg) => toast(msg),
      onEnd: () => {
        stop = null;
        mic.classList.remove('rec');
      },
    });
    if (!stop) mic.classList.remove('rec');
  });

  if (state.chat.messages.length > 1) renderAll();
  else start();
}
