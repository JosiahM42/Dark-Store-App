//Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEmYnh9-ws2Jv3OenUzSYxPvyiGxQdqNc",
  authDomain: "project-dark-store.firebaseapp.com",
  projectId: "project-dark-store",
  storageBucket: "project-dark-store.appspot.com",
  messagingSenderId: "782131384356",
  appId: "1:782131384356:web:74b19bdc59e78263c3c8b1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore();


export { auth, firestore };
