setLastRoute('unit2/quiz.html', 'unit2');
const s = requireStudent(); if (!s) throw new Error('no student');
const qs=[{q:'"Passport" em português é:',a:['Passaporte','Bilhete','Mala'],c:0,tip:'Passport = passaporte.'},{q:'Complete: My flight is ___ 8 PM.',a:['at','in','on'],c:0,tip:'Use at para horários exatos.'}];
let i=0;const q=document.getElementById('question'),a=document.getElementById('answers'),f=document.getElementById('feedback'),m=document.getElementById('meta');
function r(){q.textContent=qs[i].q;m.textContent=`Questão ${i+1}/${qs.length}`;a.innerHTML=qs[i].a.map((x,j)=>`<button class="btn btn-secondary" data-i="${j}">${x}</button>`).join('');}
a.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(!b)return;const ok=Number(b.dataset.i)===qs[i].c;if(ok){addUnitXP('unit2',5,`Unit1 Quiz Q${i+1}`);f.textContent=`Correto! +5 XP. ${qs[i].tip}`;f.className='feedback good';}else{f.textContent=`Resposta correta: ${qs[i].a[qs[i].c]}. ${qs[i].tip}`;f.className='feedback bad';}});
document.getElementById('nextBtn').addEventListener('click',()=>{i=(i+1)%qs.length;f.textContent='';r();});r();
