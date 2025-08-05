// This module handles all logic for the home page.

// --- Data Fetching ---
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
}

// --- Word of the Day ---
// This function takes the list of words and displays one.
function displayWordOfTheDay(vocabulary) {
    const container = document.getElementById('word-container');
    if (!container || vocabulary.length === 0) {
        if (container) container.innerHTML = '<p>Could not load the word of the day.</p>';
        return;
    }
    // It picks a random word from the list.
    const todayWord = vocabulary[Math.floor(Math.random() * vocabulary.length)];

    // It uses the properties from the JSON to build the HTML.
    container.innerHTML = `
        <h3>${todayWord.word}</h3>
        <p class="translation">${todayWord.translation}</p>
        <p class="example">"${todayWord.example}"</p>
        <img src="${todayWord.image}" alt="Image related to ${todayWord.word}" loading="lazy" style="max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;">
    `;
}

// --- Initialization ---
// This is the main function that runs when the page loads.
export async function init() {
    // It calls fetchData to get the vocabulary list.
    const vocabulary = await fetchData('data/vocabulary.json');

    // It then calls displayWordOfTheDay to show a random word.
    displayWordOfTheDay(vocabulary);

    // Note: I've simplified this from your full file to only show the relevant parts.
}
