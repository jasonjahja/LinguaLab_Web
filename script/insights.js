import { auth, db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    try {
        if (user) {
            console.log("User is logged in:", user.uid);
            await displayInsights(user.uid);
        } else {
            console.error("User is not logged in.");
            window.location.href = "../pages/login.html"; // Redirect to login
        }
    } catch (error) {
        console.error("Error handling user state change:", error);
    }
});


async function fetchUserInsights(userId) {
    const userRef = doc(db, "users", userId);
    try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            console.error("No user document found!");
            throw new Error("No user document found!"); // Explicitly throw error
        }
    } catch (error) {
        console.error("Error fetching user insights:", error);
        throw error; // Re-throw to handle higher in the call stack
    }
}


// Function to display user insights
async function displayInsights(userId) {
    const insightsContainer = document.getElementById("insights-container");

    // Fetch data from Firestore
    const userData = await fetchUserInsights(userId);

    if (userData) {
        const { unlockedStages = [], stageScores = [] } = userData;

        // Create Insights UI
        insightsContainer.innerHTML = `
            <div class="insights-card">
                <h2>Welcome Back, User!</h2>
                <p>Your progress and scores are shown below:</p>
                <div class="progress-container">
                    ${unlockedStages.map((stageUnlocked, index) => `
                        <div class="stage-info">
                            <h3>Stage ${index + 1}</h3>
                            <p>Status: ${stageUnlocked ? "Unlocked" : "Locked"}</p>
                            <p>Best Score: ${stageScores[index] || 0}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        insightsContainer.innerHTML = `<p>Could not load insights. Please try again later.</p>`;
    }
}
