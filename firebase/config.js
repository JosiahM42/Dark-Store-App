// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAfC2VpkXr3ymwax3c8c2t7CGFL0dvUNg",
  authDomain: "dark-store-project.firebaseapp.com",
  projectId: "dark-store-project",
  storageBucket: "dark-store-project.appspot.com",
  messagingSenderId: "965163673516",
  appId: "1:965163673516:web:237c569788f5ca4a00fc09",
  measurementId: "G-YMWKXJ7TQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);