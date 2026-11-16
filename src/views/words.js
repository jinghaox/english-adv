import { state, buildQueue, gradeCard, removeCard } from '../lib/store.js';
import { esc } from '../lib/util.js';
import { speak, canSpeak } from '../lib/speech.js';
import { ROOTS } from '../data/roots.js';
import { EXAMPLES } from '../data/examples.js';

let tab = 'review';

export default function wordsView(root) {
  function frame(inner) {
    root.innerHTML = `
      <h1>单词</h1>
      <div class="seg">
        <button data-t="review" class="${tab === 'review' ? 'on' : ''}">今日复习</button>
        <button data-t="book" class="${tab === 'book' ? 'on' : ''}">生词本 (${Object.keys(state.cards).length})</button>
      </div>
      <div id="pane">${inner}</div>`;
    root.querySelectorAll('.seg button').forEach((b) => {
      b.onclick = () => {
        tab = b.dataset.t;
        tab === 'review' ? review() : book();
      };
    });
    return root.querySelector('#pane');
  }

  function review() {
    const q = buildQueue();
    const queue = [...q.due, ...q.fresh];
    const total = queue.length;
    let doneCount = 0;

    function next() {
      const card = queue.shift();
      if (!card) {
        frame(`<div class="card center">
          <div style="font-size:44px">🎉</div>
          <h3>${total ? '今天的单词学完了' : '现在没有需要复习的单词'}</h3>
          <p class="muted small">${total ? `本次完成 ${doneCount} 张卡片。` : ''}每天新词上限 ${state.settings.newPerDay} 个,可在设置中调整。阅读时点词也能把生词加进来。</p>
          <a class="btn primary" href="#/read">去阅读</a>
        </div>`);
        return;
      }
      // 内置例句(带翻译)优先;自己加入的生词用加入时的原文句子
      const [exEn, exZh] = EXAMPLES[card.w] || [card.ex || '', ''];
      const pane = frame(`
        <div class="row spread small muted"><span>${card.isNew ? '<span class="tag">新词</span>' : '<span class="tag gray">复习</span>'}</span><span>剩余 ${queue.length + 1}</span></div>
        <div class="progress"><i style="width:${total ? (doneCount / total) * 100 : 0}%"></i></div>
        <div class="card center" style="padding:28px 16px">
          <div class="word-big" style="margin-top:6px">${esc(card.w)}</div>
          ${canSpeak ? '<button class="ghost icon" id="say" aria-label="朗读">🔊</button>' : ''}
          <div id="back" hidden>
            <p style="font-size:18px;margin-top:14px">${esc(card.zh)}</p>
            ${
              exEn
                ? `<div class="example">
                    <div class="en">${esc(exEn)} ${canSpeak ? '<span id="sayex" role="button" aria-label="朗读例句">🔊</span>' : ''}</div>
                    ${exZh ? `<div class="zh">${esc(exZh)}</div>` : ''}
                  </div>`
                : ''
            }
            ${ROOTS[card.w] ? `<div class="root"><b>🌱 词根</b> ${esc(ROOTS[card.w])}</div>` : ''}
          </div>
        </div>
        <button class="primary block" id="show">显示释义</button>
        <div id="grades" hidden>
          <p class="center small muted">你记得这个词吗?</p>
          <div class="row">
            <button class="grow danger" data-g="0">忘了</button>
            <button class="grow" data-g="1">模糊</button>
            <button class="grow" data-g="2">记得</button>
            <button class="grow" data-g="3">很熟</button>
          </div>
        </div>`);
      pane.querySelector('#say')?.addEventListener('click', () => speak(card.w));
      pane.querySelector('#sayex')?.addEventListener('click', () => speak(exEn));
      pane.querySelector('#show').onclick = () => {
        pane.querySelector('#back').hidden = false;
        pane.querySelector('#grades').hidden = false;
        pane.querySelector('#show').hidden = true;
      };
      pane.querySelectorAll('[data-g]').forEach((b) => {
        b.onclick = () => {
          const g = +b.dataset.g;
          const saved = gradeCard(card, g);
          if (g === 0) queue.push({ ...saved }); // 忘了的词本轮稍后再出现一次
          else doneCount++;
          next();
        };
      });
    }
    next();
  }

  function book() {
    const cards = Object.values(state.cards).sort((a, b) => b.added - a.added);
    const fmt = (c) => {
      if (c.isNew) return '<span class="tag">未学</span>';
      const days = Math.ceil((c.due - Date.now()) / 86400000);
      return `<span class="tag gray">${days <= 0 ? '待复习' : days + ' 天后'}</span>`;
    };
    const pane = frame(
      cards.length
        ? `<div class="card">${cards
            .map(
              (c) => `<div class="list-item">
                <div class="grow"><b>${esc(c.w)}</b> ${fmt(c)}<div class="muted small">${esc(c.zh)}</div>
                  ${ROOTS[c.w] ? `<div class="muted small">🌱 ${esc(ROOTS[c.w])}</div>` : ''}</div>
                ${canSpeak ? `<button class="icon ghost" data-say="${esc(c.w)}" aria-label="朗读">🔊</button>` : ''}
                <button class="icon ghost" data-del="${esc(c.w)}" aria-label="删除">🗑️</button>
              </div>`,
            )
            .join('')}</div>`
        : '<div class="card center muted">生词本还是空的。<br>做完水平测试、开始复习或在阅读时点词,都会把单词加进来。</div>',
    );
    pane.querySelectorAll('[data-say]').forEach((b) => (b.onclick = () => speak(b.dataset.say)));
    pane.querySelectorAll('[data-del]').forEach(
      (b) =>
        (b.onclick = () => {
          removeCard(b.dataset.del);
          book();
        }),
    );
  }

  tab === 'review' ? review() : book();
}
