import { CLASSICS } from '../data/classics.js';
import { state, save, addCard, touchStreak } from '../lib/store.js';
import { esc, dayKey, toast } from '../lib/util.js';
import { speak, stopSpeak, canSpeak } from '../lib/speech.js';
import { hasKey, studyGuide, explainWord, errorText } from '../lib/ai.js';

const NEWS_KEY = 'english_adv_news';
const DAY = 86400000;
const MAX_WORDS = 520;

// ---------- 时事:Wikipedia 每日精选(In the news / 特色条目 / 热门) ----------

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(NEWS_KEY) || 'null');
  } catch {
    return null;
  }
}
function writeCache(c) {
  try {
    localStorage.setItem(NEWS_KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
}

function parseFeed(j) {
  const items = [];
  const seen = new Set();
  const push = (kind, title, headline) => {
    if (!title || seen.has(title) || /^(Main Page|Special:|Wikipedia:|Portal:)/.test(title)) return;
    seen.add(title);
    items.push({ id: 'n:' + title, kind, title, headline });
  };
  for (const n of j.news || []) {
    const doc = new DOMParser().parseFromString(n.story || '', 'text/html');
    const headline = doc.body.textContent.replace(/\s+/g, ' ').trim();
    const href = doc.querySelector('b a')?.getAttribute('href');
    const title = href
      ? decodeURIComponent(href.replace(/^\.\//, '').split('#')[0]).replace(/_/g, ' ')
      : n.links?.[0]?.titles?.normalized;
    push('时事', title, headline);
  }
  if (j.tfa) push('特色条目', j.tfa.titles?.normalized, j.tfa.description || j.tfa.titles?.normalized);
  for (const a of (j.mostread?.articles || []).slice(0, 12)) {
    if (items.filter((x) => x.kind === '热门').length >= 4) break;
    push('热门', a.titles?.normalized, a.description || '近日热门话题');
  }
  return items;
}

async function loadNews() {
  const cached = readCache();
  if (cached?.day === dayKey() && cached.items?.length) return cached.items;
  const p = (n) => String(n).padStart(2, '0');
  for (const back of [0, 1]) {
    const d = new Date(Date.now() - back * DAY);
    const url = `https://en.wikipedia.org/api/rest_v1/feed/featured/${d.getUTCFullYear()}/${p(d.getUTCMonth() + 1)}/${p(d.getUTCDate())}`;
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const items = parseFeed(await r.json());
      if (items.length) {
        writeCache({ day: dayKey(), items });
        return items;
      }
    } catch {
      /* 试前一天 */
    }
  }
  if (cached?.items?.length) return cached.items; // 离线时用旧缓存
  throw new Error('无法获取今日时事,请检查网络');
}

async function loadArticle(item) {
  if (item.text) return item.text;
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&origin=*&titles=' +
    encodeURIComponent(item.title);
  const r = await fetch(url);
  if (!r.ok) throw new Error('文章加载失败');
  const pages = (await r.json()).query?.pages || {};
  const extract = Object.values(pages)[0]?.extract || '';
  const paras = [];
  let count = 0;
  for (const para of extract.split('\n').map((s) => s.trim()).filter(Boolean)) {
    paras.push(para);
    count += para.split(/\s+/).length;
    if (count >= MAX_WORDS) break;
  }
  if (!paras.length) throw new Error('这篇文章没有可读的正文');
  const cache = readCache();
  const hit = cache?.items?.find((x) => x.id === item.id);
  if (hit) {
    hit.text = paras;
    writeCache(cache);
  }
  return paras;
}

export function cachedHeadlines() {
  return (readCache()?.items || []).filter((x) => x.kind === '时事').map((x) => x.headline);
}

// ---------- 列表页 ----------

function list(root) {
  const turnKind = state.reading.turn % 2 === 0 ? 'news' : 'classic';
  const done = state.reading.done;
  const nextClassic = CLASSICS.find((c) => !done[c.id]) || CLASSICS[Math.floor(state.reading.turn / 2) % CLASSICS.length];

  root.innerHTML = `
    <h1>阅读</h1>
    <div id="pick"></div>
    <h2>📰 时事新闻</h2>
    <div class="card" id="news"><span class="spinner"></span> <span class="muted">正在获取今日要闻…</span></div>
    <h2>📥 我的文章</h2>
    <div class="card">
      ${state.custom
        .map(
          (c) => `<div class="list-item">
            <a class="grow" style="color:inherit" href="#/read/${encodeURIComponent(c.id)}"><b>${esc(c.title)}</b>
              <div class="muted small">约 ${c.text.join(' ').split(/\s+/).length} 词</div></a>
            ${done[c.id] ? '<span class="tag ok">已读</span>' : ''}
            <button class="icon ghost" data-del="${esc(c.id)}" aria-label="删除">🗑️</button>
          </div>`,
        )
        .join('')}
      ${state.custom.length ? '' : '<p class="muted small">把任意英文文章、小说片段粘贴进来,就能像内置文章一样点词查词、朗读和精读。</p>'}
      <a class="btn block" href="#/read/import" style="margin-top:8px">＋ 导入文章</a>
    </div>
    <h2>📚 经典文学(${CLASSICS.filter((c) => done[c.id]).length} / ${CLASSICS.length})</h2>
    <div class="card">
      ${CLASSICS.map(
        (c) => `<a class="list-item" href="#/read/${encodeURIComponent(c.id)}">
          <div class="grow"><b>${esc(c.title)}</b><div class="muted small">${esc(c.zh)} · ${esc(c.author)}</div></div>
          ${done[c.id] ? '<span class="tag ok">已读</span>' : '<span class="muted">›</span>'}
        </a>`,
      ).join('')}
    </div>
    <p class="small muted">时事内容来自 Wikipedia 每日要闻(CC BY-SA),经典选段均为公有领域作品。时事与经典按完成情况轮流推荐。</p>`;

  root.querySelectorAll('[data-del]').forEach((b) => {
    b.onclick = () => {
      const c = state.custom.find((x) => x.id === b.dataset.del);
      if (!c || !confirm(`删除“${c.title}”吗?`)) return;
      state.custom = state.custom.filter((x) => x.id !== c.id);
      delete state.reading.done[c.id];
      save();
      list(root);
    };
  });

  const pick = root.querySelector('#pick');
  const showPick = (item, label, sub) => {
    pick.innerHTML = `
      <div class="card hero">
        <div class="muted small">今日推荐 · ${label}</div>
        <h3 style="font-size:19px;margin:4px 0">${esc(item.title)}</h3>
        <p class="muted small">${esc(sub)}</p>
        <a class="btn primary block" style="background:#fff;color:#4f46e5;border-color:#fff" href="#/read/${encodeURIComponent(item.id)}">开始阅读</a>
      </div>`;
  };
  if (turnKind === 'classic') showPick(nextClassic, '经典文学', `${nextClassic.zh} · ${nextClassic.author}`);

  loadNews()
    .then((items) => {
      if (!root.isConnected) return;
      root.querySelector('#news').innerHTML = items
        .map(
          (n) => `<a class="list-item" href="#/read/${encodeURIComponent(n.id)}">
            <div class="grow"><span class="tag ${n.kind === '时事' ? '' : 'gray'}">${n.kind}</span> <b>${esc(n.title)}</b>
              <div class="muted small">${esc(n.headline)}</div></div>
            ${done[n.id] ? '<span class="tag ok">已读</span>' : '<span class="muted">›</span>'}
          </a>`,
        )
        .join('');
      if (turnKind === 'news') {
        const next = items.find((n) => !done[n.id]) || items[0];
        showPick(next, '时事新闻', next.headline);
      }
    })
    .catch((e) => {
      if (!root.isConnected) return;
      root.querySelector('#news').innerHTML = `<span class="muted">${esc(e.message)}</span>`;
      if (turnKind === 'news') showPick(nextClassic, '经典文学(时事暂不可用)', `${nextClassic.zh} · ${nextClassic.author}`);
    });
}

// ---------- 测验 ----------

function renderQuiz(box, quiz) {
  box.innerHTML = quiz
    .map(
      (q, qi) => `<div class="card" data-q="${qi}">
        <p><b>${qi + 1}. ${esc(q.q)}</b></p>
        ${q.opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}
      </div>`,
    )
    .join('');
  box.querySelectorAll('[data-q]').forEach((card) => {
    const q = quiz[+card.dataset.q];
    card.querySelectorAll('.opt').forEach((b) => {
      b.onclick = () => {
        if (card.dataset.done) return;
        card.dataset.done = '1';
        const k = +b.dataset.k;
        card.querySelectorAll('.opt')[q.a]?.classList.add('right');
        if (k !== q.a) b.classList.add('wrong');
      };
    });
  });
}

// ---------- 查词 ----------

async function lookup(word) {
  const r = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word));
  if (!r.ok) throw new Error('词典里没有找到这个词');
  const e = (await r.json())[0];
  return {
    phon: e.phonetic || e.phonetics?.find((x) => x.text)?.text || '',
    defs: (e.meanings || []).slice(0, 3).map((m) => ({ pos: m.partOfSpeech, def: m.definitions?.[0]?.definition || '' })),
  };
}

function sentenceAt(text, off) {
  let a = off;
  while (a > 0 && !/[.!?]/.test(text[a - 1])) a--;
  let b = off;
  while (b < text.length && !/[.!?]/.test(text[b])) b++;
  return text.slice(a, b + 1).trim();
}

function openSheet(word, sentence) {
  document.querySelector('.sheet')?.remove();
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.innerHTML = `
    <div class="row spread">
      <div class="row"><h3>${esc(word)}</h3><span class="muted" id="phon"></span></div>
      <div class="row">
        ${canSpeak ? '<button class="icon ghost" id="say" aria-label="朗读">🔊</button>' : ''}
        <button class="icon ghost" id="close" aria-label="关闭">✕</button>
      </div>
    </div>
    <div id="defs" class="def"><span class="spinner"></span></div>
    <div id="ai" class="def"></div>
    <div class="row mt">
      ${hasKey() ? '<button id="aibtn" class="grow">🤖 AI 中文讲解</button>' : ''}
      <button id="add" class="primary grow">＋ 加入生词本</button>
    </div>`;
  document.body.appendChild(sheet);

  let english = '';
  let chinese = '';
  const close = () => {
    sheet.remove();
    document.querySelectorAll('.w.sel').forEach((x) => x.classList.remove('sel'));
  };
  sheet.querySelector('#close').onclick = close;
  sheet.querySelector('#say')?.addEventListener('click', () => speak(word));

  lookup(word)
    .then((d) => {
      english = d.defs.map((x) => `(${x.pos}) ${x.def}`).join(' / ');
      sheet.querySelector('#phon').textContent = d.phon;
      sheet.querySelector('#defs').innerHTML = d.defs.map((x) => `<div><i class="muted">${esc(x.pos)}</i> ${esc(x.def)}</div>`).join('');
    })
    .catch((e) => {
      sheet.querySelector('#defs').innerHTML = `<span class="muted">${esc(navigator.onLine ? e.message : '查词需要联网')}</span>`;
    });

  sheet.querySelector('#aibtn')?.addEventListener('click', async (ev) => {
    const btn = ev.currentTarget;
    btn.disabled = true;
    const box = sheet.querySelector('#ai');
    box.innerHTML = '<span class="spinner"></span>';
    try {
      chinese = await explainWord(word, sentence);
      box.innerHTML = `<div class="card" style="margin:0;white-space:pre-wrap">${esc(chinese)}</div>`;
    } catch (e) {
      box.innerHTML = `<span class="muted">${esc(errorText(e))}</span>`;
      btn.disabled = false;
    }
  });

  sheet.querySelector('#add').onclick = () => {
    const meaning = chinese ? chinese.split('\n')[0] : english || '(暂无释义)';
    toast(addCard(word, meaning, sentence) ? `已加入生词本:${word}` : '生词本里已经有这个词了');
    close();
  };
}

// ---------- 阅读页 ----------

async function reader(root, id) {
  const classic = CLASSICS.find((c) => c.id === id);
  const custom = state.custom.find((c) => c.id === id);
  let item = classic;
  if (custom) {
    item = { id, kind: '我的文章', title: custom.title, headline: `导入于 ${dayKey(new Date(custom.added))}` };
  } else if (!classic) {
    item = readCache()?.items?.find((x) => x.id === id) || { id, kind: '时事', title: id.replace(/^n:/, ''), headline: '' };
  }
  const isNews = !classic && !custom;
  root.innerHTML = `
    <a href="#/read" class="small">‹ 返回阅读列表</a>
    <div style="margin-top:10px"><span class="tag">${classic ? '经典文学' : esc(item.kind)}</span></div>
    <h1 style="margin-bottom:2px">${esc(item.title)}</h1>
    <p class="muted small">${esc(classic ? `${classic.zh} · ${classic.author}` : item.headline)}</p>
    <div id="body"><span class="spinner"></span> <span class="muted">正在加载…</span></div>`;

  let paras;
  try {
    paras = classic ? classic.text : custom ? custom.text : await loadArticle(item);
  } catch (e) {
    if (root.isConnected) root.querySelector('#body').innerHTML = `<div class="card muted">${esc(e.message)}</div>`;
    return;
  }
  if (!root.isConnected) return;
  const fullText = paras.join('\n\n');
  const wordCount = fullText.split(/\s+/).length;

  const paraHtml = paras
    .map((para, pi) => {
      let html = '';
      let last = 0;
      for (const m of para.matchAll(/[A-Za-z][A-Za-z'’-]*/g)) {
        html += esc(para.slice(last, m.index)) + `<span class="w" data-p="${pi}" data-o="${m.index}">${esc(m[0])}</span>`;
        last = m.index + m[0].length;
      }
      return `<p>${html + esc(para.slice(last))}</p>`;
    })
    .join('');

  root.querySelector('#body').innerHTML = `
    <div class="row wrap" style="margin-bottom:12px">
      ${canSpeak ? '<button id="play">🔊 朗读全文</button>' : ''}
      <span class="muted small">约 ${wordCount} 词 · 点任意单词查词</span>
    </div>
    ${classic ? `<div class="card small"><b>导读</b> ${esc(classic.note)}</div>` : ''}
    <div class="article ${classic?.verse ? 'verse' : ''}">${paraHtml}</div>
    ${!isNews ? '' : `<p class="small muted">来源:<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}" target="_blank" rel="noopener">Wikipedia · ${esc(item.title)}</a>(CC BY-SA)</p>`}
    <h2>🤖 AI 精读</h2>
    <div id="guide">
      ${
        hasKey()
          ? '<button id="guidebtn" class="block">生成中文概要、长难句解析与理解题</button>'
          : '<div class="card small muted">在 <a href="#/settings">设置</a> 中填写 Claude API 密钥后,可以为任意文章生成中文概要、长难句拆解和理解题。</div>'
      }
    </div>
    ${classic ? '<h2>理解测验</h2><div id="quiz"></div>' : ''}
    <button id="finish" class="primary block mt">${state.reading.done[id] ? '已读完 ✓ 再次标记' : '完成阅读'}</button>`;

  if (classic) renderQuiz(root.querySelector('#quiz'), classic.quiz);

  let playing = false;
  const playBtn = root.querySelector('#play');
  playBtn?.addEventListener('click', () => {
    if (playing) {
      stopSpeak();
      playing = false;
      playBtn.textContent = '🔊 朗读全文';
      return;
    }
    playing = true;
    playBtn.textContent = '⏹ 停止朗读';
    speak(fullText, {
      onend: () => {
        playing = false;
        if (playBtn.isConnected) playBtn.textContent = '🔊 朗读全文';
      },
    });
  });

  root.querySelector('.article').addEventListener('click', (ev) => {
    const span = ev.target.closest('.w');
    if (!span) return;
    document.querySelectorAll('.w.sel').forEach((x) => x.classList.remove('sel'));
    span.classList.add('sel');
    const word = span.textContent.toLowerCase().replace(/[’']s$/, '').replace(/^['’-]+|['’-]+$/g, '');
    openSheet(word, sentenceAt(paras[+span.dataset.p], +span.dataset.o));
  });

  root.querySelector('#guidebtn')?.addEventListener('click', async () => {
    const box = root.querySelector('#guide');
    box.innerHTML = '<div class="card"><span class="spinner"></span> <span class="muted">Claude 正在精读这篇文章…</span></div>';
    try {
      const g = await studyGuide(item.title, fullText);
      if (!box.isConnected) return;
      box.innerHTML = `
        <div class="card"><h3>中文概要</h3><p style="margin:0">${esc(g.summary)}</p></div>
        ${g.sentences
          .map(
            (s) => `<div class="card">
              <div class="quote" style="font-size:16px">${esc(s.en)}</div>
              <p>${esc(s.zh)}</p>
              <p class="small muted" style="margin:0">${esc(s.analysis_zh)}</p>
            </div>`,
          )
          .join('')}
        ${g.quiz.length ? '<h3>理解题</h3><div id="aiquiz"></div>' : ''}`;
      if (g.quiz.length) renderQuiz(box.querySelector('#aiquiz'), g.quiz);
    } catch (e) {
      if (!box.isConnected) return;
      box.innerHTML = `<div class="card small muted">${esc(errorText(e))}</div><button id="guidebtn2" class="block">重试</button>`;
      box.querySelector('#guidebtn2').onclick = () => reader(root, id);
    }
  });

  root.querySelector('#finish').onclick = () => {
    const first = !state.reading.done[id];
    state.reading.done[id] = Date.now();
    // 导入的文章不参与“时事 / 经典”的轮换
    if (first && !custom) state.reading.turn++;
    save();
    touchStreak();
    toast(!first ? '已记录' : custom ? '读完一篇 🎉' : '读完一篇 🎉 下一篇换个类型');
    location.hash = '#/read';
  };
}

// ---------- 导入文章 ----------

const MAX_IMPORT = 30000; // 字符数上限,避免占满浏览器本地存储

function importView(root) {
  root.innerHTML = `
    <a href="#/read" class="small">‹ 返回阅读列表</a>
    <h1>导入文章</h1>
    <label for="ititle">标题</label>
    <input type="text" id="ititle" placeholder="例如:The Economist – AI and jobs" maxlength="120" />
    <label for="itext">正文(粘贴英文文本)</label>
    <textarea id="itext" rows="12" placeholder="长按此处粘贴…段落之间保留空行即可。"></textarea>
    <p class="small muted" id="icount">0 词</p>
    <button class="primary block" id="isave">保存并阅读</button>
    <p class="small muted mt">文章只保存在这台设备上。单篇上限约 ${MAX_IMPORT.toLocaleString()} 个字符(大约 5000 词),更长的内容请分几篇导入。</p>`;
  const ta = root.querySelector('#itext');
  ta.oninput = () => {
    const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    root.querySelector('#icount').textContent = `${n} 词 · ${ta.value.length.toLocaleString()} 字符`;
  };
  root.querySelector('#isave').onclick = () => {
    const raw = ta.value.replace(/\r/g, '').trim();
    if (!raw) return toast('请先粘贴正文');
    if (raw.length > MAX_IMPORT) return toast(`正文太长了(${raw.length.toLocaleString()} 字符),请分几篇导入`);
    // 有空行时按空行分段;否则每一行算一段
    const paras = (/\n\s*\n/.test(raw) ? raw.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ')) : raw.split('\n'))
      .map((p) => p.trim())
      .filter(Boolean);
    const title = root.querySelector('#ititle').value.trim() || paras[0].split(/\s+/).slice(0, 8).join(' ') + '…';
    const id = 'u:' + Date.now();
    state.custom.unshift({ id, title, text: paras, added: Date.now() });
    save();
    location.hash = '#/read/' + encodeURIComponent(id);
  };
}

export default function read(root, [id]) {
  if (id === 'import') importView(root);
  else if (id) reader(root, id);
  else list(root);
}
