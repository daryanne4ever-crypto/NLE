import { getAuth, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const auth = getAuth();
const provider = new GithubAuthProvider();

function loginComGithub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Usuário logado:", result.user);
    })
    .catch((error) => {
      console.error("Erro no login:", error);
    });
}

window.loginComGithub = loginComGithub;
