
document.addEventListener('DOMContentLoaded', () => {
    const itemsOfInterestContainer = document.getElementById('image-montage-container');
    const jsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/discover-images.json';

    async function loadItemsOfInterest() {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'} \nResponse: ${errorText}`);
            }
            const itemsData = await response.json();
            displayItems(itemsData);
        } catch (error) {
            console.error('Error loading items of interest:', error);
            if (itemsOfInterestContainer) {
                itemsOfInterestContainer.innerHTML = '<p>Failed to load items of interest. Please try again later. Check console for details.</p>';
            }
        }
    }

    function displayItems(items) {
        if (!itemsOfInterestContainer) return;
        itemsOfInterestContainer.innerHTML = '';

        if (items.length === 0) {
            itemsOfInterestContainer.innerHTML = '<p>No items of interest available at this time.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p class="card-description">${item.description}</p>
                <a href="${item.learn_more_url}" class="learn-more-button" target="_blank" rel="noopener noreferrer">Learn More</a>
            `;
            itemsOfInterestContainer.appendChild(card);
        });
    }

    function displayVisitMessage() {
        const visitMessageElement = document.getElementById('visit-message');
        if (!visitMessageElement) return;

        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        let message = '';

        if (!lastVisit) {
            message = "Welcome! Let us know if you have any questions.";
        } else {
            const lastTime = parseInt(lastVisit, 10);
            const msInADay = 1000 * 60 * 60 * 24;
            const daysPassed = Math.floor((now - lastTime) / msInADay);

            if (daysPassed < 1) {
                message = "Back so soon! Awesome!";
            } else if (daysPassed === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysPassed} days ago.`;
            }
        }

        visitMessageElement.textContent = message;
        localStorage.setItem('lastVisit', now.toString());
    }

    displayVisitMessage();
        loadItemsOfInterest();

});