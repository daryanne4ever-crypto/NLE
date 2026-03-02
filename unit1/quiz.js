const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/quiz.html', 'unit1');

const vocabItems = [
  { term: 'Alphabet', definition: 'Conjunto de letras para reconhecer sons e soletração' },
  { term: 'Spelling', definition: 'Ato de soletrar letras individualmente' },
  { term: 'Vowel Sounds', definition: 'Sons das vogais (A, E, I, O, U)' },
  { term: 'IPA', definition: 'International Phonetic Alphabet (Alfabeto Fonético Internacional)' },
  { term: 'Silent Letters', definition: 'Letras que aparecem na escrita mas não são pronunciadas' },
  { term: 'Everyday Essentials', definition: 'Expressões básicas usadas o tempo todo' },
  { term: 'Real-Life Skills', definition: 'Habilidades como preencher formulários e dar e-mail' },
  { term: 'Warm-up', definition: 'Aquecimento ou preparação inicial' },
  { term: 'Reset button', definition: 'Botão de recomeçar (revisar o básico)' },
  { term: 'Minimal pairs', definition: 'Pares de palavras com apenas um som de diferença (ex: sit/seat)' },
  { term: 'Vowel Patterns', definition: 'Padrões de como as vogais mudam de som conforme a posição' },
  { term: 'Two vowels together', definition: 'Geralmente produzem um som longo (ex: ee, oo, ea)' },
  { term: 'Magic E', definition: 'E final silencioso que muda o som da vogal anterior' },
  { term: 'Silent K', definition: 'K não pronunciado antes de N (ex: Knee)' },
  { term: 'Silent B', definition: 'B não pronunciado após M (ex: Bomb)' },
  { term: 'Silent W', definition: 'W não pronunciado antes de R (ex: Write)' },
  { term: 'Silent G', definition: 'G não pronunciado antes de N (ex: Sign)' },
  { term: 'Silent H', definition: 'H não pronunciado em certas palavras (ex: Hour)' },
  { term: 'Short Vowel', definition: 'Vogal em sílaba fechada (termina em consoante)' },
  { term: 'Long Vowel', definition: 'Vogal que fala o nome da letra' },
  { term: 'R-controlled vowels', definition: 'Quando o R muda o som da vogal anterior (ex: Car)' },
  { term: 'Diphthongs', definition: 'Dois sons de vogais em uma única sílaba (ditongos)' },
  { term: 'Schwa /ə/', definition: 'Som reduzido, fraco e muito comum no inglês' },
  { term: 'Consonant Sounds', definition: 'Sons produzidos bloqueando o fluxo de ar' },
  { term: 'Cardinal Numbers', definition: 'Números usados para contagem e quantidade' },
  { term: 'Tens', definition: 'Dezenas (terminam em -ty)' },
  { term: 'Teens', definition: 'Números de 13 a 19 (terminam em -teen)' },
  { term: 'Hyphen', definition: 'Hífen (-) usado entre dezenas e unidades (ex: twenty-one)' },
  { term: 'Hundred', definition: 'Centena (100)' },
  { term: 'Thousand', definition: 'Milhar (1,000)' },
  { term: 'Retroflex R', definition: 'O som do R caipira, puxado para trás' },
  { term: 'Nuances', definition: 'Variações sutis de cores ou sons' },
  { term: 'Light / Pale', definition: 'Cores claras ou pálidas' },
  { term: 'Dark', definition: 'Cores escuras' },
  { term: 'Navy', definition: 'Azul-marinho' },
  { term: 'Bright / Neon', definition: 'Cores vibrantes ou neon' },
  { term: 'Matte', definition: 'Cor fosca' },
  { term: 'Shiny', definition: 'Cor brilhante' },
  { term: 'Color Idioms', definition: 'Expressões idiomáticas que usam cores' },
  { term: 'Greetings', definition: 'Saudações iniciais' },
  { term: 'Farewells', definition: 'Despedidas' },
  { term: 'At (@)', definition: 'Símbolo de arroba usado em e-mails' },
  { term: 'Dot (.)', definition: 'Ponto usado em e-mails e sites' },
  { term: 'Underscore (_)', definition: 'Símbolo de sublinhado' },
  { term: 'Capital Letter', definition: 'Letra maiúscula (Uppercase)' },
  { term: 'Small Letter', definition: 'Letra minúscula (Lowercase)' },
  { term: 'Double Letters', definition: 'Quando uma letra se repete (ex: double N)' },
  { term: 'Assignment', definition: 'Tarefa ou trabalho para entregar' },
  { term: 'Troubleshooting', definition: 'Resolução de problemas ou imprevistos' },
  { term: 'Peer Interaction', definition: 'Interação entre colegas de classe' }
];

let i = 0;
const q = document.getElementById('question');
const a = document.getElementById('answers');
const f = document.getElementById('feedback');

function pickChoices(correctIndex) {
  const choices = new Set([correctIndex]);
  while (choices.size < 4) choices.add(Math.floor(Math.random() * vocabItems.length));
  return Array.from(choices)
    .map((idx) => ({ idx, term: vocabItems[idx].term }))
    .sort(() => Math.random() - 0.5);
}

function render() {
  const item = vocabItems[i];
  const choices = pickChoices(i);
  q.textContent = `${i + 1}/50 — O que significa: "${item.term}"?`;
  a.innerHTML = choices
    .map((c) => `<button class="btn btn-secondary" data-correct="${String(c.idx === i)}">${c.term}</button>`)
    .join('');
}

a.addEventListener('click', (e) => {
  const b = e.target.closest('[data-correct]');
  if (!b) return;
  const ok = b.dataset.correct === 'true';
  if (ok) {
    addUnitXP('unit1', 4, `Unit0 Quiz ${i + 1}`);
    f.textContent = `Correto! +4 XP — ${vocabItems[i].definition}`;
    f.className = 'feedback good';
  } else {
    f.textContent = `Incorreto. Resposta: ${vocabItems[i].definition}`;
    f.className = 'feedback bad';
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  i = (i + 1) % vocabItems.length;
  f.textContent = '';
  render();
});

render();
