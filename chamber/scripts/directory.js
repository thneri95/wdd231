// js/directory.js

document.addEventListener('DOMContentLoaded', () => {
    const businessListingsContainer = document.getElementById('business-listings');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const searchBar = document.getElementById('search-bar');

    let allBusinesses = [];

    // Function to fetch business data from JSON:
    async function fetchBusinesses() {
        try {
            const response = await fetch('JSON/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allBusinesses = await response.json();
            displayBusinesses(allBusinesses); // Display all businesses after fetching!
        } catch (error) {
            console.error('Error fetching business data:', error);
            businessListingsContainer.innerHTML = '<p>Failed to load business directory. Please try again later.</p>';
        }
    }

    // Function to display businesses:
    function displayBusinesses(filteredBusinesses) {
        businessListingsContainer.innerHTML = ''; // Clear previous listings

        filteredBusinesses.forEach(business => {
            const businessCard = document.createElement('div');
            businessCard.classList.add('business-card');

            // The optional styling block below was removed as it was commented out and not functional.
            // If you decide to add specific styling logic for list/grid in JS later,
            // you can re-implement it here.

            businessCard.innerHTML = `
                <img src="${business.image}" alt="${business.name} Logo" loading="lazy">
                <div class="business-card-info">
                    <h3>${business.name}</h3>
                    <p class="tagline">${business.tagline}</p>
                    <p><strong>Address:</strong> ${business.address}</p>
                    <p><strong>Phone:</strong> <a href="tel:+55${business.phone.replace(/\D/g, '')}">${business.phone}</a></p>
                    <p><strong>Website:</strong> <a href="${business.website}" target="_blank" rel="noopener noreferrer">${business.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p class="description">${business.description}</p>
                </div>
            `;
            businessListingsContainer.appendChild(businessCard);
        });
    }

    // Function to filter businesses based on search input:
    function filterBusinesses() {
        const searchTerm = searchBar.value.toLowerCase();
        const filtered = allBusinesses.filter(business => // Using 'allBusinesses' as the source for filtering
            business.name.toLowerCase().includes(searchTerm) ||
            business.description.toLowerCase().includes(searchTerm) ||
            business.tagline.toLowerCase().includes(searchTerm) ||
            business.address.toLowerCase().includes(searchTerm)
        );
        displayBusinesses(filtered);
    }

    // Event Listeners for View Toggles:
    if (gridViewButton && listViewButton) {
        gridViewButton.addEventListener('click', () => {
            businessListingsContainer.classList.add('grid-view');
            businessListingsContainer.classList.remove('list-view');
            gridViewButton.classList.add('active');
            listViewButton.classList.remove('active');
            // Re-display all businesses. Filtering can be re-applied after this if needed.
            displayBusinesses(allBusinesses);
        });

        listViewButton.addEventListener('click', () => {
            businessListingsContainer.classList.add('list-view');
            businessListingsContainer.classList.remove('grid-view');
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
            // Re-display all businesses. Filtering can be re-applied after this if needed.
            displayBusinesses(allBusinesses);
        });
    }

    // Event Listener for Search Bar:
    if (searchBar) {
        searchBar.addEventListener('keyup', filterBusinesses);
        searchBar.addEventListener('input', filterBusinesses);
    }

    // Call the fetch function to load data when the page loads
    fetchBusinesses();
});