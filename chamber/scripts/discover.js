// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {
    const imageMontageContainer = document.getElementById('image-montage-container');
    const jsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/discover-images.json';

    async function loadImages() {
        try {
            const response = await fetch(jsonUrl);
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

    loadImages();
});