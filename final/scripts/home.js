// This module handles the logic for the home page.

/**
 * Fetches vocabulary data from a JSON file.
 * @returns {Promise<Array>} Array of vocabulary objects or empty array on error.
 */
async function fetchVocabulary() {
    try {
        const response = await fetch('data/vocabulary.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        return [];
    }
}

/**
 * Displays a random "Word of the Day" from the fetched vocabulary.
 * @param {Array} vocabulary - Array of vocabulary objects.
 */
function displayWordOfTheDay(vocabulary) {
    const wordContainer = document.getElementById('word-container');

    if (!wordContainer) {
        console.warn('word-container not found in DOM.');
        return;
    }

    if (!Array.isArray(vocabulary) || vocabulary.length === 0) {
        wordContainer.innerHTML = '<p class="error">Could not load the word of the day.</p>';
        return;
    }

    const todayWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];

    wordContainer.innerHTML = `
        <h3>${todayWord.word}</h3>
        <p class="translation">${todayWord.translation}</p>
        <p class="example">"${todayWord.example}"</p>
        <img src="${todayWord.image}" 
             alt="Image related to ${todayWord.word}" 
             loading="lazy" 
             style="max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;">
    `;
}

/**
 * Initializes the home page module.
 */
export async function init() {
    const vocabulary = await fetchVocabulary();
    displayWordOfTheDay(vocabulary);
}
