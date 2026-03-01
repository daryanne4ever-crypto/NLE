const student = requireStudent(); if (!student) throw new Error('No student');
setLastRoute('unit1/translation.html','unit1');
const items=[{en:'I am happy.',pt:'eu estou feliz'},{en:'I need help.',pt:'eu preciso de ajuda'}];
let idx=0;const source=document.getElementById('sourceSentence'),answerInput=document.getElementById('answerInput'),feedback=document.getElementById('translationFeedback');
function normalize(v){return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z\s]/g,'').trim();}
function render(){source.textContent=items[idx].en;answerInput.value='';feedback.textContent='';}
document.getElementById('checkBtn').addEventListener('click',()=>{const ok=normalize(answerInput.value).includes(normalize(items[idx].pt));if(ok){addUnitXP('unit1',20,'Unit0 Translation');feedback.textContent='Correto! +20 XP';feedback.className='feedback good';}else{feedback.textContent=`Resposta esperada: ${items[idx].pt}`;feedback.className='feedback bad';}});
document.getElementById('nextBtn').addEventListener('click',()=>{idx=(idx+1)%items.length;render();});render();
