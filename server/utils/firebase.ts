// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.firebase_API_Key,
  authDomain: "aila-nuxt-shoppingweb.firebaseapp.com",
  databaseURL: "https://aila-nuxt-shoppingweb-default-rtdb.firebaseio.com",
  projectId: "aila-nuxt-shoppingweb",
  storageBucket: "aila-nuxt-shoppingweb.firebasestorage.app",
  messagingSenderId: "1091064377475",
  appId: "1:1091064377475:web:62e4f76f83e991817cebb6",
  measurementId: "G-VGJD28W4Q9"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const rtdb = getDatabase(app)
export const auth = getAuth(app);

const analytics = getAnalytics(app);