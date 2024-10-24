const quizData = [
    {
        level: 1,
        question: "Usage Examples Usage _____ Examples Usage Examples",
        options: ["Punctual", "Aberration", "Perseverance", "Gratitude"],
        correctAnswer: "Punctual"
    },
    {
        level: 2,
        question: "How do you say _____ in English?",
        options: ["Apple", "Orange", "Banana", "Pear"],
        correctAnswer: "Banana"
    },
    {
        level: 3,
        question: "What is the synonym for _____?",
        options: ["Happy", "Sad", "Angry", "Excited"],
        correctAnswer: "Happy"
    }
];

// Store answers to display at the end
let userAnswers = [];

let currentLevel = 0;

// Function to render the current level
function renderLevel(levelIndex) {
    currentLevel = levelIndex; // Update current level
    const levelData = quizData[levelIndex];
    const quizContainer = document.getElementById('question-container');
    
    quizContainer.innerHTML = `
        <div id="level${levelData.level}" class="quiz-level active">
            <h2>Level ${levelData.level}</h2>
            <p>${levelData.question.replace("_____", '<span class="drop-box" id="drop-box" ondrop="drop(event)" ondragover="allowDrop(event)"></span>')}</p>
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

    updateBackButtonState(); // Update the back button
}

// Function to handle Back button visibility and state
function updateBackButtonState() {
    const backButton = document.getElementById('back-btn');
    if (currentLevel === 0) {
        backButton.disabled = true; // Disable if on the first level
    } else {
        backButton.disabled = false; // Enable if not on the first level
    }
}

// Function to go to the previous level
function goBack() {
    if (currentLevel > 0) {
        currentLevel--;
        renderLevel(currentLevel);
        updateProgressBar(currentLevel); // Update progress bar on back
    }
}

// Function to go to the next level
function nextLevel(nextLevelIndex) {
    if (nextLevelIndex < quizData.length) {
        renderLevel(nextLevelIndex);
        updateProgressBar(nextLevelIndex);
    } else {
        showResults(); // Show final results if completed
    }
}

// Rest of the functions remain the same


function updateProgressBar(levelIndex) {
    const progressBar = document.getElementById('progress');
    const progressPercent = ((levelIndex + 1) / quizData.length) * 100; // Calculate percentage
    progressBar.style.width = progressPercent + '%'; // Update progress bar width
}

function checkAnswer(levelIndex) {
    const dropBox = document.getElementById('drop-box');
    const answer = dropBox.innerText;
    const correctAnswer = quizData[levelIndex].correctAnswer;
    const notification = document.getElementById('notification-course');
    
    if (answer === correctAnswer) {
        notification.style.color = 'green';
        notification.innerText = 'Correct Answer!';
        userAnswers.push({ level: levelIndex + 1, correct: true });
    } else {
        notification.style.color = 'red';
        notification.innerText = `Wrong Answer. The correct answer was: ${correctAnswer}`;
        userAnswers.push({ level: levelIndex + 1, correct: false });
    }
    
    disableDragAndDrop();  // Disable drag-and-drop once the answer is confirmed
    document.querySelector('.cta-btn-course').style.display = 'none'; // Hide confirm button
    showNextLevelButton(levelIndex + 1);  // Show next level button
    updateProgressBar(levelIndex);
}

function showNextLevelButton(nextLevelIndex) {
    const btnDiv = document.querySelector('.btn-div');
    btnDiv.innerHTML = `<button class="cta-btn-course" onclick="nextLevel(${nextLevelIndex})">Next Level</button>`;
}

function showResults() {
    const quizContainer = document.getElementById('quiz-page');
    quizContainer.innerHTML = `
        <h2 style="color: #1e90ff;">Quiz Results</h2>
        <div class="results-container">
            ${userAnswers.map(answer => `
                <div class="result ${answer.correct ? 'correct' : 'incorrect'}">
                    Level ${answer.level}: ${answer.correct ? 'Correct' : 'Incorrect'}
                </div>
            `).join('')}
        </div>
        <div style="text-align: center;">
            <button class="cta-btn"><a href="home.html" class="cta-btn-text">Go Home</a></button>
        </div>
    `;
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

// Render next level
function nextLevel(nextLevelIndex) {
    if (nextLevelIndex < quizData.length) {
        renderLevel(nextLevelIndex);
    } else {
        document.getElementById('quiz-page').innerHTML = '<div><h2 style="padding: 20px; color: green; font-size: 24px; text-align: center;">Congratulations! You have completed the quiz.</h2><div style="text-align: center;"><button class="cta-btn"><a href="home.html" class="cta-btn-text">Confirm</a></button></div></div>';
    }
}


window.onload = () => {
    renderLevel(0); // Start with the first level
    updateProgressBar(0);
};
