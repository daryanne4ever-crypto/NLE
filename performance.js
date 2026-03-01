const session = getSession();
const roleHint = document.getElementById('roleHint');
const studentSummary = document.getElementById('studentSummary');
const teacherSummary = document.getElementById('teacherSummary');

function renderTeacherList() {
  const students = getAllStudents();
  const list = document.getElementById('studentsList');
  if (!students.length) {
    list.innerHTML = '<li>Nenhum aluno cadastrado ainda.</li>';
    return;
  }
  list.innerHTML = students.map((s, i) => `<li><strong>#${i + 1} ${s.name}</strong> — XP: ${s.xp} | Nível: ${s.level} | Atividades: ${s.completedActivities}<div class="actions" style="margin-top:6px;"><button class="btn btn-danger" data-delete-student="${s.name}">Excluir aluno</button></div></li>`).join('');
}

if (session?.role === 'teacher') {
  requireTeacher();
  roleHint.textContent = 'Área exclusiva da professora. Os dados ficam salvos até exclusão manual.';
  studentSummary.style.display = 'none';
  teacherSummary.style.display = 'block';
  renderTeacherList();
} else {
  const student = requireStudent();
  if (student) {
    setLastRoute('performance.html', student.lastUnit);
    document.getElementById('studentName').textContent = student.name;
    document.getElementById('studentXP').textContent = student.xp;
    document.getElementById('studentLevel').textContent = student.level;
    document.getElementById('studentActivities').textContent = student.completedActivities;
    document.getElementById('levelProgress').style.width = `${student.xp % 100}%`;
    const logEl = document.getElementById('activityLog');
    logEl.innerHTML = student.activityLog.length
      ? student.activityLog.slice(0, 30).map((item) => `<li><strong>${item.activity}</strong> — +${item.xp} XP</li>`).join('')
      : '<li>Nenhuma atividade registrada ainda.</li>';
  }
}

document.getElementById('teacherSummary').addEventListener('click', (event) => {
  const btn = event.target.closest('[data-delete-student]');
  if (!btn) return;
  if (!window.confirm(`Excluir todos os dados do aluno ${btn.dataset.deleteStudent}?`)) return;
  deleteStudentByName(btn.dataset.deleteStudent);
  renderTeacherList();
});

document.getElementById('clearAllBtn').addEventListener('click', () => {
  if (!window.confirm('Excluir TODOS os alunos cadastrados?')) return;
  clearAllStudents();
  renderTeacherList();
});

document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = session?.role === 'teacher' ? 'index.html' : 'dashboard.html';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  logoutSession();
  window.location.href = 'index.html';
});
