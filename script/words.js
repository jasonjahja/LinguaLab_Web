let words = [
    { 
        word: 'Punctual', 
        definition: 'Happening or doing something at the agreed or proper time.',
        synonyms: ['Timely', 'On time', 'Prompt'],
        examples: ['She is always punctual for her meetings.', 'The train arrived at the station punctually.'],
        origin: 'From Latin "punctualis" meaning "of a point".'
    },
    { 
        word: 'Aberration', 
        definition: 'A departure from what is normal, usual, or expected.',
        synonyms: ['Anomaly', 'Deviation', 'Oddity'],
        examples: ['The sudden drop in temperature was considered an aberration.', 'His angry outburst was an aberration of his usual calm demeanor.'],
        origin: 'From Latin "aberrationem" meaning "a wandering, straying".'
    },
    { 
        word: 'Perseverance', 
        definition: 'Persistence in doing something despite difficulty or delay in achieving success.',
        synonyms: ['Persistence', 'Determination', 'Tenacity'],
        examples: ['Her perseverance led to a successful career.', 'With perseverance, he completed the marathon despite the injury.'],
        origin: 'From Latin "perseverantia" meaning "steadfastness".'
    },
    { 
        word: 'Gratitude', 
        definition: 'The quality of being thankful; readiness to show appreciation.',
        synonyms: ['Thankfulness', 'Appreciation', 'Recognition'],
        examples: ['She expressed her gratitude to everyone who supported her.', 'He felt immense gratitude for the kindness of strangers.'],
        origin: 'From Latin "gratitudo" meaning "thankfulness".'
    },
    { 
        word: 'Zealous', 
        definition: 'Having or showing great energy or enthusiasm in pursuit of a cause.',
        synonyms: ['Passionate', 'Fervent', 'Dedicated'],
        examples: ['The zealous volunteers worked tirelessly for the cause.', 'He was zealous in his pursuit of knowledge.'],
        origin: 'From Greek "zelos" meaning "ardor, fervor".'
    },
    { 
        word: 'Resilience', 
        definition: 'The capacity to recover quickly from difficulties.',
        synonyms: ['Endurance', 'Adaptability', 'Toughness'],
        examples: ['Her resilience in the face of adversity was inspiring.', 'The bridge’s design showcased its resilience against natural disasters.'],
        origin: 'From Latin "resilire" meaning "to rebound, recoil".'
    },
    { 
        word: 'Ephemeral', 
        definition: 'Lasting for a very short time.',
        synonyms: ['Short-lived', 'Transient', 'Fleeting'],
        examples: ['The beauty of the sunset was ephemeral.', 'The fame of social media influencers is often ephemeral.'],
        origin: 'From Greek "ephemeros" meaning "lasting a day".'
    },
    { 
        word: 'Lethargic', 
        definition: 'Affected by lethargy; sluggish and apathetic.',
        synonyms: ['Sluggish', 'Inactive', 'Drowsy'],
        examples: ['He felt lethargic after staying up all night.', 'The hot weather made everyone feel lethargic.'],
        origin: 'From Greek "lethargos" meaning "forgetful".'
    },
    { 
        word: 'Indelible', 
        definition: 'Making marks that cannot be removed; not able to be forgotten.',
        synonyms: ['Permanent', 'Unforgettable', 'Enduring'],
        examples: ['The experience left an indelible mark on her.', 'The indelible ink was used for the signature.'],
        origin: 'From Latin "indelebilis" meaning "indestructible".'
    },
    { 
        word: 'Equivocal', 
        definition: 'Open to more than one interpretation; ambiguous.',
        synonyms: ['Ambiguous', 'Unclear', 'Vague'],
        examples: ['His response was equivocal and left us confused.', 'The evidence in the case was equivocal at best.'],
        origin: 'From Latin "aequivocus" meaning "of identical sound, ambiguous".'
    },
    { 
        word: 'Magnanimous', 
        definition: 'Generous or forgiving, especially towards a rival or less powerful person.',
        synonyms: ['Generous', 'Noble', 'Charitable'],
        examples: ['He was magnanimous in victory, praising his opponent.', 'Her magnanimous gesture impressed everyone.'],
        origin: 'From Latin "magnanimus" meaning "great-souled".'
    },
    { 
        word: 'Sagacious', 
        definition: 'Having or showing keen mental discernment and good judgment.',
        synonyms: ['Wise', 'Shrewd', 'Insightful'],
        examples: ['The sagacious leader was respected by everyone.', 'Her sagacious decision saved the company.'],
        origin: 'From Latin "sagax" meaning "wise, perceptive".'
    },
    { 
        word: 'Surreptitious', 
        definition: 'Kept secret, especially because it would not be approved of.',
        synonyms: ['Secretive', 'Clandestine', 'Stealthy'],
        examples: ['They held a surreptitious meeting late at night.', 'Her surreptitious glance did not go unnoticed.'],
        origin: 'From Latin "surrepticius" meaning "stolen".'
    },
    { 
        word: 'Loquacious', 
        definition: 'Tending to talk a great deal; talkative.',
        synonyms: ['Talkative', 'Chatty', 'Garrulous'],
        examples: ['Her loquacious nature made her popular at parties.', 'He became loquacious after having a few drinks.'],
        origin: 'From Latin "loquax" meaning "talkative".'
    },
    { 
        word: 'Obfuscate', 
        definition: 'To deliberately make something unclear or obscure.',
        synonyms: ['Confuse', 'Blur', 'Muddle'],
        examples: ['The politician tried to obfuscate the issue.', 'The complicated language only served to obfuscate the argument.'],
        origin: 'From Latin "obfuscare" meaning "to darken".'
    },
    { 
        word: 'Tenacity', 
        definition: 'The quality of being very determined; persistence.',
        synonyms: ['Determination', 'Persistence', 'Resolution'],
        examples: ['Her tenacity in solving the problem was commendable.', 'The team showed great tenacity throughout the match.'],
        origin: 'From Latin "tenacitas" meaning "holding fast".'
    },
    { 
        word: 'Ubiquitous', 
        definition: 'Present, appearing, or found everywhere.',
        synonyms: ['Omnipresent', 'Pervasive', 'Widespread'],
        examples: ['The smartphone has become a ubiquitous device.', 'His influence was ubiquitous in the organization.'],
        origin: 'From Latin "ubique" meaning "everywhere".'
    }
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