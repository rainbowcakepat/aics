import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCISrXakhLgzS0S9jbWmF8flPvzfkYa5WQ",
  authDomain: "aicschatbotfinal.firebaseapp.com",
  projectId: "aicschatbotfinal",
  storageBucket: "aicschatbotfinal.appspot.com",
  messagingSenderId: "18585913452",
  appId: "1:18585913452:web:ea2d1fc671876831ba3049",
  measurementId: "G-989QVDR81K"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();


//PAT:
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const auth = firebase.auth();
export {db, auth};