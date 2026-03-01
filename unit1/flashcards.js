const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/flashcards.html', 'unit1');

const cards = [
  ['A', '/eɪ/'], ['B', '/biː/'], ['C', '/siː/'], ['G', '/dʒiː/'], ['H', '/eɪtʃ/'], ['W', '/ˈdʌbəl.juː/' ], ['Z', '/ziː/' ],
  ['A (/æ/)', 'cat'], ['A (/eɪ/)', 'name'], ['E (/ɛ/)', 'bed'], ['E (/iː/)', 'she'], ['I (/ɪ/)', 'sit'], ['I (/aɪ/)', 'time'],
  ['O (/ɒ/)', 'hot'], ['O (/oʊ/)', 'home'], ['U (/ʌ/)', 'cup'], ['U (/juː/)', 'student'], ['EE', '/iː/ (see, tree)'],
  ['OO (Long)', '/uː/ (food, school)'], ['OO (Short)', '/ʊ/ (book, good)'], ['EA', '/iː/ (eat) ou /ɛ/ (bread)'],
  ['Magic E (Cap vs Cape)', 'cap /kæp/ vs cape /keɪp/'], ['Vowels end of word (Me, She)', 'Som longo /iː/'],
  ['1 (One)', '/wʌn/'], ['2 (Two)', '/tuː/'], ['3 (Three)', '/θriː/'], ['11 (Eleven)', '/ɪˈlevən/'], ['12 (Twelve)', '/tuélv/'],
  ['13 (Thirteen)', '/ˌθɜːrˈtiːn/'], ['30 (Thirty)', '/ˈθɜːrti/'], ['14 (Fourteen)', '/ˌfɔːrˈtiːn/'], ['40 (Forty)', '/ˈfɔːrti/'],
  ['100', 'one hundred'], ['1,000', 'one thousand (usa vírgula no inglês)'], ['@ (E-mail symbol)', 'at /æt/'], ['. (E-mail symbol)', 'dot /dɒt/'],
  ['_ (E-mail symbol)', 'underscore /ˈʌndərskɔːr/'], ['- (E-mail symbol)', 'hyphen / dash'], ['Uppercase', 'Letra maiúscula'], ['Lowercase', 'Letra minúscula'],
  ['Double Letter (Ex: AA)', 'Double A'], ['Red', '/red/ (R retroflexo)'], ['Blue', '/bluː/ (U longo)'], ['Yellow', '/ˈjel.oʊ/'], ['Orange', '/ˈɔːr.ɪndʒ/'],
  ['Green', '/ɡriːn/'], ['Purple', '/ˈpɜːr.pəl/'], ['Out of the blue', 'Algo inesperado'], ['Feeling blue', 'Estar triste'], ['White lie', 'Mentira inocente']
].map(([en, pt]) => ({ en, pt }));

const grid = document.getElementById('flashGrid');

function playAudio(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

grid.innerHTML = cards
  .map((c, i) => `<article class="flash-card" data-i="${i}"><div class="flash-top"><strong>${c.en}</strong></div><p class="hidden-info muted">${c.pt}</p></article>`)
  .join('');

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.flash-card');
  if (!card) return;
  const idx = Number(card.dataset.i || 0);
  playAudio(cards[idx].en);
  card.querySelectorAll('.hidden-info').forEach((x) => {
    x.style.display = x.style.display === 'block' ? 'none' : 'block';
  });
  addUnitXP('unit1', 1, 'Unit0 Flashcard');
});
