# Anne English Lab

Sistema educacional web com login único (aluno/professora), dashboard, unidades, quizzes, listening, flashcards e desempenho.

## Estrutura por unidade

- `/unit1` → **Unit 0 – Review** (conteúdo original mantido)
- `/unit2` → **Unit 1 – Introduce Yourself**

Cada unidade possui conteúdo e pontuação independentes.

## Navegação principal

- `index.html` → Login único (perfil aluno/professora)
- `dashboard.html` → Resumo geral + acesso para Unit 0 e Unit 1
- `unit1/menu.html` → Menu da Unit 0
- `unit2/menu.html` → Menu da Unit 1
- `performance.html` → desempenho aluno/professora

## XP e progresso

Persistidos no `localStorage` até exclusão manual pela professora:

- XP geral / nível geral
- atividades gerais
- XP da `unit1` (Unit 0)
- XP da `unit2` (Unit 1)
- última rota para `Continuar de onde parei`

Funções-chave no `common.js`:

- `loginStudent(...)` com senha obrigatória por aluno
- `addXP(...)` para fluxo geral
- `addUnitXP('unit1'|'unit2', ...)` para progresso por unidade
- `setLastRoute(...)` / `getResumeRoute()` para continuar de onde parou
- `deleteStudentByName(...)` / `clearAllStudents()` para gestão da professora

## Professora (acesso exclusivo)

Credenciais fixas:

- Usuário: `darianettc`
- Senha: `150993`

## Executar localmente

```bash
python3 -m http.server 8000
```

Abra `http://127.0.0.1:8000/index.html`.
