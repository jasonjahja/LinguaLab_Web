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

// function removeElement(array, wordToRemove) {
//     array.forEach((item, index) => {
//         if (item === wordToRemove) {
//             array.splice(index, 1);
//         }
//     });
//     return array;
// }

window.addEventListener('load', function() {
    if (document.getElementById('confirm-btn')) {
        disableConfirmButton(true);
        document.getElementById('notification').innerText = '* You must select 1 word.';
    }

    if (document.getElementById('word-list')) {
        createWordButtons();
    }
});