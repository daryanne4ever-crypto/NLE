const s = requireStudent(); if (!s) throw new Error('no student');
setLastRoute('unit2/listening.html', 'unit2');
const target = 'Where is the boarding gate for flight 302?';
const spoken = document.getElementById('spoken');
const feed = document.getElementById('feedback');
function speak(t){if(!('speechSynthesis' in window)) return; const u=new SpeechSynthesisUtterance(t);u.lang='en-US';window.speechSynthesis.cancel();window.speechSynthesis.speak(u);} 
document.getElementById('playBtn').addEventListener('click',()=>speak(target));
document.getElementById('recBtn').addEventListener('click',()=>{spoken.textContent='Você falou: (simulação)';addUnitXP('unit2',20,'Unit1 Listening treino');feed.textContent='Prática registrada! +20 XP';feed.className='feedback good';});
