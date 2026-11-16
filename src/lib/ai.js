import Anthropic from '@anthropic-ai/sdk';
import { state } from './store.js';
import { LEVELS } from '../data/test.js';

// 可在“设置”中切换的模型。价格为每百万 token 的美元价(输入 / 输出)。
// fallback: 该模型是否支持服务端回退(主模型因安全策略拒答时,由 API 自动改用备用模型重试)。
export const MODELS = [
  { id: 'claude-opus-5-5', name: 'Claude Opus 5.5', note: '质量最好', price: '$4 / $20', fallback: true },
  { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', note: '均衡,约半价', price: '$2 / $10', fallback: true },
  { id: 'claude-haiku-5-5', name: 'Claude Haiku 5.5', note: '最便宜,约 1/40', price: '$0.10 / $0.50', fallback: false },
];
const BETAS = ['server-side-fallback-2026-07-01'];

const currentModel = () => MODELS.find((m) => m.id === state.settings.model) || MODELS[0];

export const hasKey = () => !!state.settings.apiKey;

function client() {
  if (!hasKey()) throw new Error('请先在“设置”中填写 Claude API 密钥');
  // 这是纯前端的个人应用:密钥只保存在本机浏览器里,并直接发给 api.anthropic.com
  return new Anthropic({ apiKey: state.settings.apiKey, dangerouslyAllowBrowser: true });
}

export function learnerLine() {
  const p = state.profile;
  if (!p) return 'an advanced learner (level not yet tested)';
  return `about ${LEVELS[p.level].code} (estimated vocabulary ≈ ${p.vocab} words; long-sentence comprehension ${p.sCorrect}/${p.sTotal})`;
}

export function errorText(err) {
  if (err instanceof Anthropic.AuthenticationError) return 'API 密钥无效,请到“设置”中检查';
  if (err instanceof Anthropic.PermissionDeniedError) return '该密钥没有权限使用此模型';
  if (err instanceof Anthropic.RateLimitError) return '请求太频繁,请稍后再试';
  if (err instanceof Anthropic.APIConnectionError) return '网络连接失败,请检查网络';
  if (err instanceof Anthropic.APIError) return `Claude API 错误 (${err.status ?? '?'}):${err.message}`;
  return err?.message || String(err);
}

const textOf = (content) =>
  content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');

// 流式请求。返回 { text, content };content 是完整的内容块数组,
// 多轮对话时必须原样回传(其中包含思考块)。
export async function ask({ system, messages, onText, maxTokens = 16000 }) {
  const model = currentModel();
  const params = { model: model.id, max_tokens: maxTokens, output_config: { effort: 'low' }, system, messages };
  const stream = model.fallback
    ? client().beta.messages.stream({ ...params, betas: BETAS, fallbacks: 'default' })
    : client().messages.stream(params);
  let soFar = '';
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      soFar += event.delta.text;
      onText?.(soFar);
    }
  }
  const msg = await stream.finalMessage();
  if (msg.stop_reason === 'refusal') throw new Error('模型拒绝回答这个请求,请换个话题');
  return { text: textOf(msg.content), content: msg.content };
}

function parseJson(text) {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('AI 返回的格式不正确,请重试');
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    throw new Error('AI 返回的格式不正确,请重试');
  }
}

// 精读:中文概要 + 长难句解析 + 理解题
export async function studyGuide(title, text) {
  const { text: out } = await ask({
    system:
      'You are an English reading tutor for native Chinese speakers. Respond with a single JSON object only — no markdown fences, no commentary.',
    messages: [
      {
        role: 'user',
        content: `The learner's level is ${learnerLine()}.

Passage title: ${title}

<passage>
${text}
</passage>

Produce JSON with exactly this shape:
{
  "summary_zh": "2–3 句中文概要",
  "sentences": [ { "en": "原文中最难的长句(逐字引用)", "zh": "准确的中文翻译", "analysis_zh": "用中文拆解句子主干和从句结构" } ],
  "quiz": [ { "q": "English comprehension question", "options": ["A", "B", "C", "D"], "answer": 0 } ]
}
Give the 3 hardest sentences and 3 quiz questions. Questions must test inference and understanding of the passage, not trivia; "answer" is the 0-based index of the correct option and should vary between questions.`,
      },
    ],
  });
  const data = parseJson(out);
  return {
    summary: String(data.summary_zh || ''),
    sentences: Array.isArray(data.sentences) ? data.sentences : [],
    quiz: (Array.isArray(data.quiz) ? data.quiz : [])
      .filter((q) => Array.isArray(q.options) && Number.isInteger(q.answer))
      .map((q) => ({ q: String(q.q), opts: q.options.map(String), a: q.answer })),
  };
}

// 结合上下文解释单词
export async function explainWord(word, sentence) {
  const { text } = await ask({
    system:
      '你是英语词汇老师。用简体中文回答,不要使用 markdown。格式:第一行给出该词在此句中的中文意思(不超过 15 字);第二行起用 1–2 句话说明用法或辨析,并给一个新的英文例句。',
    messages: [{ role: 'user', content: `单词:${word}\n所在句子:${sentence}` }],
  });
  return text.trim();
}
