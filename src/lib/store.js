import { dayKey } from './util.js';
import { DECK } from '../data/deck.js';

const KEY = 'english_adv_v1';
const DAY = 86400000;

const defaults = () => ({
  profile: null, // { vocab, vLevel, sCorrect, sTotal, sLevel, level, date }
  cards: {}, // word -> { w, zh, ex, due, ivl, ease, reps, isNew, added }
  settings: { apiKey: '', rate: 0.95, newPerDay: 10 },
  reading: { turn: 0, done: {} },
  custom: [], // 用户导入的文章 { id, title, text: [段落], added }
  stats: { lastDay: '', streak: 0, newDay: '', newCount: 0 },
  chat: { scenario: 'free', messages: [] },
});

function load() {
  const base = defaults();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    for (const k of Object.keys(base)) {
      if (saved[k] && typeof base[k] === 'object' && base[k] !== null && !Array.isArray(base[k]))
        base[k] = { ...base[k], ...saved[k] };
      else if (saved[k] !== undefined) base[k] = saved[k];
    }
  } catch {
    /* 存档损坏时使用默认值 */
  }
  return base;
}

export const state = load();

export function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* 存储已满或不可用 */
  }
}

export function resetAll() {
  localStorage.removeItem(KEY);
  Object.assign(state, defaults());
}

// 记录今天学习过,用于连续打卡天数
export function touchStreak() {
  const today = dayKey();
  const s = state.stats;
  if (s.lastDay === today) return;
  const yesterday = dayKey(new Date(Date.now() - DAY));
  s.streak = s.lastDay === yesterday ? s.streak + 1 : 1;
  s.lastDay = today;
  save();
}

// ---------- 间隔重复 (简化版 SM-2) ----------

export function addCard(w, zh, ex = '') {
  const key = w.toLowerCase();
  if (state.cards[key]) return false;
  state.cards[key] = { w: key, zh, ex, due: 0, ivl: 0, ease: 2.5, reps: 0, isNew: true, added: Date.now() };
  save();
  return true;
}

export function removeCard(w) {
  delete state.cards[w];
  save();
}

function newLeftToday() {
  const s = state.stats;
  if (s.newDay !== dayKey()) return state.settings.newPerDay;
  return Math.max(0, state.settings.newPerDay - s.newCount);
}

// 按用户水平决定内置词库的出词顺序
function deckOrder() {
  const lv = state.profile?.level ?? 3;
  const tiers = lv >= 4 ? [3, 2, 1] : lv === 3 ? [2, 3, 1] : [1, 2, 3];
  return tiers.flatMap((t) => DECK.filter((d) => d.tier === t));
}

export function buildQueue() {
  const now = Date.now();
  const all = Object.values(state.cards);
  const due = all.filter((c) => !c.isNew && c.due <= now).sort((a, b) => a.due - b.due);
  let room = newLeftToday();
  const fresh = all.filter((c) => c.isNew).sort((a, b) => a.added - b.added).slice(0, room);
  room -= fresh.length;
  const fromDeck = room > 0 ? deckOrder().filter((d) => !state.cards[d.w]).slice(0, room) : [];
  return { due, fresh: [...fresh, ...fromDeck.map((d) => ({ ...d, isNew: true, fromDeck: true }))] };
}

export function queueCounts() {
  const q = buildQueue();
  return { due: q.due.length, fresh: q.fresh.length, total: Object.keys(state.cards).length };
}

// g: 0 忘了 / 1 模糊 / 2 记得 / 3 很熟
export function gradeCard(card, g) {
  let c = state.cards[card.w];
  if (!c) {
    addCard(card.w, card.zh, card.ex);
    c = state.cards[card.w];
  }
  if (c.isNew) {
    c.isNew = false;
    const s = state.stats;
    if (s.newDay !== dayKey()) {
      s.newDay = dayKey();
      s.newCount = 0;
    }
    s.newCount++;
  }
  if (g === 0) {
    c.reps = 0;
    c.ivl = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = Date.now() + 10 * 60000;
  } else {
    if (g === 1) {
      c.ivl = Math.max(1, Math.round(c.ivl * 1.2));
      c.ease = Math.max(1.3, c.ease - 0.15);
    } else if (g === 2) {
      c.ivl = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.ivl * c.ease);
    } else {
      c.ivl = c.reps === 0 ? 4 : Math.round(Math.max(c.ivl, 1) * c.ease * 1.3);
      c.ease += 0.15;
    }
    c.reps++;
    c.due = Date.now() + c.ivl * DAY;
  }
  touchStreak();
  save();
  return c;
}
