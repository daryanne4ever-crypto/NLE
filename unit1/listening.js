const student = requireStudent(); if (!student) throw new Error('No student');
setLastRoute('unit1/listening.html','unit1');
const target='I am happy today.';const evalEl=document.getElementById('evaluation');
function speakText(t){if(!('speechSynthesis' in window)) return; const u=new SpeechSynthesisUtterance(t);u.lang='en-US';window.speechSynthesis.cancel();window.speechSynthesis.speak(u);}
document.getElementById('playBtn').addEventListener('click',()=>speakText(target));
document.getElementById('recordBtn').addEventListener('click',()=>{addUnitXP('unit1',20,'Listening treino');evalEl.textContent='Prática registrada! +20 XP';evalEl.className='feedback good';});
