// dictionary.js — Handles dictionary page logic using DictionaryAPI

class DictionaryApp {
    constructor() {
        this.apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/es/";
        this.elements = {
            wordInput: document.getElementById('word-input'),
            searchButton: document.getElementById('search-button'),
            resultsContainer: document.getElementById('dictionary-results'),
            recentSearchesContainer: document.getElementById('recent-searches-container'),
            recentSearchesList: document.getElementById('recent-searches-list')
        };
        this.recentSearches = this.getRecentSearches();
    }

    // --- Initialization ---
    init() {
        if (!this.elements.wordInput) return; // Don't run if on the wrong page
        this.setupEventListeners();
        this.displayInitialState();
        this.displayRecentSearches();
    }

    setupEventListeners() {
        // Form submission
        this.elements.searchButton.addEventListener('click', () => this.handleSearch());
        this.elements.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Event delegation for recent searches
        this.elements.recentSearchesList.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('.recent-word')) {
                this.performSearch(target.textContent);
            }
            if (target.closest('.remove-word')) {
                const wordToRemove = target.closest('.remove-word').dataset.word;
                this.removeRecentSearch(wordToRemove);
            }
        });

        // Event delegation for audio buttons
        this.elements.resultsContainer.addEventListener('click', (e) => {
            const audioButton = e.target.closest('.audio-button');
            if (audioButton) {
                this.playAudio(audioButton.dataset.audio);
            }
        });
    }

    // --- Search & Data Fetching ---
    handleSearch() {
        const word = this.elements.wordInput.value.trim();
        if (word) {
            this.performSearch(word);
        }
    }

    async performSearch(word) {
        this.elements.wordInput.value = word;
        this.elements.resultsContainer.innerHTML = '<div class="spinner"></div>';
        try {
            const response = await fetch(`${this.apiUrl}${word}`);
            if (!response.ok) {
                // The API returns a 404 with a JSON body for not found words
                throw new Error('Word not found');
            }
            const data = await response.json();
            this.displayDefinition(data);
            this.saveRecentSearch(word);
        } catch (error) {
            this.displayError(`Sorry, we could not find a definition for "<strong>${word}</strong>". Please check the spelling and try again.`);
        }
    }

    // --- Display Logic ---
    displayInitialState() {
        this.elements.resultsContainer.innerHTML = `<p>Welcome to the dictionary! Enter a word above to get started.</p>`;
    }

    displayError(message) {
        this.elements.resultsContainer.innerHTML = `<p class="card error">${message}</p>`;
    }

    displayDefinition(data) {
        const entriesHtml = data.map(entry => {
            const phoneticText = entry.phonetic || '';
            const audioUrl = entry.phonetics?.find(p => p.audio)?.audio || '';
            const audioButton = audioUrl ?
                `<button class="audio-button" data-audio="${audioUrl}" aria-label="Listen to pronunciation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                </button>` : '';

            const meaningsHtml = entry.meanings.map(meaning => {
                const definitionsHtml = meaning.definitions.map(def => `<li>${def.definition}</li>`).join('');
                return `
                    <div class="meaning-entry">
                        <h4><em>(${meaning.partOfSpeech})</em></h4>
                        <ul>${definitionsHtml}</ul>
                    </div>
                `;
            }).join('');

            return `
                <div class="entry card">
                    <div class="entry-header">
                        <h3>${entry.word}</h3>
                        ${audioButton}
                    </div>
                    <p class="phonetic">${phoneticText}</p>
                    ${meaningsHtml}
                </div>
            `;
        }).join('');

        this.elements.resultsContainer.innerHTML = entriesHtml;
    }

    // --- Audio Playback ---
    playAudio(audioUrl) {
        if (audioUrl) {
            new Audio(audioUrl).play().catch(e => console.error("Error playing audio:", e));
        }
    }

    // --- Local Storage: Recent Searches ---
    getRecentSearches() {
        return JSON.parse(localStorage.getItem('recentSearches')) || [];
    }

    saveRecentSearch(word) {
        this.recentSearches = this.recentSearches.filter(w => w.toLowerCase() !== word.toLowerCase());
        this.recentSearches.unshift(word);
        if (this.recentSearches.length > 5) this.recentSearches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        this.displayRecentSearches();
    }

    removeRecentSearch(wordToRemove) {
        this.recentSearches = this.getRecentSearches().filter(w => w.toLowerCase() !== wordToRemove.toLowerCase());
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        this.displayRecentSearches();
    }

    displayRecentSearches() {
        if (this.recentSearches.length === 0) {
            this.elements.recentSearchesContainer.style.display = 'none';
            return;
        }

        this.elements.recentSearchesContainer.style.display = 'block';
        this.elements.recentSearchesList.innerHTML = this.recentSearches.map(word => `
            <li>
                <span class="recent-word" role="button" tabindex="0">${word}</span>
                <button class="remove-word" data-word="${word}" aria-label="Remove ${word}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                </button>
            </li>
        `).join('');
    }
}

// --- Module Export ---
export function init() {
    const app = new DictionaryApp();
    app.init();
}
