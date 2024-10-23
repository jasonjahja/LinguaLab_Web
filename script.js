// // JavaScript for the Word Selection and Button Functionality

// // Select all word buttons
// const wordButtons = document.querySelectorAll('.word-btn');
// let selectedWords = [];

// // Toggle the active state of the word buttons
// wordButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const word = button.textContent.trim();
        
//         if (button.classList.contains('active')) {
//             button.classList.remove('active');
//             selectedWords = selectedWords.filter(selectedWord => selectedWord !== word);
//         } else {
//             button.classList.add('active');
//             selectedWords.push(word);
//         }
//     });
// });

// // Confirm button action
// const confirmBtn = document.getElementById('confirm-btn');
// confirmBtn.addEventListener('click', () => {
//     if (selectedWords.length >= 3) {
//         alert('You selected the following words: ' + selectedWords.join(', '));
//     } else {
//         alert('Please select at least 3 words to continue.');
//     }
// });

// // Redirect from login button (assuming there is a login button with class .login-btn)
// const loginBtn = document.querySelector('.login-btn');
// if (loginBtn) {
//     loginBtn.addEventListener('click', () => {
//         window.location.href = 'words.html';
//     });
// }

// function redirectToDefinitionPage(word) {
//     // Example of redirecting to a new page based on the word clicked
//     // You can replace the URL below with the actual URL you want to redirect to.
//     window.location.href = `/dictionary/${word}`;
// }

let words = [
    { word: 'Punctual', definition: 'Happening or doing something at the agreed or proper time.' },
    { word: 'Aberration', definition: 'A departure from what is normal, usual, or expected.' },
    { word: 'Perseverance', definition: 'Persistence in doing something despite difficulty or delay in achieving success.' },
    { word: 'Gratitude', definition: 'The quality of being thankful; readiness to show appreciation.' }
];
let savedWords = [];

// Function to create word buttons
function createWordButtons() {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = ''; // Clear the word list

    // Create buttons for each word in the words array
    words.forEach(({ word, definition }) => 
        wordListDiv.innerHTML += 
        `<div class="word-btn" data-word="${word}" onclick="saveWord('${word}')">
            ${word}
            <div class="word-dropdown">
                ${definition}
            </div>
        </div>`
    );
}

// Function to save the clicked word
function saveWord(word) {
    // Check if the word is already in the savedWords array
    if (!savedWords.includes(word)) {
        savedWords.unshift(word); // Add the word to the beginning of the array
    } else {
        removeElement(savedWords, word);
    }

    // Ensure only 3 words are saved
    if (savedWords.length > 3) {
        // Display a notification if more than 3 words are selected
        document.getElementById('notification').innerText = 'You have selected more than 3 words.';
    } else {
        // Clear the notification if 3 or fewer words are selected
        document.getElementById('notification').innerText = '';
    }

    displaySavedWords(); // Update the display
    highlightSelectedWords(); // Change the color of selected words
}

// Function to highlight selected words by turning their buttons blue
function highlightSelectedWords() {
    const buttons = document.querySelectorAll('.word-btn'); // Get all word buttons

    // Loop through each button and change its color if it's in savedWords
    buttons.forEach(button => {
        const word = button.getAttribute('data-word'); // Get the word from the data-word attribute
        if (savedWords.includes(word)) {
            button.style.backgroundColor = 'blue';  // Change background color to blue
            button.style.color = 'white';  // Change text color to white
        } else {
            button.style.backgroundColor = ''; // Reset to default background color
            button.style.color = '';  // Reset to default text color
        }
    });
}

function removeElement(array, wordToRemove) {
    array.forEach((item, index) => {
        if (item === wordToRemove) {
            array.splice(index, 1);
        }
    });
    return array;
}

// Function to display the saved words
function displaySavedWords() {
    const savedWordsDiv = document.getElementById('saved-words');
    savedWordsDiv.innerHTML = "Saved words: " + savedWords.join(', ');
}

// Function to save selected words and update sidebar
function confirmSelection() {
    // Update the sidebar with the saved words
    const sidebar = document.getElementById('sidebar-saved-words');
    if (sidebar) {
        sidebar.innerHTML = 'Selected words: ' + savedWords.join(', ');
    }

    // Redirect to words.html (you can replace with any action you want)
    window.location.href = 'word.html';
}

let courses = [
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
    { thumbnail: 'assets/8609147_5836-removebg-preview.png', title: 'Book a Flight', subtitle: 'Try booking a flight from Indonesia to Singapore',  link: 'course.html'},
];

// Function to create word buttons
function createCourseCards() {
    const courseListDiv = document.getElementById('card-container');
    courseListDiv.innerHTML = ''; // Clear the word list

    // Create buttons for each word in the words array
    courses.forEach(({ thumbnail, title, subtitle, link }) => 
        courseListDiv.innerHTML += 
        `<div class="card"> 
            <a href=${link}>
                <div class="card-thumbnail">
                    <img src=${thumbnail} alt="Thumbnail">
                </div>
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                </div>
            </a>
        </div>`
    );
}

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
];

let currentLevel = 0;

function renderLevel(levelIndex) {
    const levelData = quizData[levelIndex];
    const quizContainer = document.getElementById('quiz-container');
    
    // Generate the question
    quizContainer.innerHTML = `
        <div id="level${levelData.level}" class="quiz-level active">
            <div class="question-section">
                <p>${levelData.question.replace("_____", '<span class="drop-box" id="drop-box" ondrop="drop(event)" ondragover="allowDrop(event)"></span>')}</p>
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

// Check Answer Function
function checkAnswer(levelIndex) {
    const dropBox = document.getElementById('drop-box');
    const answer = dropBox.innerText;
    const correctAnswer = quizData[levelIndex].correctAnswer;
    const notification = document.getElementById('notification-course');

    // Show notification and disable drag-and-drop after confirming
    if (answer === '') {
        notification.style.display = 'block';
        notification.style.color = 'red';
        notification.innerText = 'Please drag a word into the box!';
    } else {
        if (answer === correctAnswer) {
            notification.style.display = 'block';
            notification.style.color = 'green';
            notification.innerText = 'Correct Answer. Good Job!';
        } else {
            notification.style.display = 'block';
            notification.style.color = 'red';
            notification.innerText = 'Wrong Answer. Try again.';
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

// Render next level
function nextLevel(nextLevelIndex) {
    if (nextLevelIndex < quizData.length) {
        renderLevel(nextLevelIndex);
    } else {
        document.getElementById('quiz-container').innerHTML = '<div><h2 style="padding: 20px; color: green; font-size: 24px; text-align: center;">Congratulations! You have completed the quiz.</h2><div style="text-align: center;"><button class="cta-btn"><a href="home.html" class="cta-btn-text">Confirm</a></button></div></div>';
    }
}

window.onload = () => {
    // Check if word list container exists before calling createWordButtons
    if (document.getElementById('word-list')) {
        createWordButtons();
    }

    // Check if course list container exists before calling createCourseCards
    if (document.getElementById('card-container')) {
        createCourseCards();
    }

    // Check if quiz container exists before calling renderLevel
    if (document.getElementById('quiz-container')) {
        renderLevel(0); // Start with the first level
        updateProgressBar(0);
    }
};