// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { reauthenticateWithCredential, EmailAuthProvider, getAuth, onAuthStateChanged, signOut, updatePassword  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const quizData = [
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
    {
        level: 3,
        question: "What is the word for the place where you wait before boarding?",
        answer: "Passengers wait at the _____ before boarding the plane.",
        options: ["departure gate", "check-in desk", "luggage claim", "immigration"],
        correctAnswer: "departure gate"
    },
    {
        level: 4,
        question: "What is the correct phrase for asking about flight availability?",
        answer: "Are there any _____ for flights to Singapore tomorrow?",
        options: ["available seats", "open bags", "extra delays", "free cancellations"],
        correctAnswer: "available seats"
    },
    {
        level: 5,
        question: "How do you request an upgrade to first class?",
        answer: "I would like to _____ my ticket to first class.",
        options: ["upgrade", "downgrade", "cancel", "delay"],
        correctAnswer: "upgrade"
    }
];

let currentLevel = 0;
let userAnswers = [];

function renderLevel(levelIndex) {
    const levelData = quizData[levelIndex];
    const quizContainer = document.getElementById('quiz-container');
    
    // Generate the question
    quizContainer.innerHTML = `
        <div id="level${levelData.level}" class="quiz-level active">
            <div class="question-section">
                <p>${levelData.question}</p>
            </div>
            <div class="answer-section">
                <p>${levelData.answer.replace("_____", '<span class="drop-box" id="drop-box" ondrop="drop(event)" ondragover="allowDrop(event)"></span>')}</p>
            </div>
            <div class="word-options">
                ${levelData.options.map((option, index) => `
                    <div class="course-option-btn" id="word${index+1}" draggable="true" ondragstart="drag(event)">${option}</div>
                `).join('')}
            </div>
            <div class="btn-div">
                <button class="cta-btn-course" onclick="checkAnswer(${levelIndex})">Confirm</button>
            </div>
            <div id="notification-course"></div>
        </div>
    `;
}

function updateProgressBar(levelIndex) {
    const progressBar = document.getElementById('progress');
    const progressPercent = (levelIndex / quizData.length) * 100; // Calculate percentage
    progressBar.style.width = progressPercent + '%'; // Update progress bar width
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

    // Add dragged word into the drop box
    const dropBox = document.getElementById('drop-box');
    dropBox.innerText = draggedElement.innerText;
    dropBox.style.borderColor = '#28a745';  // Change border color on drop

    // Modify the font size and other CSS properties
    dropBox.style.fontSize = '18px';         // Change the font size
    dropBox.style.padding = 'auto';

    // Clear notification
    document.getElementById('notification-course').style.display = 'none';
}

function checkAnswer(levelIndex) {
    const dropBox = document.getElementById('drop-box');
    const answer = dropBox.innerText;
    const correctAnswer = quizData[levelIndex].correctAnswer;
    const notification = document.getElementById('notification-course');
    
    if (answer === '') {
        notification.className = 'warning'; // Apply warning style
        notification.style.display = 'block';
        notification.innerText = 'Please drag a word into the box!';
    } else {
        if (answer === correctAnswer) {
            notification.className = 'correct'; // Apply correct style
            notification.style.display = 'block';
            notification.innerText = 'Correct Answer!';
            userAnswers.push({ level: levelIndex + 1, correct: true, answer: answer });
        } else {
            notification.className = 'incorrect'; // Apply incorrect style
            dropBox.style.borderColor = '#dc3545'
            notification.style.display = 'block';
            notification.innerText = `Wrong Answer. The correct answer was: ${correctAnswer}`;
            userAnswers.push({ level: levelIndex + 1, correct: false, answer: answer });
        }
        disableDragAndDrop();  // Disable drag-and-drop once the answer is confirmed
        document.querySelector('.cta-btn-course').style.display = 'none'; // Hide confirm button
        showNextLevelButton(levelIndex + 1);  // Show next level button
        updateProgressBar(levelIndex+1);
    }
}

function disableDragAndDrop() {
    // Disable the drag-and-drop for all word buttons
    document.querySelectorAll('.course-option-btn').forEach(button => {
        button.setAttribute('draggable', 'false');  // Disable draggable attribute
        button.classList.add('disabled');
    });

    // Disable the drop area by removing the event listeners
    const dropBox = document.getElementById('drop-box');
    dropBox.ondragover = null;
    dropBox.ondrop = null;
}

function showNextLevelButton(nextLevelIndex) {
    const btnDiv = document.querySelector('.btn-div');
    btnDiv.innerHTML = `<button class="cta-btn-course" onclick="nextLevel(${nextLevelIndex})">Next Level</button>`;
}

function nextLevel(nextLevelIndex) {
    if (nextLevelIndex < quizData.length) {
        renderLevel(nextLevelIndex);
    } else {
        showResults();
    }
}

function showResults() {
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
            <button class="retake-btn" onclick="retakeQuiz()">Retake Quiz</button>
            <button class="done-btn"><a href="home.html" class="done-btn-text">Go Home</a></button>
        </div>
    `;
}

// Show the details of the selected result
function showDetails(index) {
    const result = userAnswers[index];
    const resultDetails = document.getElementById('result-details');
    resultDetails.innerHTML = `
        <div class="details-box">
            <h3>Level ${result.level} - ${result.correct ? 'Correct' : 'Incorrect'}</h3>
            <p><strong>Question:</strong> ${quizData[index].question}</p>
            <p><strong>Your Answer:</strong> ${result.answer}</p>
            <p><strong>Correct Answer:</strong> ${quizData[result.level - 1].correctAnswer}</p>
        </div>
    `;
}

// Retake the quiz
function retakeQuiz() {
    currentLevel = 0;
    userAnswers = []; // Reset answers
    renderLevel(0); // Start over from the first level
    updateProgressBar(0); // Reset progress bar
}