const student = requireStudent(); if (!student) throw new Error('No student');
setLastRoute('unit1/flashcards.html','unit1');
const cards=[{en:'I',pt:'eu'},{en:'Happy',pt:'feliz'}];
const g=document.getElementById('flashGrid');
g.innerHTML=cards.map(c=>`<article class="flash-card"><div class="flash-top"><strong>${c.en}</strong></div><p class="hidden-info muted">${c.pt}</p></article>`).join('');
g.addEventListener('click',e=>{const c=e.target.closest('.flash-card');if(!c)return;c.querySelector('.hidden-info').style.display='block';addUnitXP('unit1',2,'Unit0 Flashcard');});
