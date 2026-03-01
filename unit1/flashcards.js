const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/flashcards.html', 'unit1');

const sections = [
  {
    title: 'Alphabet',
    items: [
      ['A /eɪ/', 'A'], ['B /biː/', 'B'], ['C /siː/', 'C'], ['D /diː/', 'D'], ['E /iː/', 'E'], ['F /ef/', 'F'],
      ['G /dʒiː/', 'G'], ['H /eɪtʃ/', 'H'], ['I /aɪ/', 'I'], ['J /dʒeɪ/', 'J'], ['K /keɪ/', 'K'], ['L /el/', 'L'],
      ['M /em/', 'M'], ['N /en/', 'N'], ['O /əʊ/', 'O'], ['P /piː/', 'P'], ['Q /kjuː/', 'Q'], ['R /ɑːr/', 'R'],
      ['S /es/', 'S'], ['T /tiː/', 'T'], ['U /juː/', 'U'], ['V /viː/', 'V'], ['W /ˈdʌbəljuː/', 'W'], ['X /eks/', 'X'],
      ['Y /waɪ/', 'Y'], ['Z /ziː/', 'Z']
    ]
  },
  {
    title: 'Cardinal Numbers',
    items: [
      ['0 - zero /ˈzɪərəʊ/', 'zero'], ['1 - one /wʌn/', 'one'], ['2 - two /tuː/', 'two'], ['3 - three /θriː/', 'three'],
      ['4 - four /fɔːr/', 'four'], ['5 - five /faɪv/', 'five'], ['6 - six /sɪks/', 'six'], ['7 - seven /ˈsevən/', 'seven'],
      ['8 - eight /eɪt/', 'eight'], ['9 - nine /naɪn/', 'nine'], ['10 - ten /ten/', 'ten'], ['11 - eleven /ɪˈlevən/', 'eleven'],
      ['12 - twelve /twelv/', 'twelve'], ['13 - thirteen /ˌθɜːrˈtiːn/', 'thirteen'], ['14 - fourteen /ˌfɔːrˈtiːn/', 'fourteen'],
      ['15 - fifteen /ˌfɪfˈtiːn/', 'fifteen'], ['16 - sixteen /ˌsɪksˈtiːn/', 'sixteen'], ['17 - seventeen /ˌsevənˈtiːn/', 'seventeen'],
      ['18 - eighteen /ˌeɪˈtiːn/', 'eighteen'], ['19 - nineteen /ˌnaɪnˈtiːn/', 'nineteen'], ['20 - twenty /ˈtwenti/', 'twenty'],
      ['30 - thirty /ˈθɜːrti/', 'thirty'], ['40 - forty /ˈfɔːrti/', 'forty'], ['50 - fifty /ˈfɪfti/', 'fifty'],
      ['60 - sixty /ˈsɪksti/', 'sixty'], ['70 - seventy /ˈsevənti/', 'seventy'], ['80 - eighty /ˈeɪti/', 'eighty'], ['90 - ninety /ˈnaɪnti/', 'ninety']
    ]
  },
  {
    title: 'Ordinal Numbers',
    items: [
      ['1st - first /fɜːrst/', 'first'], ['2nd - second /ˈsekənd/', 'second'], ['3rd - third /θɜːrd/', 'third'],
      ['4th - fourth /fɔːrθ/', 'fourth'], ['5th - fifth /fɪfθ/', 'fifth'], ['6th - sixth /sɪksθ/', 'sixth'],
      ['7th - seventh /ˈsevənθ/', 'seventh'], ['8th - eighth /eɪtθ/', 'eighth'], ['9th - ninth /naɪnθ/', 'ninth'], ['10th - tenth /tenθ/', 'tenth']
    ]
  },
  {
    title: 'Colors',
    items: [
      ['Red', 'red'], ['Blue', 'blue'], ['Green', 'green'], ['Yellow', 'yellow'], ['Black', 'black'],
      ['White', 'white'], ['Orange', 'orange'], ['Purple', 'purple'], ['Pink', 'pink'], ['Brown', 'brown']
    ]
  },
  {
    title: 'Pronouns',
    items: [
      ['I', 'I'], ['You', 'you'], ['He', 'he'], ['She', 'she'], ['It', 'it'], ['We', 'we'], ['They', 'they'],
      ['Me', 'me'], ['Him', 'him'], ['Her', 'her'], ['Us', 'us'], ['Them', 'them'],
      ['My', 'my'], ['Your', 'your'], ['His', 'his'], ['Her', 'her'], ['Our', 'our'], ['Their', 'their'],
      ['Mine', 'mine'], ['Yours', 'yours'], ['Ours', 'ours'], ['Theirs', 'theirs'],
      ['Myself', 'myself'], ['Yourself', 'yourself'], ['Himself', 'himself'], ['Herself', 'herself'],
      ['Itself', 'itself'], ['Ourselves', 'ourselves'], ['Themselves', 'themselves']
    ]
  }
];

const grid = document.getElementById('flashGrid');

function playAudio(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

grid.innerHTML = sections
  .map((section) => `
    <h2>${section.title}</h2>
    <div class="flash-grid">
      ${section.items.map(([label, audio]) => `<div class="flash-item" data-audio="${audio.replace(/"/g, '&quot;')}">${label}</div>`).join('')}
    </div>
  `)
  .join('');

grid.addEventListener('click', (e) => {
  const item = e.target.closest('.flash-item');
  if (!item) return;
  playAudio(item.dataset.audio || item.textContent);
  addUnitXP('unit1', 1, 'Unit0 Flashcard');
});
