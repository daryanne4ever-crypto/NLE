const student = requireStudent();
if (!student) throw new Error('No student');
setLastRoute('unit1/translation.html', 'unit1');

const translationItems = [
  ['How do you say... in English?', 'Como se diz... em inglês?'],
  ['How do you spell that?', 'Como se soletra isso?'],
  ['Is this correct?', 'Isto está correto?'],
  ['How do you pronounce this word?', 'Como se pronuncia esta palavra?'],
  ['Can I ask a question?', 'Posso fazer uma pergunta?'],
  ['May I go to the restroom?', 'Posso ir ao banheiro?'],
  ['I have a question.', 'Eu tenho uma pergunta.'],
  ["Sorry I'm late.", 'Desculpe pelo atraso.'],
  ['Got it!', 'Entendi! / Saquei!'],
  ['I see.', 'Entendo.'],
  ['That makes sense.', 'Isso faz sentido.'],
  ['Is there Wi-Fi in the classroom?', 'Tem Wi-Fi na sala?'],
  ['What’s the password?', 'Qual a senha?'],
  ['Can I plug in my laptop here?', 'Posso ligar meu laptop aqui?'],
  ['The screen is blurry/frozen.', 'A tela está embaçada/travada.'],
  ['Could you scroll up/down, please?', 'Você pode subir/descer a página?'],
  ['Will you share the slides with us?', 'Vai compartilhar os slides conosco?'],
  ['Where is the printer?', 'Onde fica a impressora?'],
  ['Can I book a study room?', 'Posso reservar uma sala de estudos?'],
  ['When is the assignment due?', 'Para quando é a entrega?'],
  ['I need to print some documents.', 'Preciso imprimir alguns documentos.'],
  ['Can I join your group?', 'Posso entrar no seu grupo?'],
  ['Did you catch what the professor said?', 'Você sacou o que o professor disse?'],
  ['Could you lend me a highlighter?', 'Pode me emprestar um marca-texto?'],
  ['Let’s study together after class.', 'Vamos estudar juntos depois da aula.'],
  ['Do we have homework for tomorrow?', 'Temos lição de casa para amanhã?'],
  ['I lost my student ID.', 'Perdi minha carteirinha.'],
  ['My pen ran out of ink.', 'Minha caneta acabou a tinta.'],
  ["I couldn't find the classroom.", 'Não achei a sala.'],
  ['I’m having trouble with the login.', 'Estou com problemas no login.'],
  ['Hello! / Hi!', 'Olá! / Oi!'],
  ['Good morning!', 'Bom dia!'],
  ['Good afternoon!', 'Boa tarde!'],
  ['Goodbye!', 'Tchau!'],
  ['See you tomorrow!', 'Até amanhã!'],
  ['Can I borrow a pencil?', 'Posso pegar um lápis emprestado?'],
  ['Please repeat that.', 'Por favor, repita isso.'],
  ['Can you help me?', 'Você pode me ajudar?'],
  ['I don’t understand.', 'Eu não entendo.'],
  ['Can you speak slower?', 'Pode falar mais devagar?'],
  ["I don't know.", 'Eu não sei.'],
  ['Could you speak slower, please?', 'Você poderia falar mais devagar, por favor?'],
  ['Can you write it on the board?', 'Pode escrever no quadro?'],
  ['I need more time.', 'Preciso de mais tempo.'],
  ['What’s the meaning of...?', 'Qual o significado de...?'],
  ['I have no idea.', 'Não faço ideia.'],
  ['Folder.', 'Pasta.'],
  ['Locker.', 'Armário.'],
  ['Stapler.', 'Grampeador.'],
  ['Ruler.', 'Régua.']
].map(([en, pt]) => ({ en, pt }));

let idx = 0;
const source = document.getElementById('sourceSentence');
const answerInput = document.getElementById('answerInput');
const feedback = document.getElementById('translationFeedback');

function normalize(v) {
  return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim();
}

function render() {
  source.textContent = `${idx + 1}/50 — ${translationItems[idx].en}`;
  answerInput.value = '';
  feedback.textContent = '';
}

document.getElementById('checkBtn').addEventListener('click', () => {
  const answer = normalize(answerInput.value);
  const expected = normalize(translationItems[idx].pt);
  if (!answer) {
    feedback.textContent = 'Digite uma tradução antes de corrigir.';
    feedback.className = 'feedback bad';
    return;
  }

  const ok = answer === expected || expected.includes(answer) || answer.includes(expected);
  if (ok) {
    addUnitXP('unit1', 5, `Unit0 Translation ${idx + 1}`);
    feedback.textContent = 'Correto! +5 XP';
    feedback.className = 'feedback good';
  } else {
    feedback.textContent = `Incorreto. Tradução esperada: ${translationItems[idx].pt}`;
    feedback.className = 'feedback bad';
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  idx = (idx + 1) % translationItems.length;
  render();
});

render();
