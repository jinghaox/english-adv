import './style.css';
import { stopSpeak, stopListen } from './lib/speech.js';
import home from './views/home.js';
import test from './views/test.js';
import read from './views/read.js';
import wordsView from './views/words.js';
import speak from './views/speak.js';
import chat from './views/chat.js';
import settings from './views/settings.js';

const routes = { home, test, read, words: wordsView, speak, chat, settings };
const app = document.getElementById('app');

function route() {
  const [name = 'home', ...rest] = location.hash.replace(/^#\/?/, '').split('/');
  const view = routes[name] || home;
  stopSpeak();
  stopListen();
  document.querySelectorAll('.sheet, .composer').forEach((el) => el.remove());
  app.innerHTML = '';
  window.scrollTo(0, 0);
  view(app, rest.map(decodeURIComponent));
  const tab = routes[name] ? name : 'home';
  document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
}

window.addEventListener('hashchange', route);
route();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
