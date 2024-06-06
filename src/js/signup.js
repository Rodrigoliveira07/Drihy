import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIF0F6kfrjBsGNPGcy5ZCOICELNUIuKeo",
  authDomain: "drihymode-e8a85.firebaseapp.com",
  projectId: "drihymode-e8a85",
  storageBucket: "drihymode-e8a85.appspot.com",
  messagingSenderId: "420389069070",
  appId: "1:420389069070:web:2bd2a6a191790d940af75f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function register(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!validate_email(email) || !validate_password(password)) {
    alert("Email ou Senha fora de linha");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const user_data = {
        email: email,
        password: password,
        last_login: Date.now()
      };

      set(ref(database, 'users/' + user.uid), user_data)
        .then(() => {
          alert("User Created!!");
        })
        .catch((error) => {
          alert("Error writing user data: " + error.message);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

document.getElementById('registerForm').addEventListener('submit', register);
