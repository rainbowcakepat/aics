import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDZLwlX8IBlv7e5l1KfbF3hwkOMNZpekvc',
  authDomain: 'aics-chatbot.firebaseapp.com',
  projectId: 'aics-chatbot',
  storageBucket: 'aics-chatbot.appspot.com',
  messagingSenderId: '98998431128',
  appId: '1:98998431128:web:16711d6db77a60eb324fed',
  measurementId: 'G-3N9WHRSNBR',
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