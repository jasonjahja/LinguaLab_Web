import { auth, db } from "./firebase.js"; // Adjust the path based on your project structure
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        console.log("User ID:", userId);
        // You can now call fetchUserData with userId
        fetchUserData(userId);
    } else {
        console.log("No user is signed in.");
        // Redirect to login or show an appropriate message
    }
});

const courses = [
    { 
        thumbnail: '../assets/8609147_5836-removebg-preview.png', 
        title: 'Book a Flight to a Tourist Destination', 
        description: 'Learn how to book flights to popular tourist destinations, with special tips on selecting affordable tickets.',  
    },
    { 
        thumbnail: '../assets/8609147_5836-removebg-preview.png', 
        title: 'Hotel Booking for Business Trips', 
        description: 'Explore how to book the right hotels for business trips, focusing on locations, amenities, and corporate discounts.',  
    },
    { 
        thumbnail: '../assets/8609147_5836-removebg-preview.png', 
        title: 'Renting a Car: A Complete Guide', 
        description: 'Learn how to rent a car efficiently, comparing prices, insurance options, and tips on international rentals.',  
    },
    { 
        thumbnail: '../assets/8609147_5836-removebg-preview.png', 
        title: 'Navigating Travel Insurance', 
        description: 'Understand the different types of travel insurance and how to choose the best coverage for your trip.',  
    },
    { 
        thumbnail: '../assets/8609147_5836-removebg-preview.png', 
        title: 'Booking Guided Tours', 
        description: 'Find out how to book guided tours for your vacation, including tips on selecting the best tour operators.',  
    }
];

// Tracks unlocked stages and scores (default values)
let unlockedStages = [true, false, false, false, false];

/**
 * Fetch user data from Firestore
 */
async function fetchUserData(userId) {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        unlockedStages = userData.unlockedStages || [true, false, false, false, false];
        console.log("Fetched unlocked stages:", unlockedStages);
    } else {
        console.log("No user data found. Initializing default data.");
        await setDoc(userDocRef, {
            unlockedStages: [true, false, false, false, false],
            scoreStages: []
        });
    }

    createCourseCards();
}

function selectStage(stage, event) {
    window.location.href = `course.html?stageIndex=${stage}`;
}

function createCourseCards() {
    const courseListDiv = document.getElementById('card-container');
    courseListDiv.innerHTML = ''; // Clear existing cards

    courses.forEach(({ thumbnail, title, description }, index) => {
        const isUnlocked = unlockedStages[index]; // Check if this course is unlocked
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${isUnlocked ? '' : 'locked'}`;
        cardDiv.id = `card-${index}`;

        if (isUnlocked) {
            // Add click event to navigate to the course
            cardDiv.addEventListener('click', () => selectStage(index));
        }

        cardDiv.innerHTML = `
            <div class="card-thumbnail">
                <img src="${thumbnail}" alt="Thumbnail">
            </div>
            <div class="card-content">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
            ${!isUnlocked ? `
                <div class="overlay">
                    <span class="lock-icon">🔒</span>
                </div>
            ` : ''}
        `;

        courseListDiv.appendChild(cardDiv);
    });
}


window.addEventListener('load', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            console.log("User ID:", userId);
            fetchUserData(userId); // Fetch user data
        } else {
            console.log("No user is signed in.");
            // Redirect to login or show an appropriate message
        }
    });
    
});