// dictionary.js — Handles dictionary page logic using DictionaryAPI

// --- API Configuration ---
const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/es/";

// --- Helper Functions ---
const getElement = (id) => document.getElementById(id);
const resultsContainer = getElement('dictionary-results');
const wordInput = getElement('word-input');

// --- Local Storage: Recent Searches ---
const getRecentSearches = () => JSON.parse(localStorage.getItem('recentSearches')) || [];

const saveRecentSearch = (word) => {
    let searches = getRecentSearches();
    searches = searches.filter(w => w.toLowerCase() !== word.toLowerCase());
    searches.unshift(word);
    if (searches.length > 5) searches.pop();
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    displayRecentSearches();
};

const displayRecentSearches = () => {
    const searches = getRecentSearches();
    const container = getElement('recent-searches-container');
    const list = getElement('recent-searches-list');

    if (searches.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    list.innerHTML = searches.map(word => `
        <li>
            <span class="recent-word" tabindex="0" role="button">${word}</span>
            <button class="remove-word" data-word="${word}" aria-label="Remove ${word}">❌</button>
        </li>
    `).join('');

    // Rebind events for search and removal
    list.querySelectorAll('.recent-word').forEach(item => {
        item.addEventListener('click', () => {
            wordInput.value = item.textContent;
            fetchDefinition(item.textContent);
        });
        item.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                wordInput.value = item.textContent;
                fetchDefinition(item.textContent);
            }
        });
    });

    list.querySelectorAll('.remove-word').forEach(button => {
        button.addEventListener('click', () => {
            const wordToRemove = button.dataset.word;
            const updated = getRecentSearches().filter(w => w !== wordToRemove);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            displayRecentSearches();
        });
    });
};

// --- Audio Playback ---
const playAudio = (audioUrl) => {
    if (audioUrl) new Audio(audioUrl).play();
};

// --- Fetch and Display Definitions ---
async function fetchDefinition(word) {
    resultsContainer.innerHTML = '<div class="spinner"></div>';

    try {
        const response = await fetch(`${apiUrl}${word}`);
        if (!response.ok) throw new Error('Word not found');

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('No definition data available');
        }

        displayDefinition(data);
        saveRecentSearch(word);
    } catch (error) {
        console.error("Error fetching definition:", error);
        resultsContainer.innerHTML = `<p>Sorry, we could not find a definition for "<strong>${word}</strong>". Please check the spelling and try again.</p>`;
    }
}

function displayDefinition(data) {
    resultsContainer.innerHTML = '';

    data.forEach(entry => {
        const word = entry.word;
        const phoneticText = entry.phonetic || '';
        const audioUrl = entry.phonetics?.find(p => p.audio)?.audio || '';
        const audioButton = audioUrl
            ? `<button class="audio-button" data-audio="${audioUrl}" aria-label="Listen to pronunciation" tabindex="0">🔊</button>`
            : '';

        let html = `
            <div class="entry">
                <h3>${word} ${audioButton}</h3>
                <p>${phoneticText}</p>
            </div>
        `;

        if (Array.isArray(entry.meanings)) {
            entry.meanings.forEach(meaning => {
                const definitions = meaning.definitions?.map(def => `<li>${def.definition}</li>`).join('') || '';
                html += `
                    <div class="entry">
                        <h4><em>(${meaning.partOfSpeech})</em></h4>
                        <ul>${definitions}</ul>
                    </div>
                `;
            });
        }

        resultsContainer.innerHTML += html;
    });

    // Bind audio play events
    resultsContainer.querySelectorAll('.audio-button').forEach(button => {
        button.addEventListener('click', () => playAudio(button.dataset.audio));
        button.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') playAudio(button.dataset.audio);
        });
    });
}

// --- Initialization ---
export function init() {
    const searchButton = getElement('search-button');

    if (searchButton && wordInput) {
        const performSearch = () => {
            const word = wordInput.value.trim();
            if (word) fetchDefinition(word);
        };

        searchButton.addEventListener('click', performSearch);
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        displayRecentSearches();
    }
}
