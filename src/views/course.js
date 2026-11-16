import { LESSONS } from '../data/course.js';
import { state, save, touchStreak } from '../lib/store.js';
import { esc, dayKey } from '../lib/util.js';
import { speak, canSpeak } from '../lib/speech.js';

// 把课程摊平成一个序列,句子的编号就是它在序列里的下标
const FLAT = LESSONS.flatMap((l, li) => l.items.map((it) => ({ ...it, li, lesson: l.title, intro: l.intro })));
const DAILY = 3;

// 跨天时重置当天计数
function sync() {
  const c = state.course;
  if (c.day !== dayKey()) {
    c.day = dayKey();
    c.today = 0;
    c.extra = 0;
    save();
  }
  return c;
}

export function courseStatus() {
  const c = sync();
  return { today: Math.min(c.today, DAILY), daily: DAILY, learned: c.idx, total: FLAT.length };
}

// 下一句学什么:每一组(3 句)的第一句优先复习之前标记“还要再练”的;新句学完后只剩复习
function nextUp(c) {
  const reviewFirst = c.review.length && (c.today % DAILY === 0 || c.idx >= FLAT.length);
  if (reviewFirst) return { id: c.review[0], isReview: true };
  if (c.idx < FLAT.length) return { id: c.idx, isReview: false };
  return null;
}

function analysisHtml(it, step) {
  return `
    ${
      step >= 1
        ? `<div class="card"><h3>① 主干</h3><p style="margin:0;font-family:Georgia,serif;font-size:17px">${esc(it.core)}</p></div>`
        : ''
    }
    ${
      step >= 2
        ? `<div class="card"><h3>② 拆解</h3>${it.parts
            .map(
              ([en, note]) => `<div class="part"><div class="en">${esc(en)}</div><div class="muted small">${esc(note)}</div></div>`,
            )
            .join('')}</div>`
        : ''
    }
    ${
      step >= 3
        ? `<div class="card"><h3>③ 译文</h3><p>${esc(it.zh)}</p>
             <div class="root" style="margin-top:8px"><b>💡 技巧</b> ${esc(it.tip)}</div></div>`
        : ''
    }`;
}

export default function course(root) {
  const c = sync();

  function done() {
    const left = FLAT.length - c.idx;
    const canMore = left > 0 || c.review.length > 0;
    const finishedAll = left === 0;
    const learned = LESSONS.map((l, li) => ({ l, items: FLAT.map((it, id) => ({ it, id })).filter((x) => x.it.li === li && x.id < c.idx) })).filter(
      (g) => g.items.length,
    );
    root.innerHTML = `
      <a href="#/read" class="small">‹ 返回阅读列表</a>
      <h1>长难句课程</h1>
      <div class="card center">
        <div style="font-size:44px">${c.today >= DAILY ? '🎉' : '📘'}</div>
        <h3>${c.today >= DAILY ? `今天的 ${DAILY} 句学完了` : '课程已全部学完'}</h3>
        <p class="muted small">已学 ${c.idx} / ${FLAT.length} 句${c.review.length ? ` · ${c.review.length} 句待复习` : ''}${
          finishedAll ? ' · 新句已全部学完' : ''
        }</p>
        ${canMore ? `<button class="primary" id="more">再学 ${DAILY} 句</button>` : ''}
      </div>
      ${learned.length ? '<h2>已学句子</h2>' : ''}
      ${learned
        .map(
          (g) => `<div class="card"><h3>${esc(g.l.title)}</h3>
            ${g.items
              .map(
                ({ it, id }) => `<details class="learned"><summary>${esc(it.s)} ${c.review.includes(id) ? '<span class="tag">待复习</span>' : ''}</summary>
                  ${analysisHtml(it, 3)}</details>`,
              )
              .join('')}</div>`,
        )
        .join('')}`;
    root.querySelector('#more')?.addEventListener('click', () => {
      c.extra = (c.extra || 0) + DAILY;
      save();
      next();
    });
    window.scrollTo(0, 0);
  }

  function next() {
    if (c.today >= DAILY + (c.extra || 0)) return done();
    const up = nextUp(c);
    if (!up) return done();
    study(up);
  }

  function study({ id, isReview }) {
    const it = FLAT[id];
    const pos = (c.today % DAILY) + 1;
    const firstOfLesson = !isReview && id % LESSONS[it.li].items.length === 0;
    let step = 0;
    const LABELS = ['先自己读一遍,然后看主干', '看拆解', '看译文和技巧'];

    function render() {
      root.innerHTML = `
        <a href="#/read" class="small">‹ 返回阅读列表</a>
        <div class="row spread small muted" style="margin-top:10px">
          <span>今日第 ${pos} / ${DAILY} 句</span>
          <span>${isReview ? '<span class="tag gray">复习</span>' : `<span class="tag">第 ${it.li + 1} 课 · ${esc(it.lesson)}</span>`}</span>
        </div>
        <div class="progress"><i style="width:${((pos - 1 + step / 4) / DAILY) * 100}%"></i></div>
        ${firstOfLesson && step === 0 ? `<div class="card small"><b>本课要点</b> ${esc(it.intro)}</div>` : ''}
        <div class="quote">${esc(it.s)}</div>
        ${canSpeak ? '<div style="margin-bottom:12px"><button id="say">🔊 朗读</button></div>' : ''}
        ${analysisHtml(it, step)}
        ${
          step < 3
            ? `<button class="primary block" id="reveal">${LABELS[step]}</button>`
            : `<p class="center small muted">这句话你现在能自己读懂了吗?</p>
               <div class="row">
                 <button class="grow" id="hard">还要再练</button>
                 <button class="grow primary" id="ok">看懂了</button>
               </div>`
        }`;
      root.querySelector('#say')?.addEventListener('click', () => speak(it.s));
      root.querySelector('#reveal')?.addEventListener('click', () => {
        step++;
        render();
        root.querySelector('#reveal, #ok')?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      });
      const finish = (hard) => {
        if (isReview) c.review = c.review.filter((x) => x !== id);
        else c.idx++;
        if (hard) c.review.push(id); // 放到复习队列末尾,之后再出现
        c.today++;
        save();
        touchStreak();
        window.scrollTo(0, 0);
        next();
      };
      root.querySelector('#ok')?.addEventListener('click', () => finish(false));
      root.querySelector('#hard')?.addEventListener('click', () => finish(true));
    }
    render();
  }

  next();
}
