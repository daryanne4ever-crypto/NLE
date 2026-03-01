const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/listening.html', 'unit1');

const phrases = [
  'How do you say in English?',
  'How do you spell that?',
  'Is this correct?',
  'How do you pronounce this word?',
  'Can I ask a question?',
  'May I go to the restroom?',
  'I have a question.',
  "Sorry I'm late.",
  'Got it!',
  'I see.',
  'That makes sense.',
  'Is there Wi-Fi in the classroom?',
  'What’s the password?',
  'Can I plug in my laptop here?',
  'The screen is blurry.',
  'Could you scroll up please?',
  'Will you share the slides with us?',
  'I’m looking for a book about history.',
  'Where is the printer?',
  'Can I book a study room?',
  'When is the assignment due?',
  'I need to print some documents.',
  'Can I join your group?',
  'Did you catch what the professor said?',
  'Could you lend me a highlighter?',
  "Let's study together after class.",
  'Do we have homework for tomorrow?',
  'I lost my student ID.',
  'My pen ran out of ink.',
  "I couldn't find the classroom.",
  'I’m having trouble with the login.'
];

let index = 0;
let correctCount = 0;
let totalSim = 0;
let isRecording = false;
let xp = 0;

const targetEl = document.getElementById('targetPhrase');
const transcriptEl = document.getElementById('transcript');
const evalEl = document.getElementById('evaluation');
const scoreEl = document.getElementById('scoreText');
const playBtn = document.getElementById('playBtn');
const recordBtn = document.getElementById('recordBtn');
const nextBtn = document.getElementById('nextBtn');

function normalize(t) {
  return String(t || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,?!@_\-']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function compare(s1, s2) {
  const n1 = normalize(s1);
  const n2 = normalize(s2);
  if (!n1 && !n2) return 1;
  if (!n1 || !n2) return 0;

  const track = Array(n2.length + 1).fill(null).map(() => Array(n1.length + 1).fill(null));
  for (let i = 0; i <= n1.length; i++) track[0][i] = i;
  for (let j = 0; j <= n2.length; j++) track[j][0] = j;
  for (let j = 1; j <= n2.length; j++) {
    for (let i = 1; i <= n1.length; i++) {
      const cost = n1[i - 1] === n2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + cost);
    }
  }
  const distance = track[n2.length][n1.length];
  return Math.max(0, 1 - distance / Math.max(n1.length, n2.length));
}

function showMistakes(spoken, target) {
  const sWords = normalize(spoken).split(' ');
  const tWords = normalize(target).split(' ');

  let feedbackDetail = '<br><br><b>Correction:</b><br>';
  tWords.forEach((word, i) => {
    if (sWords[i] !== word) feedbackDetail += `❌ "${word}"<br>`;
  });

  feedbackDetail += `<br><b>Full correct sentence:</b><br>${target}`;
  transcriptEl.innerHTML += feedbackDetail;
}

function setFeedback(text, colorClass) {
  evalEl.textContent = text;
  evalEl.className = `feedback ${colorClass}`.trim();
}

function render() {
  targetEl.textContent = `${index + 1}/${phrases.length} — ${phrases[index]}`;
  transcriptEl.textContent = 'Você falou: -';
  setFeedback('', '');
}

function showFinal() {
  const avg = Math.round((totalSim / phrases.length) * 100);
  let message = '';

  if (avg === 100) message = 'Outstanding pronunciation! 🌟';
  else if (avg >= 75) message = 'Very good performance! Keep practicing!';
  else if (avg >= 60) message = 'Good progress! Focus on weak words.';
  else message = 'Keep training! Practice slowly and repeat.';

  document.querySelector('section.card').innerHTML = `
    <h2>Session Completed</h2>
    <p>${message}</p>
    <p>Average Accuracy:</p>
    <h1 style="color:var(--primary); font-size: 3.5rem;">${avg}%</h1>
    <p>Total XP: ${xp}</p>
    <button class="btn btn-success" style="width:100%" onclick="location.reload()">Restart</button>
  `;
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isRecording = true;
    recordBtn.textContent = '⏹ Parar gravação';
    recordBtn.classList.add('recording');
    evalEl.textContent = 'Gravando... clique novamente para parar.';
    evalEl.className = 'feedback';
  };

  recognition.onend = () => {
    isRecording = false;
    recordBtn.textContent = '🎤 Gravar';
    recordBtn.classList.remove('recording');
  };

  recognition.onresult = (event) => {
    const spoken = event.results?.[0]?.[0]?.transcript || '';
    const target = phrases[index];
    const accuracy = compare(spoken, target);
    const percent = Math.round(accuracy * 100);

    transcriptEl.innerHTML = `Você falou: <b>"${spoken}"</b>`;

    if (percent === 100) {
      xp += 2;
      correctCount++;
      addUnitXP('unit1', 2, `Unit0 Listening ${index + 1} (100%)`);
      setFeedback('Perfect! 100% 🎯 +2 XP', 'good');
    } else if (percent >= 60) {
      xp += 1;
      addUnitXP('unit1', 1, `Unit0 Listening ${index + 1} (${percent}%)`);
      setFeedback(`Good job! ${percent}% 👍 +1 XP`, 'good');
    } else {
      setFeedback(`Let's improve! ${percent}%`, 'bad');
    }

    showMistakes(spoken, target);
    scoreEl.innerText = `Correct: ${correctCount} | XP: ${xp}`;
    totalSim += accuracy;
  };
}

playBtn.addEventListener('click', () => speakText(phrases[index]));
recordBtn.addEventListener('click', () => {
  if (!recognition) {
    setFeedback('SpeechRecognition indisponível no navegador.', 'bad');
    return;
  }
  try {
    if (isRecording) recognition.stop();
    else recognition.start();
  } catch {}
});
nextBtn.addEventListener('click', () => {
  if (index < phrases.length - 1) {
    index += 1;
    render();
  } else {
    showFinal();
  }
});

render();
