


// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {
    const imageMontageContainer = document.getElementById('image-montage-container');
    const discoverImagesJsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/discover-images.json'; // Path to your image JSON

    const itemsOfInterestContainer = document.getElementById('items-of-interest-container');
    const discoverItemsJsonUrl = 'https://thneri95.github.io/wdd231/chamber/JSON/discover-items.json'; // New path for items of interest JSON

    // Function to load and display image montage
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

    // NEW: Function to load and display items of interest
    async function loadItemsOfInterest() {
        try {
            const response = await fetch(discoverItemsJsonUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'} \nResponse: ${errorText}`);
            }
            const itemsData = await response.json();
            displayItems(itemsData);
        } catch (error) {
            console.error('Error loading items of interest:', error);
            if (itemsOfInterestContainer) {
                itemsOfInterestContainer.innerHTML = '<p>Failed to load items of interest. Please try again later.</p>';
            }
        }
    }

    // NEW: Function to display items of interest
    function displayItems(items) {
        if (!itemsOfInterestContainer) return;
        itemsOfInterestContainer.innerHTML = ''; // Clear existing content

        if (items.length === 0) {
            itemsOfInterestContainer.innerHTML = '<p>No items of interest available at this time.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card'); // Add a class for styling

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <a href="${item.learn_more_url}" class="learn-more-button" target="_blank" rel="noopener noreferrer">Learn More</a>
            `;
            itemsOfInterestContainer.appendChild(card);
        });
    }

    // Initial calls when DOM is loaded
    loadImagesMontage(); // Load existing image montage
    loadItemsOfInterest(); // NEW: Load items of interest
});