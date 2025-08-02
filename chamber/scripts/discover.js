// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {
    const imageMontageContainer = document.getElementById('image-montage-container');
    const jsonUrl = 'https://thneri95.github.io/wdd231/chamber/discover.json'; // Caminho para o seu JSON de imagens

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
                imageMontageContainer.innerHTML = '<p>Failed to load images. Please try again later.</p>';
            }
        }
    }

    function displayImages(images) {
        if (!imageMontageContainer) return;
        imageMontageContainer.innerHTML = ''; // Limpar conteúdo existente

        if (images.length === 0) {
            imageMontageContainer.innerHTML = '<p>No images available at this time.</p>';
            return;
        }

        images.forEach(imageData => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${imageData.src}" alt="${imageData.alt}" loading="lazy">
                <figcaption>${imageData.caption}</figcaption>
            `;
            imageMontageContainer.appendChild(figure);
        });
    }

    // Chamar a função para carregar as imagens quando a página carregar
    loadImages();
});