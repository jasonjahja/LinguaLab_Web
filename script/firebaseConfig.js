// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration and initialization
const firebaseConfig = { /* your firebase config here */ };
const app = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(app);

// Function to fetch user data
export async function fetchUserData(userId) {
    const userDocRef = doc(firebaseDB, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        return userDoc.data();
    } else {
        await setDoc(userDocRef, {
            unlockedStages: [true, false, false, false, false],
            stageScores: [],
            bestScores: []
        });
        return { unlockedStages: [true, false, false, false, false], stageScores: [], bestScores: [] };
    }
}

// Function to save user data
export async function saveUserData(userId, data) {
    const userDocRef = doc(firebaseDB, 'users', userId);
    await updateDoc(userDocRef, data);
}

// Function to save stage progress
export async function saveStageProgress(userId, stageIndex, score) {
    const userDocRef = doc(firebaseDB, 'users', userId);
    await updateDoc(userDocRef, {
        stages: arrayUnion({
            stageIndex,
            score,
            completed: true
        })
    });
}
