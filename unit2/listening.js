const s = requireStudent();
if (!s) throw new Error('no student');
setLastRoute('unit2/listening.html', 'unit2');

const target = 'Where is the boarding gate for flight 302?';
const spoken = document.getElementById('spoken');
const feed = document.getElementById('feedback');
const recBtn = document.getElementById('recBtn');
let isRecording = false;

function speak(t) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'en-US';
  u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = SR ? new SR() : null;
if (rec) {
  rec.lang = 'en-US';
  rec.interimResults = true;
  rec.maxAlternatives = 1;

  rec.onstart = () => {
    isRecording = true;
    recBtn.textContent = '⏹ Parar';
    recBtn.classList.add('recording');
    feed.textContent = 'Gravando... clique novamente para parar.';
    feed.className = 'feedback';
  };

  rec.onend = () => {
    isRecording = false;
    recBtn.textContent = 'Gravar';
    recBtn.classList.remove('recording');
  };

  rec.onresult = (e) => {
    const txt = e.results?.[0]?.[0]?.transcript || '';
    spoken.textContent = `Você falou: ${txt}`;

    const expectedWords = normalize(target).split(' ').filter(Boolean);
    const gotWords = normalize(txt).split(' ').filter(Boolean);
    const matched = expectedWords.filter((w) => gotWords.includes(w));
    const score = Math.round((matched.length / expectedWords.length) * 100);

    if (score >= 70) {
      addUnitXP('unit2', 5, `Unit1 Listening (${score}%)`);
      feed.textContent = `Aprovação: ${score}% (+5 XP).`;
      feed.className = 'feedback good';
      return;
    }

    feed.textContent = `Abaixo de 70% (${score}%). Tente novamente.`;
    feed.className = 'feedback bad';
  };
}

document.getElementById('playBtn').addEventListener('click', () => speak(target));
recBtn.addEventListener('click', () => {
  if (!rec) {
    feed.textContent = 'SpeechRecognition indisponível';
    feed.className = 'feedback bad';
    return;
  }
  try {
    if (isRecording) rec.stop();
    else rec.start();
  } catch {}
});
