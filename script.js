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

window.onload = () => {
    createWordButtons();
    createCourseCards();
};

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

    // Clear notification
    document.getElementById('notification').innerText = '';
}

// Check Answer Function
function checkAnswer() {
    const dropBox = document.getElementById('drop-box');
    const answer = dropBox.innerText;

    if (answer === 'Punctual') {
        document.getElementById('notification').style.color = 'green';
        document.getElementById('notification').innerText = 'Correct Answer!';
    } else if (answer === '') {
        document.getElementById('notification').innerText = 'Please drag a word into the box!';
    } else {
        document.getElementById('notification').style.color = 'red';
        document.getElementById('notification').innerText = 'Wrong Answer. Try again.';
    }
}
