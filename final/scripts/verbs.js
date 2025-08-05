// verbs.js - Handles logic for the verbs page.

let allVerbs = [];

// Fetch verb data from JSON
async function fetchVerbs() {
    try {
        const response = await fetch('data/verbs.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching verbs:', error);
        return [];
    }
}

// Display verb cards
function displayVerbs(verbs) {
    const verbGrid = document.getElementById('verb-grid');
    if (!verbGrid) return;

    verbGrid.innerHTML = '';

    verbs.forEach(verb => {
        const card = document.createElement('div');
        card.className = 'verb-card';
        card.innerHTML = `<h3>${verb.verb}</h3>`;
        card.addEventListener('click', () => openConjugationModal(verb));
        verbGrid.appendChild(card);
    });
}

// Open modal with conjugation details
function openConjugationModal(verb) {
    const modal = document.getElementById('conjugation-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h2>${verb.verb} <small>(${verb.translation})</small></h2>
        <table id="conjugation-table">
            <tr><th>Pronoun</th><th>Conjugation</th></tr>
            <tr><td>yo</td><td>${verb.conjugations.yo}</td></tr>
            <tr><td>tú</td><td>${verb.conjugations.tu}</td></tr>
            <tr><td>él/ella/usted</td><td>${verb.conjugations.el}</td></tr>
            <tr><td>nosotros</td><td>${verb.conjugations.nosotros}</td></tr>
            <tr><td>vosotros</td><td>${verb.conjugations.vosotros}</td></tr>
            <tr><td>ellos/ellas/ustedes</td><td>${verb.conjugations.ellos}</td></tr>
        </table>
    `;

    modal.showModal();
}

// Handle verb filtering by ending
function handleFilter() {
    const filterSelect = document.getElementById('verb-filter');
    if (!filterSelect) return;

    filterSelect.addEventListener('change', (event) => {
        const selectedEnding = event.target.value;
        const filteredVerbs = (selectedEnding === 'all')
            ? allVerbs
            : allVerbs.filter(verb => verb.verb.endsWith(selectedEnding));
        displayVerbs(filteredVerbs);
    });
}

// Init function called on DOMContentLoaded
export async function init() {
    allVerbs = await fetchVerbs();
    displayVerbs(allVerbs);
    handleFilter();

    const modal = document.getElementById('conjugation-modal');
    const closeModalButton = document.getElementById('close-modal-button');
    if (modal && closeModalButton) {
        closeModalButton.addEventListener('click', () => modal.close());
    }
}
