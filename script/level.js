// Firebase setup and Firestore initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNak1aWVJ_HCXmavCuo95FwnrQWgEIQRk",
    authDomain: "lingualab-9832e.firebaseapp.com",
    projectId: "lingualab-9832e",
    storageBucket: "lingualab-9832e.firebasestorage.app",
    messagingSenderId: "97458692092",
    appId: "1:97458692092:web:91f1caec18e753ddd09c79",
    measurementId: "G-9J4EKPQPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let unlockedStages = [];
let stageScores = [];
let bestScores = [];
const quizData = [
    {
        stage: 1,
        levels: [
            {
                level: 1,
                question: "When booking a flight, what does 'departure' mean?",
                answer: "The flight _____ at 3:00 PM from Jakarta.",
                options: ["leaves", "arrives", "cancels", "delays"],
                correctAnswer: "leaves"
            },
            {
                level: 2,
                question: "How do you ask for a seat near the window?",
                answer: "Can I get a seat _____ the window, please?",
                options: ["next to", "behind", "in front of", "beside"],
                correctAnswer: "next to"
            },
        ]
    },
    {
        stage: 2,
        levels: [
            {
                level: 1,
                question: "What is the word for the place where you wait before boarding?",
                answer: "Passengers wait at the _____ before boarding the plane.",
                options: ["departure gate", "check-in desk", "luggage claim", "immigration"],
                correctAnswer: "departure gate"
            },
            {
                level: 2,
                question: "What is the correct phrase for asking about flight availability?",
                answer: "Are there any _____ for flights to Singapore tomorrow?",
                options: ["available seats", "open bags", "extra delays", "free cancellations"],
                correctAnswer: "available seats"
            },
        ]
    },
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


let userAnswers = [];

const userId = localStorage.getItem('userId');
if (!userId) {
    console.error("User ID not found in localStorage.");
    alert("Please log in to access the quiz.");
    window.location.href = 'login.html';
}


/**
 * Fetch user data from Firestore
 */
async function fetchUserData(userId) {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        unlockedStages = userData.unlockedStages || [true, false, false, false, false];
        stageScores = userData.stageScores || [];
        bestScores = userData.bestScores || [];
    } else {
        console.log('No user data found. Initializing new data.');
        await setDoc(userDocRef, {
            unlockedStages: [true, false, false, false, false],
            stageScores: [],
            bestScores: []
        });
    }
}

/**
 * Save user data to Firestore
 */
async function saveUserData(userId) {
    if (!userId || typeof userId !== 'string') {
        console.error("Invalid userId passed to saveUserData:", userId);
        throw new Error("Invalid userId");
    }
    const userDocRef = doc(db, 'users', userId);
    try {
        await updateDoc(userDocRef, {
            unlockedStages,
            stageScores,
            bestScores
        });
        console.log("User data successfully updated!");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
}



/**
 * Render a quiz level
 */
async function renderLevel(userId, stageIndex, levelIndex) {
    const levelData = quizData[stageIndex].levels[levelIndex];
    const quizContainer = document.getElementById('quiz-container');

    // Generate the HTML
    quizContainer.innerHTML = `
        <div id="stage${quizData[stageIndex].stage}-level${levelData.level}" class="quiz-level active">
            <div class="question-section">
                <p>${levelData.question}</p>
            </div>
            <div class="answer-section">
                <p>${levelData.answer.replace("_____", '<span class="drop-box" id="drop-box"></span>')}</p>
            </div>
            <div class="word-options">
                ${levelData.options.map((option, index) => `
                    <div class="course-option-btn" id="word${index+1}" draggable="true">${option}</div>
                `).join('')}
            </div>
            <div class="btn-div">
                <button id="check-answer-btn" class="cta-btn-course">Confirm</button>
            </div>
            <div id="notification-course"></div>
        </div>
    `;

    // Attach drag-and-drop events dynamically
    attachDragAndDropEvents();

    // Attach the checkAnswer event dynamically
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', () => checkAnswer(userId, stageIndex, levelIndex));
    }
}

// Make renderLevel globally accessible
window.renderLevel = renderLevel;



function attachDragAndDropEvents() {
    // Drop box
    const dropBox = document.getElementById('drop-box');
    if (dropBox) {
        dropBox.addEventListener('dragover', allowDrop);
        dropBox.addEventListener('drop', drop);
    }

    // Draggable options
    const draggableItems = document.querySelectorAll('.course-option-btn');
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', drag);
    });
}



/**
 * Update the progress bar
 */
function updateProgressBar(stageIndex, levelIndex) {
    const progressBar = document.getElementById('progress');
    const progressPercent = (levelIndex / quizData[stageIndex].levels.length) * 100;
    progressBar.style.width = progressPercent + '%';
}

// Drag and Drop Functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    const dropBox = document.getElementById('drop-box');
    dropBox.innerText = draggedElement.innerText;
    dropBox.style.borderColor = '#28a745';
    dropBox.style.fontSize = '18px';
    document.getElementById('notification-course').style.display = 'none';
}

/**
 * Check the user's answer and handle progress
 */
async function checkAnswer(userId, stageIndex, levelIndex) {
    const dropBox = document.getElementById('drop-box');
    const answer = dropBox.innerText;
    const correctAnswer = quizData[stageIndex].levels[levelIndex].correctAnswer;
    const notification = document.getElementById('notification-course');

    if (answer === '') {
        notification.className = 'warning';
        notification.style.display = 'block';
        notification.innerText = 'Please drag a word into the box!';
    } else {
        const isCorrect = answer === correctAnswer;
        if (isCorrect) {
            notification.className = 'correct';
            notification.style.display = 'block';
            notification.innerText = 'Correct Answer!';
            stageScores[stageIndex] = (stageScores[stageIndex] || 0) + 10;
        } else {
            notification.className = 'incorrect';
            dropBox.style.borderColor = '#dc3545';
            notification.style.display = 'block';
            notification.innerText = `Wrong Answer. The correct answer was: ${correctAnswer}`;
        }

        // Add the user's answer to the results array
        userAnswers.push({
            stage: stageIndex + 1,
            level: levelIndex + 1,
            correct: isCorrect,
            answer: answer
        });

        disableDragAndDrop();
        document.querySelector('.cta-btn-course').style.display = 'none';
        showNextLevelButton(userId, stageIndex, levelIndex + 1);
        updateProgressBar(stageIndex, levelIndex + 1);
        await saveUserData(userId);
    }
}




/**
 * Disable drag-and-drop after answer is submitted
 */
function disableDragAndDrop() {
    document.querySelectorAll('.course-option-btn').forEach(button => {
        button.setAttribute('draggable', 'false');
        button.classList.add('disabled');
    });
    const dropBox = document.getElementById('drop-box');
    dropBox.ondragover = null;
    dropBox.ondrop = null;
}

/**
 * Show the button for the next level or results
 */
function showNextLevelButton(userId, stageIndex, nextLevelIndex) {
    const btnDiv = document.querySelector('.btn-div');
    if (nextLevelIndex < quizData[stageIndex].levels.length) {
        btnDiv.innerHTML = `<button class="cta-btn-course" onclick="renderLevel('${userId}', ${stageIndex}, ${nextLevelIndex})">Next Level</button>`;
    } else {
        btnDiv.innerHTML = `<button class="cta-btn-course" onclick="showResults('${userId}', ${stageIndex})">View Results</button>`;
    }
}

/**
 * Display the results screen
 */
async function showResults(userId, stageIndex) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2 style="color: green; font-size: 24px; text-align: center;">Congratulations! You have completed the quiz.</h2>
        <h2 style="color: #1e90ff; font-size: 24px; text-align: center;">Quiz Results</h2>
        <div class="results-container">
            ${userAnswers.map((answer, index) => `
                <div class="result-box ${answer.correct ? 'correct' : 'incorrect'}" onclick="showDetails(${index})">
                    <span class="level-number">Level ${answer.level}</span>
                    <span class="result-status">${answer.correct ? 'Correct' : 'Incorrect'}</span>
                </div>
            `).join('')}
        </div>
        <div id="result-details"></div>
        <div style="text-align: center; margin-top: 20px;">
            <button class="retake-btn" onclick="retakeQuiz('${userId}', ${stageIndex})">Retake Quiz</button>
            <button class="done-btn"><a href="home.html" class="done-btn-text">Go Home</a></button>
        </div>
    `;
    document.querySelector('.done-btn-text').addEventListener('click', () => completeStage(userId, stageIndex));
    await saveUserData(userId);
}



// Attach to the global scope
window.showResults = showResults;

function showDetails(index) {
    const result = userAnswers[index];
    const resultDetails = document.getElementById('result-details');
    resultDetails.innerHTML = `
        <div class="details-box">
            <h3>Stage ${result.stage} - Level ${result.level} - ${result.correct ? 'Correct' : 'Incorrect'}</h3>
            <p><strong>Question:</strong> ${quizData[result.stage - 1].levels[result.level - 1].question}</p>
            <p><strong>Your Answer:</strong> ${result.answer}</p>
            <p><strong>Correct Answer:</strong> ${quizData[result.stage - 1].levels[result.level - 1].correctAnswer}</p>
        </div>
    `;
}

window.showDetails = showDetails;

/**
 * Retake a quiz stage and reset its score
 */
async function retakeQuiz(userId, stageIndex) {
    console.log("Retake Quiz called with userId:", userId, "stageIndex:", stageIndex);
    
    if (!userId || typeof userId !== 'string') {
        console.error("Invalid userId in retakeQuiz:", userId);
        return;
    }
    if (typeof stageIndex !== 'number') {
        console.error("Invalid stageIndex in retakeQuiz:", stageIndex);
        return;
    }

    userAnswers = []; // Clear user answers
    stageScores[stageIndex] = 0; // Reset stage scores
    await saveUserData(userId);
    renderLevel(userId, stageIndex, 0);
    updateProgressBar(stageIndex, 0);
}


async function completeStage(userId, stageIndex) {
    console.log(`Completing stage ${stageIndex} for userId: ${userId}`);
    
    if (stageIndex < unlockedStages.length - 1) {
        // Unlock the next stage
        unlockedStages[stageIndex + 1] = true;
        await saveUserData(userId); // Save updated unlockedStages to Firestore

        console.log(`Stage ${stageIndex + 1} unlocked!`);
    } else {
        console.log("No more stages to unlock.");
    }

    // Optionally, show results or end screen
    await showResults(userId, stageIndex);
}

// Ensure the function is globally accessible
window.completeStage = completeStage;





// Attach to the global scope
window.retakeQuiz = retakeQuiz;

/**
 * Initialize the app on page load
 */
window.addEventListener('load', async function () {
    const userId = localStorage.getItem('userId'); // Assume userId is already saved in localStorage
    if (userId) {
        await fetchUserData(userId);
        const stageIndex = parseInt(getQueryParam('stageIndex'), 10) || 0; // Default to stage 0
        renderLevel(userId, stageIndex, 0);
    } else {
        console.error("User ID not found! Please log in.");
        alert("Please log in to access the quiz.");
        window.location.href = 'login.html';
    }
});
