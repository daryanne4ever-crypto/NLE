const student = requireStudent();
if (student) {
  setLastRoute('dashboard.html');
  document.getElementById('name').textContent = student.name;
  document.getElementById('level').textContent = student.level;
  document.getElementById('xp').textContent = student.xp;
  document.getElementById('activities').textContent = student.completedActivities;
  const u1 = getUnitProgress('unit1');
  const u2 = getUnitProgress('unit2');
  document.getElementById('unit1xp').textContent = u1.xp;
  document.getElementById('unit1level').textContent = u1.level;
  document.getElementById('unit2xp').textContent = u2.xp;
  document.getElementById('unit2level').textContent = u2.level;
}
document.getElementById('resumeBtn').addEventListener('click', () => {
  window.location.href = getResumeRoute() || 'dashboard.html';
});
document.getElementById('logoutBtn').addEventListener('click', () => {
  logoutSession();
  window.location.href = 'index.html';
});
