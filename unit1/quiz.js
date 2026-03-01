const student = requireStudent(); if (!student) throw new Error('No student');
setLastRoute('unit1/quiz.html','unit1');
const qs=[{q:'Qual é o pronome para "eu"?',a:['You','I','He'],c:1},{q:'Complete: ___ am happy.',a:['I','Me','Mine'],c:0}];
let i=0;const q=document.getElementById('question'),a=document.getElementById('answers'),f=document.getElementById('feedback');
function render(){q.textContent=qs[i].q;a.innerHTML=qs[i].a.map((x,j)=>`<button class="btn btn-secondary" data-i="${j}">${x}</button>`).join('');}
a.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const ok=Number(b.dataset.i)===qs[i].c;if(ok){addUnitXP('unit1',15,'Unit0 Quiz');f.textContent='Correto! +15 XP';f.className='feedback good';}else{f.textContent='Incorreto.';f.className='feedback bad';}});
document.getElementById('nextBtn').addEventListener('click',()=>{i=(i+1)%qs.length;f.textContent='';render();});render();
