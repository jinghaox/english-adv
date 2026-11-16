const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function dayKey(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

let toastTimer;
export function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

export const words = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

// 用最长公共子序列比对目标句和用户输入,返回目标句中每个词是否命中。
export function matchWords(target, attempt) {
  const t = words(target);
  const a = words(attempt);
  const dp = Array.from({ length: t.length + 1 }, () => new Array(a.length + 1).fill(0));
  for (let i = t.length - 1; i >= 0; i--)
    for (let j = a.length - 1; j >= 0; j--)
      dp[i][j] = t[i] === a[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < t.length) {
    if (j < a.length && t[i] === a[j]) {
      out.push({ w: t[i], ok: true });
      i++;
      j++;
    } else if (j < a.length && dp[i][j + 1] >= dp[i + 1][j]) {
      j++;
    } else {
      out.push({ w: t[i], ok: false });
      i++;
    }
  }
  const hit = out.filter((x) => x.ok).length;
  return { parts: out, score: t.length ? Math.round((hit / t.length) * 100) : 0 };
}
