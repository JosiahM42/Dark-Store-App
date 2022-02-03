// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import auth from '@react-native-firebase/auth';
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
  appId: "1:965163673516:web:c63bb6bfe30df58e00fc09",
  measurementId: "G-322W12G9QN"
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0){
//   app = firebase.initializeApp(firebaseConfig);
// }
// else {
//   app = firebase.app()
// }
const app = initializeApp(firebaseConfig);

// const auth = auth()

// export { auth };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBAfC2VpkXr3ymwax3c8c2t7CGFL0dvUNg",
//   authDomain: "dark-store-project.firebaseapp.com",
//   projectId: "dark-store-project",
//   storageBucket: "dark-store-project.appspot.com",
//   messagingSenderId: "965163673516",
//   appId: "1:965163673516:web:c63bb6bfe30df58e00fc09",
//   measurementId: "G-322W12G9QN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);