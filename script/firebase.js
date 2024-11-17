import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNak1aWVJ_HCXmavCuo95FwnrQWgEIQRk",
    authDomain: "lingualab-9832e.firebaseapp.com",
    projectId: "lingualab-9832e",
    storageBucket: "lingualab-9832e.appspot.com",
    messagingSenderId: "97458692092",
    appId: "1:97458692092:web:91f1caec18e753ddd09c79",
    measurementId: "G-9J4EKPQPRD"
};

// Initialize Firebase app safely (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
