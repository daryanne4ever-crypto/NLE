const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/listening.html', 'unit1');

const practiceData = [
  { text: 'A', ipa: '/eɪ/' }, { text: 'E', ipa: '/iː/' }, { text: 'I', ipa: '/aɪ/' }, { text: 'G', ipa: '/dʒiː/' },
  { text: 'J', ipa: '/dʒeɪ/' }, { text: 'H', ipa: '/eɪtʃ/' }, { text: 'R', ipa: '/ɑːr/' }, { text: 'W', ipa: '/ˈdʌbəl.juː/' },
  { text: 'Hello', ipa: '/həˈloʊ/' }, { text: 'Good morning', ipa: '/ɡʊd ˈmɔːrnɪŋ/' }, { text: 'Red', ipa: '/red/' },
  { text: 'Blue', ipa: '/bluː/' }, { text: 'Black', ipa: '/blæk/' }, { text: 'Pink', ipa: '/pɪŋk/' }, { text: 'Cat', ipa: '/kæt/' },
  { text: 'Bed', ipa: '/bed/' }, { text: 'Sit', ipa: '/sɪt/' }, { text: 'Hot', ipa: '/hɒt/' }, { text: 'Cup', ipa: '/kʌp/' },
  { text: 'Gray', ipa: '/ɡreɪ/' }, { text: 'Three', ipa: '/θriː/' }, { text: 'Eight', ipa: '/eɪt/' }, { text: 'Twelve', ipa: '/twelv/' },
  { text: 'Thirteen', ipa: '/ˌθɜːrˈtiːn/' }, { text: 'Thirty', ipa: '/ˈθɜːrti/' }, { text: 'Fifty', ipa: '/ˈfɪfti/' },
  { text: 'Fifteen', ipa: '/ˌfɪfˈtiːn/' }, { text: 'One hundred', ipa: '/wʌn ˈhʌndrəd/' }, { text: 'One thousand', ipa: '/wʌn ˈθaʊzənd/' },
  { text: 'One million', ipa: '/wʌn ˈmɪljən/' }, { text: 'Site', ipa: '/saɪt/' }, { text: 'Hope', ipa: '/hoʊp/' },
  { text: 'Knee', ipa: '/niː/' }, { text: 'Knife', ipa: '/naɪf/' }, { text: 'Write', ipa: '/raɪt/' }, { text: 'Bomb', ipa: '/bɒm/' },
  { text: 'Sign', ipa: '/saɪn/' }, { text: 'Hour', ipa: '/aʊər/' }, { text: 'Sheep', ipa: '/ʃiːp/' }, { text: 'Purple', ipa: '/ˈpɜːr.pəl/' },
  { text: 'How do you spell that?', ipa: 'Classroom Language' }, { text: 'May I go to the bathroom?', ipa: 'Polite Request' },
  { text: "I don't understand", ipa: 'Clarification' }, { text: 'Could you speak slower, please?', ipa: 'Request' },
  { text: 'Study-Group26@school.org', ipa: 'Email Dictation' }, { text: 'Out of the blue', ipa: 'Idiom: Unexpected' },
  { text: 'Feeling blue', ipa: 'Idiom: Sad' }, { text: 'White lie', ipa: 'Idiom: Harmless lie' },
  { text: 'The screen is blurry or frozen', ipa: 'Tech Issue' }, { text: 'One thousand, two hundred and thirty-four', ipa: '1,234' }
];

let index = 0;
let isRecording = false;

const targetEl = document.getElementById('targetPhrase');
const spokenEl = document.getElementById('spoken');
const evalEl = document.getElementById('evaluation');
const playBtn = document.getElementById('playBtn');
const recordBtn = document.getElementById('recordBtn');
const nextBtn = document.getElementById('nextBtn');

function normalize(t) {
  return String(t || '').toLowerCase().replace(/[.,?!@_\-]/g, '').replace(/\s+/g, ' ').trim();
}

function similarity(a, b) {
  const n1 = normalize(a);
  const n2 = normalize(b);
  if (!n1 || !n2) return 0;
  if (n1 === n2) return 100;
  return n1.includes(n2) || n2.includes(n1) ? 75 : 35;
}

function render() {
  const current = practiceData[index];
  targetEl.textContent = `${index + 1}/50 — ${current.text} (${current.ipa})`;
  spokenEl.textContent = 'Você falou: -';
  evalEl.textContent = '';
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
    const target = practiceData[index].text;
    const score = similarity(spoken, target);
    spokenEl.textContent = `Você falou: ${spoken}`;
    if (score >= 70) {
      addUnitXP('unit1', 4, `Unit0 Listening ${index + 1}`);
      evalEl.textContent = `Boa! ${score}% de similaridade (+4 XP).`;
      evalEl.className = 'feedback good';
    } else {
      evalEl.textContent = `Tente novamente (${score}%).`; 
      evalEl.className = 'feedback bad';
    }
  };
}

playBtn.addEventListener('click', () => speakText(practiceData[index].text));
recordBtn.addEventListener('click', () => {
  if (!recognition) {
    evalEl.textContent = 'SpeechRecognition indisponível no navegador.';
    evalEl.className = 'feedback bad';
    return;
  }
  try {
    if (isRecording) recognition.stop();
    else recognition.start();
  } catch {}
});
nextBtn.addEventListener('click', () => {
  index = (index + 1) % practiceData.length;
  render();
});

render();
