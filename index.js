const loginBtn = document.getElementById('loginBtn');
const feedback = document.getElementById('loginFeedback');
const roleEl = document.getElementById('role');

const activeSession = getSession();
if (activeSession?.role === 'teacher') window.location.href = 'performance.html';
if (activeSession?.role === 'student') window.location.href = 'dashboard.html';

loginBtn.addEventListener('click', () => {
  const role = roleEl.value;
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !password) {
    feedback.textContent = 'Preencha usuário/nome e senha.';
    feedback.className = 'feedback bad';
    return;
  }

  if (role === 'teacher') {
    const ok = loginTeacher(name, password);
    if (!ok) {
      feedback.textContent = 'Login da professora inválido.';
      feedback.className = 'feedback bad';
      return;
    }
    window.location.href = 'performance.html';
    return;
  }

  const result = loginStudent(name, password);
  if (!result.ok) {
    feedback.textContent = 'Senha do aluno incorreta para este login.';
    feedback.className = 'feedback bad';
    return;
  }
  window.location.href = 'dashboard.html';
});
