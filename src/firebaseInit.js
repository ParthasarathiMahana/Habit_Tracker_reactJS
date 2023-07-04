// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB41H4dHjfNaSv1alSh3WZS6gSanimTQKY",
  authDomain: "habittracker-34275.firebaseapp.com",
  projectId: "habittracker-34275",
  storageBucket: "habittracker-34275.appspot.com",
  messagingSenderId: "734168322755",
  appId: "1:734168322755:web:fbee24c3a07adf46b10876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);