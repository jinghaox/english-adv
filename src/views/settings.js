import { state, save, resetAll } from '../lib/store.js';
import { esc, toast } from '../lib/util.js';
import { speak, canSpeak } from '../lib/speech.js';

export default function settings(root) {
  const s = state.settings;
  root.innerHTML = `
    <a href="#/home" class="small">‹ 返回首页</a>
    <h1>设置</h1>

    <div class="card">
      <h3>Claude API 密钥</h3>
      <p class="small muted">用于 AI 对话、AI 精读和 AI 讲解单词。密钥只保存在这台设备的浏览器里,并且只会直接发送给 api.anthropic.com。可在 console.anthropic.com 创建;使用会按量计费。</p>
      <input type="password" id="key" placeholder="sk-ant-…" autocomplete="off" value="${esc(s.apiKey)}" />
      <div class="row mt">
        <button class="primary grow" id="savekey">保存</button>
        <button class="grow" id="clearkey">清除</button>
      </div>
    </div>

    <div class="card">
      <h3>朗读语速</h3>
      <div class="row">
        <input type="range" id="rate" min="0.6" max="1.3" step="0.05" value="${s.rate}" class="grow" />
        <span id="ratev" style="width:44px;text-align:right">${s.rate.toFixed(2)}×</span>
        ${canSpeak ? '<button class="icon ghost" id="try" aria-label="试听">🔊</button>' : ''}
      </div>
      <label for="newper">每天新词数量</label>
      <select id="newper">${[5, 10, 15, 20, 30].map((n) => `<option ${n === s.newPerDay ? 'selected' : ''}>${n}</option>`).join('')}</select>
    </div>

    <div class="card">
      <h3>学习数据</h3>
      <p class="small muted">所有进度(测试结果、生词本、阅读记录)都保存在这台设备上,清除浏览器数据会一并删除。</p>
      <div class="row">
        <a class="btn grow" href="#/test">重新测试水平</a>
        <button class="grow danger" id="reset">清空全部数据</button>
      </div>
    </div>
    <p class="small muted center">English Adv · 版本 1.0</p>`;

  root.querySelector('#savekey').onclick = () => {
    s.apiKey = root.querySelector('#key').value.trim();
    save();
    toast(s.apiKey ? '密钥已保存' : '密钥为空');
  };
  root.querySelector('#clearkey').onclick = () => {
    s.apiKey = '';
    root.querySelector('#key').value = '';
    save();
    toast('密钥已清除');
  };
  root.querySelector('#rate').oninput = (e) => {
    s.rate = +e.target.value;
    root.querySelector('#ratev').textContent = s.rate.toFixed(2) + '×';
    save();
  };
  root.querySelector('#try')?.addEventListener('click', () => speak('The quick brown fox jumps over the lazy dog.'));
  root.querySelector('#newper').onchange = (e) => {
    s.newPerDay = +e.target.value;
    save();
  };
  root.querySelector('#reset').onclick = () => {
    if (!confirm('确定清空全部学习数据吗?测试结果、生词本和阅读记录都会被删除,且无法恢复。')) return;
    resetAll();
    toast('已清空');
    location.hash = '#/home';
  };
}
