
document.addEventListener('DOMContentLoaded', () => {
    const businessListingsContainer = document.getElementById('business-listings');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const searchBar = document.getElementById('search-bar');

    let allBusinesses = [];

    const jsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/members.json';

    async function fetchBusinesses() {
        try {
            const response = await fetch(jsonUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'} \nResponse: ${errorText}`);
            }
            allBusinesses = await response.json();
            displayBusinesses(allBusinesses); // Display all businesses after fetching!
        } catch (error) {
            console.error('Error fetching business data:', error);
            businessListingsContainer.innerHTML = '<p>Failed to load business directory. Please try again later. Check console for details.</p>';
        }
    }

    // Function to display businesses:
    function displayBusinesses(filteredBusinesses) {
        businessListingsContainer.innerHTML = ''; // Need Clear previous listings

        filteredBusinesses.forEach(business => {
            const businessCard = document.createElement('div');
            businessCard.classList.add('business-card');

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
        const filtered = allBusinesses.filter(business => // Using 'allBusinesses' 
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
            // Re-display all businesses
            displayBusinesses(allBusinesses);
        });

        listViewButton.addEventListener('click', () => {
            businessListingsContainer.classList.add('list-view');
            businessListingsContainer.classList.remove('grid-view');
            listViewButton.classList.add('active');
            gridViewButton.classList.remove('active');
            // Re-display all businesses
            displayBusinesses(allBusinesses);
        });
    }

    // Event Listener for Search Bar:
    if (searchBar) {
        searchBar.addEventListener('keyup', filterBusinesses);
        searchBar.addEventListener('input', filterBusinesses);
    }

    fetchBusinesses();
});