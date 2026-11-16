import { state, queueCounts } from '../lib/store.js';
import { LEVELS } from '../data/test.js';
import { dayKey } from '../lib/util.js';
import { courseStatus } from './course.js';

export default function home(root) {
  const p = state.profile;
  const q = queueCounts();
  const cs = courseStatus();
  const streak = state.stats.lastDay === dayKey() || state.stats.streak === 0 ? state.stats.streak : state.stats.streak;
  const nextKind = state.reading.turn % 2 === 0 ? '时事新闻' : '经典文学';

  const hero = p
    ? `<div class="card hero">
        <div class="row spread">
          <div>
            <div class="muted small">你的英语水平</div>
            <div class="big">${LEVELS[p.level].code} <span style="font-size:18px;font-weight:500">${LEVELS[p.level].name}</span></div>
          </div>
          <a href="#/test" class="small" style="color:#fff;opacity:.85">重新测试 ›</a>
        </div>
        <div class="stats">
          <div><b>${p.vocab.toLocaleString()}</b><span>估算词汇量</span></div>
          <div><b>${p.sCorrect}/${p.sTotal}</b><span>长难句理解</span></div>
          <div><b>${streak} 天</b><span>连续学习</span></div>
        </div>
      </div>`
    : `<div class="card hero">
        <h3 style="font-size:20px">先测一测你的英语水平</h3>
        <p class="muted">40 道词汇题 + 8 道长难句理解题,约 8 分钟。测完后,单词、阅读和对话都会按你的水平来安排。</p>
        <a class="btn primary block" href="#/test" style="background:#fff;color:#4f46e5;border-color:#fff">开始水平测试</a>
      </div>`;

  root.innerHTML = `
    <div class="row spread">
      <h1>English Adv</h1>
      <a href="#/settings" style="font-size:22px" aria-label="设置">⚙️</a>
    </div>
    ${hero}
    <h2>今日学习</h2>
    <a class="card tap" href="#/words">
      <div class="row spread"><h3>🗂️ 单词记忆</h3><span class="tag">${q.due + q.fresh} 个待学</span></div>
      <div class="muted small">待复习 ${q.due} · 新词 ${q.fresh} · 生词本共 ${q.total} 词</div>
    </a>
    <a class="card tap" href="#/read">
      <div class="row spread"><h3>📖 今日阅读</h3><span class="tag">${nextKind}</span></div>
      <div class="muted small">时事与经典轮流读,点任意单词即可查词、加入生词本</div>
    </a>
    <a class="card tap" href="#/read/course">
      <div class="row spread"><h3>🧩 长难句课程</h3><span class="tag ${cs.today >= cs.daily ? 'ok' : ''}">今日 ${cs.today} / ${cs.daily}</span></div>
      <div class="muted small">每天 3 句,一步步拆解 · 已学 ${cs.learned} / ${cs.total} 句</div>
    </a>
    <a class="card tap" href="#/speak">
      <h3>🎧 听力与口语</h3>
      <div class="muted small">跟读打分 · 听写练习</div>
    </a>
    <a class="card tap" href="#/chat">
      <h3>💬 AI 对话练习</h3>
      <div class="muted small">${state.settings.apiKey ? '和 Claude 用英语聊天,自动纠正你的表达' : '需要先在设置中填写 Claude API 密钥'}</div>
    </a>`;
}
