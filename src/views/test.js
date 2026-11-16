import { BANDS, VOCAB, SENTENCES, LEVELS, vocabLevel, sentenceLevel } from '../data/test.js';
import { state, save, addCard } from '../lib/store.js';
import { esc, shuffle } from '../lib/util.js';
import { speak, canSpeak } from '../lib/speech.js';

export default function test(root) {
  let vocabItems = [];
  let sentItems = [];
  let i = 0;
  const vocabAns = []; // true / false
  const sentAns = [];

  function intro() {
    root.innerHTML = `
      <h1>水平测试</h1>
      <div class="card">
        <h3>第一部分 · 词汇量(40 题)</h3>
        <p class="muted">由易到难,选出单词的中文意思。<b>不认识请直接选“不认识”,不要猜</b>,否则估算会偏高。</p>
        <h3 class="mt">第二部分 · 长难句理解(8 题)</h3>
        <p class="muted">读一个结构复杂的英文长句,选出最准确的中文理解。</p>
        <p class="small muted">全程约 8 分钟。答错的词会自动加入你的生词本。</p>
      </div>
      <button class="primary block" id="go">开始</button>
      ${state.profile ? '<p class="center small muted mt">重新测试会覆盖上一次的结果</p>' : ''}`;
    root.querySelector('#go').onclick = () => {
      vocabItems = VOCAB.map((v) => {
        const pool = shuffle(VOCAB.filter((o) => o.pos === v.pos && o.w !== v.w)).slice(0, 3);
        return { ...v, opts: shuffle([v.zh, ...pool.map((o) => o.zh)]) };
      });
      sentItems = SENTENCES.map((s) => ({ ...s, shuffled: shuffle(s.opts) }));
      i = 0;
      vocabQ();
    };
  }

  function vocabQ() {
    const it = vocabItems[i];
    root.innerHTML = `
      <div class="row spread small muted"><span>词汇量 · ${i + 1} / ${vocabItems.length}</span><span>词频段 ${esc(BANDS[it.band].name)}</span></div>
      <div class="progress"><i style="width:${(i / vocabItems.length) * 100}%"></i></div>
      <div class="word-big">${esc(it.w)}</div>
      <div class="center" style="margin-bottom:22px">${canSpeak ? '<button class="ghost icon" id="say" aria-label="朗读">🔊</button>' : ''}</div>
      ${it.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}
      <button class="opt dim" data-k="-1">不认识</button>`;
    root.querySelector('#say')?.addEventListener('click', () => speak(it.w));
    root.querySelectorAll('.opt').forEach((b) => {
      b.onclick = () => {
        vocabAns[i] = it.opts[+b.dataset.k] === it.zh;
        i++;
        if (i < vocabItems.length) vocabQ();
        else {
          i = 0;
          bridge();
        }
      };
    });
  }

  function bridge() {
    root.innerHTML = `
      <h1>词汇部分完成 👍</h1>
      <div class="card">
        <h3>接下来:长难句理解</h3>
        <p class="muted">共 8 句,难度递增。请仔细读完整句再作答,看不懂就选“看不懂”。</p>
      </div>
      <button class="primary block" id="go">继续</button>`;
    root.querySelector('#go').onclick = sentQ;
  }

  function sentQ() {
    const it = sentItems[i];
    root.innerHTML = `
      <div class="small muted">长难句理解 · ${i + 1} / ${sentItems.length}</div>
      <div class="progress"><i style="width:${(i / sentItems.length) * 100}%"></i></div>
      <div class="quote">${esc(it.s)}</div>
      <p class="muted small">这句话的意思最接近:</p>
      ${it.shuffled.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}
      <button class="opt dim" data-k="-1">看不懂</button>`;
    root.querySelectorAll('.opt').forEach((b) => {
      b.onclick = () => {
        sentAns[i] = it.shuffled[+b.dataset.k] === it.opts[0];
        i++;
        if (i < sentItems.length) sentQ();
        else result();
      };
    });
    window.scrollTo(0, 0);
  }

  function result() {
    const perBand = BANDS.map((b, bi) => {
      const idx = vocabItems.map((v, k) => (v.band === bi ? k : -1)).filter((k) => k >= 0);
      const right = idx.filter((k) => vocabAns[k]).length;
      return { ...b, right, total: idx.length };
    });
    const vocab = Math.round(perBand.reduce((sum, b) => sum + (b.right / b.total) * b.width, 0) / 100) * 100;
    const sCorrect = sentAns.filter(Boolean).length;
    const vLevel = vocabLevel(vocab);
    const sLevel = sentenceLevel(sCorrect);
    const level = Math.floor((vLevel + sLevel) / 2);

    state.profile = { vocab, vLevel, sCorrect, sTotal: sentItems.length, sLevel, level, date: Date.now() };
    // 答错的词加入生词本(最冷僻的一档只作测量用,不强行加入)
    const missed = vocabItems.filter((v, k) => !vocabAns[k] && v.band < 7);
    missed.forEach((v) => addCard(v.w, v.zh));
    save();

    const advice =
      sLevel < vLevel
        ? '你的词汇量领先于长难句理解。建议多做“阅读”里的经典文学选段,并用 AI 精读拆解句子结构。'
        : vLevel < sLevel
          ? '你的句子理解能力领先于词汇量。建议每天坚持“单词”复习,并在阅读时多点词查词、加入生词本。'
          : '词汇和句子理解比较均衡。保持时事与经典交替阅读,并用对话练习把被动词汇变成主动表达。';

    const wrongSents = sentItems.filter((_, k) => !sentAns[k]);

    root.innerHTML = `
      <h1>测试结果</h1>
      <div class="card hero">
        <div class="muted small">综合水平</div>
        <div class="big">${LEVELS[level].code} <span style="font-size:18px;font-weight:500">${LEVELS[level].name}</span></div>
        <div class="stats">
          <div><b>${vocab.toLocaleString()}</b><span>估算词汇量</span></div>
          <div><b>${LEVELS[vLevel].code}</b><span>词汇水平</span></div>
          <div><b>${sCorrect}/${sentItems.length} · ${LEVELS[sLevel].code}</b><span>长难句</span></div>
        </div>
      </div>
      <div class="card"><h3>学习建议</h3><p class="muted" style="margin:0">${advice}</p></div>
      <h2>各词频段正确率</h2>
      <div class="card">
        ${perBand
          .map(
            (b) => `<div class="row small" style="margin-bottom:8px">
              <span style="width:92px" class="muted">${esc(b.name)}</span>
              <div class="progress grow" style="margin:0"><i style="width:${(b.right / b.total) * 100}%"></i></div>
              <span style="width:30px;text-align:right">${b.right}/${b.total}</span>
            </div>`,
          )
          .join('')}
        <p class="small muted" style="margin:6px 0 0">估算方法:各词频段正确率 × 该段词数后求和。这是抽样估计,误差约 ±1000 词。</p>
      </div>
      ${
        missed.length
          ? `<h2>已加入生词本(${missed.length})</h2>
             <div class="card">${missed.map((v) => `<div class="list-item"><b>${esc(v.w)}</b><span class="muted small grow">${esc(v.zh)}</span></div>`).join('')}</div>`
          : ''
      }
      ${
        wrongSents.length
          ? `<h2>长难句解析(${wrongSents.length})</h2>
             ${wrongSents
               .map(
                 (s) => `<div class="card">
                   <div class="quote" style="font-size:16px">${esc(s.s)}</div>
                   <p><span class="tag ok">正确理解</span> ${esc(s.opts[0])}</p>
                   <p class="small muted" style="margin:0">结构要点:${esc(s.point)}</p>
                 </div>`,
               )
               .join('')}`
          : ''
      }
      <a class="btn primary block" href="#/home">开始学习</a>`;
    window.scrollTo(0, 0);
  }

  intro();
}
