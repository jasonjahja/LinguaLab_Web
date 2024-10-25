function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

let words = [
    { word: 'Punctual', definition: 'Happening or doing something at the agreed or proper time.' },
    { word: 'Aberration', definition: 'A departure from what is normal, usual, or expected.' },
    { word: 'Perseverance', definition: 'Persistence in doing something despite difficulty or delay in achieving success.' },
    { word: 'Gratitude', definition: 'The quality of being thankful; readiness to show appreciation.' },
    { word: 'Zealous', definition: 'Having or showing great energy or enthusiasm in pursuit of a cause.' },
    { word: 'Resilience', definition: 'The capacity to recover quickly from difficulties.' },
    { word: 'Ephemeral', definition: 'Lasting for a very short time.' },
    { word: 'Lethargic', definition: 'Affected by lethargy; sluggish and apathetic.' },
    { word: 'Indelible', definition: 'Making marks that cannot be removed; not able to be forgotten.' },
    { word: 'Equivocal', definition: 'Open to more than one interpretation; ambiguous.' },
    { word: 'Magnanimous', definition: 'Generous or forgiving, especially towards a rival or less powerful person.' },
    { word: 'Sagacious', definition: 'Having or showing keen mental discernment and good judgment.' },
    { word: 'Surreptitious', definition: 'Kept secret, especially because it would not be approved of.' },
    { word: 'Loquacious', definition: 'Tending to talk a great deal; talkative.' },
    { word: 'Obfuscate', definition: 'To deliberately make something unclear or obscure.' },
    { word: 'Tenacity', definition: 'The quality of being very determined; persistence.' },
    { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere.' }
    
];

function confirmSelection() {
    if (savedWords.length === 1) {
        const selectedWord = savedWords[0];
        window.location.href = `word.html?word=${encodeURIComponent(selectedWord)}`;
    }
}

function displayWordDetails() {
    const wordParam = new URLSearchParams(window.location.search).get('word');
    // const wordData = words.find(w => w.word.toLowerCase() === wordParam.toLowerCase()); 
    const wordData = words.find(w => w.word === wordParam);
    const wordDetailsDiv = document.getElementById('word-details');
    if (wordData) {
        wordDetailsDiv.innerHTML = `
            <h2>${wordData.word}</h2>
            <p>${wordData.definition}</p>
        `;
    } else {
        wordDetailsDiv.innerHTML = "<p>Word not found.</p>";
    }
}

let savedWords = [];

function createWordButtons() {
    const wordListDiv = document.getElementById('word-list');
    wordListDiv.innerHTML = '';

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
    // if (!savedWords.includes(word)) {
    //     savedWords.unshift(word);
    // } else {
    //     removeElement(savedWords, word);
    // }

    // if (savedWords.length != 1) {
    //     document.getElementById('notification').innerText = '* You must select 1 word.';
    //     disableConfirmButton(true); 
    // } else {
    //     document.getElementById('notification').innerText = '';
    //     disableConfirmButton(false); 
    // }
    // highlightSelectedWords();
    savedWords=[word];
    document.getElementById('notification').innerText = ''; 
    disableConfirmButton(false);
    highlightSelectedWords();
}

function disableConfirmButton(isDisabled) {
    const confirmButton = document.getElementById('confirm-btn');
    if (isDisabled) {
        confirmButton.disabled = true;
        confirmButton.style.backgroundColor = '#ccc'; 
        confirmButton.style.cursor = 'not-allowed';
    } else {
        confirmButton.disabled = false;
        confirmButton.style.backgroundColor = '#007BFF'; 
        confirmButton.style.cursor = 'pointer';
    }
}


function highlightSelectedWords() {
    const buttons = document.querySelectorAll('.word-btn');

    
    buttons.forEach(button => {
        const word = button.getAttribute('data-word');
        if (savedWords.includes(word)) {
            button.style.backgroundColor = 'blue';  
            button.style.color = 'white'; 
        } else {
            button.style.backgroundColor = ''; 
            button.style.color = ''; 
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

function displaySavedWords() {
    const savedWordsDiv = document.getElementById('saved-words');
    savedWordsDiv.innerHTML = "Saved words: " + savedWords.join(', ');
}

function confirmSelection() {
    if (savedWords.length === 1) {
        const selectedWord = savedWords[0];
        window.location.href = `word.html?word=${encodeURIComponent(selectedWord)}`;
    }
}

const courses = [
    { 
        thumbnail: 'assets/8609147_5836-removebg-preview.png', 
        title: 'Book a Flight to a Tourist Destination', 
        description: 'Learn how to book flights to popular tourist destinations, with special tips on selecting affordable tickets.',  
        link: 'course.html'
    },
    { 
        thumbnail: 'assets/8609147_5836-removebg-preview.png', 
        title: 'Hotel Booking for Business Trips', 
        description: 'Explore how to book the right hotels for business trips, focusing on locations, amenities, and corporate discounts.',  
        link: 'course.html'
    },
    { 
        thumbnail: 'assets/8609147_5836-removebg-preview.png', 
        title: 'Renting a Car: A Complete Guide', 
        description: 'Learn how to rent a car efficiently, comparing prices, insurance options, and tips on international rentals.',  
        link: 'course.html'
    },
    { 
        thumbnail: 'assets/8609147_5836-removebg-preview.png', 
        title: 'Navigating Travel Insurance', 
        description: 'Understand the different types of travel insurance and how to choose the best coverage for your trip.',  
        link: 'course.html'
    },
    { 
        thumbnail: 'assets/8609147_5836-removebg-preview.png', 
        title: 'Booking Guided Tours', 
        description: 'Find out how to book guided tours for your vacation, including tips on selecting the best tour operators.',  
        link: 'course.html'
    }
];


// Function to create word buttons
function createCourseCards() {
    const courseListDiv = document.getElementById('card-container');
    courseListDiv.innerHTML = ''; // Clear the word list

    courses.forEach(({ thumbnail, title, description, link }, index) => 
        courseListDiv.innerHTML += 
        `<div class="card"> 
            <a href=${link}>
                <div class="card-thumbnail">
                    <img src=${thumbnail} alt="Thumbnail">
                </div>
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </a>
        </div>`
    );
}

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


window.onload = () => {
    if (document.getElementById('confirm-btn')) {
        disableConfirmButton(true);
        document.getElementById('notification').innerText = '* You must select 1 word.';
    }

    // Check if word list container exists before calling createWordButtons
    if (document.getElementById('word-list')) {
        createWordButtons();
    }

    // Check if course list container exists before calling createCourseCards
    if (document.getElementById('card-container')) {
        createCourseCards();
    }

    // if (document.getElementById('word-details')) displayWordDetails();

    // Check if quiz container exists before calling renderLevel
    if (document.getElementById('quiz-container')) {
        renderLevel(0); // Start with the first level
    }
};