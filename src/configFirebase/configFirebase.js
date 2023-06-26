import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDpoL5gK2ue3D9AiIslRCT2ZDU3I4-DEkc",
  authDomain: "invoices-app-d4350.firebaseapp.com",
  projectId: "invoices-app-d4350",
  storageBucket: "invoices-app-d4350.appspot.com",
  messagingSenderId: "956042439711",
  appId: "1:956042439711:web:b167e694d6f36cc6b3792a",
  measurementId: "G-XCB5EGFNY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth( app );
export const db = getFirestore( app );
export const googleProvider = new GoogleAuthProvider();
