// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz3IRAuWPNLhmECHgi-CaDyj2dv10efBs",
  authDomain: "prepwise-149ef.firebaseapp.com",
  projectId: "prepwise-149ef",
  storageBucket: "prepwise-149ef.firebasestorage.app",
  messagingSenderId: "843807450154",
  appId: "1:843807450154:web:588c32593435d724d7cf53",
  measurementId: "G-GSFSS2GL5V"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);