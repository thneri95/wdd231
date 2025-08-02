// discover.js

document.addEventListener('DOMContentLoaded', () => {
    const imageMontageContainer = document.getElementById('image-montage-container');
    const discoverImagesJsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/discover-images.json';

    // Load and display image montage
    async function loadImagesMontage() {
        try {
            const response = await fetch(discoverImagesJsonUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'} \nResponse: ${errorText}`);
            }
            const imagesData = await response.json();
            displayImages(imagesData);
        } catch (error) {
            console.error('Error loading image montage:', error);
            if (imageMontageContainer) {
                imageMontageContainer.innerHTML = '<p>Failed to load images. Please try again later. Check console for details.</p>';
            }
        }
    }

    function displayImages(images) {
        if (!imageMontageContainer) return;
        imageMontageContainer.innerHTML = '';

        if (images.length === 0) {
            imageMontageContainer.innerHTML = '<p>No images available at this time.</p>';
            return;
        }

        images.forEach(imageData => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${imageData.image}" alt="${imageData.name}" loading="lazy">
                <figcaption>${imageData.description}</figcaption>
            `;
            imageMontageContainer.appendChild(figure);
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

    loadImagesMontage();         // Load the image gallery
    displayVisitMessage();       // Show the visit message
});
