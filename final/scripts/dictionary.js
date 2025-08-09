// resources.js — Lógica da página de recursos, configurada para a API Merriam-Webster

class DictionaryApp {
    constructor() {
        // IMPORTANTE: Substitua 'SUA_CHAVE_API_AQUI' pela sua chave real do Merriam-Webster
        this.apiKey = '4de7f6d4-1a2a-40d1-9275-d5f0fa106f57';

        this.apiUrl = `https://dictionaryapi.com/api/v3/references/spanish/json/test?key=`;

        this.elements = {
            wordInput: document.getElementById('word-input'),
            searchButton: document.getElementById('search-button'),
            resultsContainer: document.getElementById('dictionary-results'),
            recentSearchesContainer: document.getElementById('recent-searches-container'),
            recentSearchesList: document.getElementById('recent-searches-list')
        };
        this.recentSearches = this.getRecentSearches();
    }

    // --- Inicialização ---
    init() {
        if (!this.elements.wordInput) return;
        this.setupEventListeners();
        this.displayInitialState();
        this.displayRecentSearches();
    }

    setupEventListeners() {
        this.elements.searchButton.addEventListener('click', () => this.handleSearch());
        this.elements.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

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

        this.elements.resultsContainer.addEventListener('click', (e) => {
            const audioButton = e.target.closest('.audio-button');
            if (audioButton) {
                this.playAudio(audioButton.dataset.audio);
            }
        });
    }

    // --- Lógica de Pesquisa e Obtenção de Dados ---
    handleSearch() {
        const word = this.elements.wordInput.value.trim();
        if (word) {
            this.performSearch(word);
        }
    }

    async performSearch(word) {
        if (this.apiKey === '4de7f6d4-1a2a-40d1-9275-d5f0fa106f57') {
            this.displayError('Please enter a valid API key in the resources.js file.');
            return;
        }

        this.elements.wordInput.value = word;
        this.elements.resultsContainer.innerHTML = '<div class="spinner"></div>';
        try {
            const response = await fetch(`${this.apiUrl}${word}?key=${this.apiKey}`);

            // MELHORIA: Lida com respostas que não são 'ok' (ex: chave de API inválida causa erro 403)
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}. Check if your API key is valid for the Spanish-English Dictionary.`);
            }
            const data = await response.json();
            this.displayDefinition(data, word);
            this.saveRecentSearch(word);
        } catch (error) {
            console.error("Dictionary fetch error:", error); // Mostra o erro completo na consola para depuração
            this.displayError(`An error occurred. Please check the browser console for details and ensure your API key is correct.`);
        }
    }

    // --- Lógica de Exibição ---
    displayInitialState() {
        this.elements.resultsContainer.innerHTML = `<p>Welcome to the dictionary! Enter a Spanish word above to get started.</p>`;
    }

    displayError(message) {
        this.elements.resultsContainer.innerHTML = `<p class="card error">${message}</p>`;
    }

    displayDefinition(data, searchedWord) {
        if (!data || data.length === 0) {
            this.displayError(`No definition found for "<strong>${searchedWord}</strong>".`);
            return;
        }

        if (typeof data[0] === 'string') {
            const suggestionsHtml = data.map(suggestion => `<li>${suggestion}</li>`).join('');
            this.displayError(`The word "<strong>${searchedWord}</strong>" was not found. Did you mean:<ul>${suggestionsHtml}</ul>`);
            return;
        }

        const entriesHtml = data.map(entry => {
            if (!entry.meta || !entry.fl) return '';

            const word = entry.meta.id.split(':')[0];
            const partOfSpeech = entry.fl;

            let audioUrl = '';
            if (entry.hwi && entry.hwi.prs && entry.hwi.prs[0].sound) {
                const audioFileName = entry.hwi.prs[0].sound.audio;
                const subDir = audioFileName.startsWith('bix') ? 'bix' :
                    audioFileName.startsWith('gg') ? 'gg' :
                        audioFileName.charAt(0);
                audioUrl = `https://media.merriam-webster.com/audio/prons/es/me/mp3/${subDir}/${audioFileName}.mp3`;
            }

            const audioButton = audioUrl ?
                `<button class="audio-button" data-audio="${audioUrl}" aria-label="Listen to pronunciation">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>
                </button>` : '';

            const definitionsHtml = entry.shortdef.map(def => `<li>${def}</li>`).join('');

            return `
                <div class="entry card">
                    <div class="entry-header">
                        <h3>${word}</h3>
                        ${audioButton}
                    </div>
                    <div class="meaning-entry">
                        <h4><em>(${partOfSpeech})</em></h4>
                        <ul>${definitionsHtml}</ul>
                    </div>
                </div>
            `;
        }).join('');

        if (!entriesHtml) {
            this.displayError(`A valid definition for "<strong>${searchedWord}</strong>" could not be found.`);
            return;
        }

        this.elements.resultsContainer.innerHTML = entriesHtml;
    }

    // --- Lógica de Áudio e Armazenamento Local ---
    playAudio(audioUrl) {
        if (audioUrl) {
            new Audio(audioUrl).play().catch(e => console.error("Error playing audio:", e));
        }
    }

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

// --- Exportação do Módulo ---
export function init() {
    const app = new DictionaryApp();
    app.init();
}
