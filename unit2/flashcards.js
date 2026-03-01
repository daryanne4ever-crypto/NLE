setLastRoute('unit2/flashcards.html', 'unit2');
const s=requireStudent(); if(!s) throw new Error('no student');
const cards=[{en:'Passport',pt:'Passaporte'},{en:'Gate',pt:'Portão de embarque'}];
const g=document.getElementById('grid');
g.innerHTML=cards.map(c=>`<article class="flash-card"><div class="flash-top"><strong>${c.en}</strong></div><p class="hidden-info muted">${c.pt}</p></article>`).join('');
g.addEventListener('click',e=>{const card=e.target.closest('.flash-card');if(!card)return;card.querySelector('.hidden-info').style.display='block';addUnitXP('unit2',2,'Unit1 Flashcard');});
