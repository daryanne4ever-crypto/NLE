const STUDENTS_KEY = 'english_lab_students';
const SESSION_KEY = 'english_lab_session';
const LAST_ROUTE_KEY = 'english_lab_last_route';

const TEACHER_CREDENTIALS = {
  username: 'darianettc',
  password: '150993'
};

const defaultUnitProgress = {
  xp: 0,
  level: 1,
  completedActivities: 0,
  activityLog: []
};

const defaultStudent = {
  name: '',
  password: '',
  level: 1,
  xp: 0,
  streak: 1,
  completedActivities: 0,
  activityLog: [],
  unitProgress: {
    unit1: { ...defaultUnitProgress },
    unit2: { ...defaultUnitProgress }
  },
  lastUnit: 'unit1',
  lastRoute: 'dashboard.html'
};

function ensureUnitProgressShape(progress) {
  return {
    unit1: { ...defaultUnitProgress, ...(progress?.unit1 || {}) },
    unit2: { ...defaultUnitProgress, ...(progress?.unit2 || {}) }
  };
}

function getStudentsMap() {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY);
    return raw ? JSON.parse(raw) || {} : {};
  } catch {
    return {};
  }
}

function saveStudentsMap(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function normalizeStudentName(name) {
  return String(name || '').trim().toLowerCase();
}

function setStudent(name, password) {
  const students = getStudentsMap();
  const key = normalizeStudentName(name);
  const existing = students[key];

  students[key] = existing
    ? {
        ...defaultStudent,
        ...existing,
        name: name.trim(),
        password,
        unitProgress: ensureUnitProgressShape(existing.unitProgress)
      }
    : {
        ...defaultStudent,
        name: name.trim(),
        password,
        unitProgress: ensureUnitProgressShape()
      };

  saveStudentsMap(students);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ role: 'student', studentKey: key }));
  localStorage.setItem(LAST_ROUTE_KEY, students[key].lastRoute || 'dashboard.html');
  return students[key];
}

function loginStudent(name, password) {
  const trimmedName = String(name || '').trim();
  const trimmedPassword = String(password || '');
  if (!trimmedName || !trimmedPassword) return { ok: false, reason: 'missing_credentials' };

  const students = getStudentsMap();
  const key = normalizeStudentName(trimmedName);
  const existing = students[key];

  if (existing && existing.password !== trimmedPassword) {
    return { ok: false, reason: 'invalid_password' };
  }

  const student = setStudent(trimmedName, trimmedPassword);
  return { ok: true, student, created: !existing };
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStudent() {
  const session = getSession();
  if (!session || session.role !== 'student' || !session.studentKey) return { ...defaultStudent };
  const students = getStudentsMap();
  const student = { ...defaultStudent, ...(students[session.studentKey] || {}) };
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  return student;
}

function saveCurrentStudent(student) {
  const session = getSession();
  if (!session || session.role !== 'student') return;
  const students = getStudentsMap();
  const existing = students[session.studentKey] || {};
  students[session.studentKey] = {
    ...defaultStudent,
    ...existing,
    ...student,
    unitProgress: ensureUnitProgressShape({ ...existing.unitProgress, ...student.unitProgress })
  };
  saveStudentsMap(students);
}

function setLastRoute(route, unit = null) {
  if (!route) return;
  localStorage.setItem(LAST_ROUTE_KEY, route);
  const student = getStudent();
  if (!student.name) return;
  student.lastRoute = route;
  if (unit) student.lastUnit = unit;
  saveCurrentStudent(student);
}

function getResumeRoute() {
  const student = getStudent();
  if (student?.lastRoute) return student.lastRoute;
  return localStorage.getItem(LAST_ROUTE_KEY) || 'dashboard.html';
}

function addXP(amount, activityName) {
  const student = getStudent();
  if (!student.name) return { ...defaultStudent };
  student.xp += amount;
  student.level = Math.max(student.level || 1, Math.floor(student.xp / 100) + 1);
  student.completedActivities += 1;
  student.activityLog.unshift({ activity: activityName, xp: amount, at: new Date().toISOString() });
  saveCurrentStudent(student);
  return student;
}

function addUnitXP(unit, amount, activityName) {
  const student = getStudent();
  if (!student.name) return { ...defaultUnitProgress };
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  const target = student.unitProgress[unit] || { ...defaultUnitProgress };
  target.xp += amount;
  target.level = Math.floor(target.xp / 100) + 1;
  target.completedActivities += 1;
  target.activityLog.unshift({ activity: activityName, xp: amount, at: new Date().toISOString() });
  student.unitProgress[unit] = target;
  student.lastUnit = unit;
  saveCurrentStudent(student);
  return target;
}

function getUnitProgress(unit) {
  const student = getStudent();
  student.unitProgress = ensureUnitProgressShape(student.unitProgress);
  return student.unitProgress[unit] || { ...defaultUnitProgress };
}

function loginTeacher(username, password) {
  const ok = String(username || '').trim().toLowerCase() === TEACHER_CREDENTIALS.username && password === TEACHER_CREDENTIALS.password;
  if (ok) localStorage.setItem(SESSION_KEY, JSON.stringify({ role: 'teacher' }));
  return ok;
}

function getAllStudents() {
  return Object.values(getStudentsMap()).sort((a, b) => (b.xp || 0) - (a.xp || 0));
}

function deleteStudentByName(name) {
  const students = getStudentsMap();
  const key = normalizeStudentName(name);
  if (!students[key]) return false;
  delete students[key];
  saveStudentsMap(students);
  const session = getSession();
  if (session?.role === 'student' && session.studentKey === key) {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LAST_ROUTE_KEY);
  }
  return true;
}

function clearAllStudents() {
  saveStudentsMap({});
  localStorage.removeItem(LAST_ROUTE_KEY);
  const session = getSession();
  if (session?.role === 'student') localStorage.removeItem(SESSION_KEY);
}

function logoutSession() {
  localStorage.removeItem(SESSION_KEY);
}

function requireStudent(redirectTo = 'index.html') {
  const session = getSession();
  if (!session || session.role !== 'student') {
    window.location.href = redirectTo;
    return null;
  }
  const student = getStudent();
  if (!student.name) {
    window.location.href = redirectTo;
    return null;
  }
  return student;
}

function requireTeacher(redirectTo = 'index.html') {
  const session = getSession();
  if (!session || session.role !== 'teacher') {
    window.location.href = redirectTo;
    return false;
  }
  return true;
}
