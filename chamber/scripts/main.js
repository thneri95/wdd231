document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu  ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));


        });
    }

    // --- Dark Mode Toggle: ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Notification element:
    let notification = document.getElementById('theme-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'theme-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--primary-color);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
            box-shadow: 0 2px 10px var(--shadow-color);
            font-size: 0.9em;
            text-align: center;
            white-space: nowrap;
        `;
        document.body.appendChild(notification);
    }

    // Function to show the theme notification:
    function showThemeNotification(message) {
        notification.textContent = message;
        notification.style.opacity = '1';
        notification.style.visibility = 'visible';

        // Hide the notification after 3 seconds:
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.visibility = 'hidden';
        }, 3000);
    }

    // Function to apply the theme (dark or light):
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️'; // Sun icon: currently in dark mode, click to switch to light
            localStorage.setItem('theme', 'dark');
            showThemeNotification('Dark Mode Activated');
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.textContent = '🌙'; // Moon icon: currently in light mode, click to switch to dark
            localStorage.setItem('theme', 'light');
            showThemeNotification('Light Mode Activated');
        }
    }

    if (darkModeToggle) {
        // Check for saved theme preference in localStorage:
        const savedTheme = localStorage.getItem('theme');
        // Check for user's system preference for dark mode:
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Apply theme on initial load:
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDarkScheme.matches) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        // Listen for changes in system preference:
        prefersDarkScheme.addEventListener('change', (event) => {
            // Only change theme based on system preference if no user preference is set
            // This prevents system preference from overriding a user's explicit choice!!!
            if (!localStorage.getItem('theme')) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });

        // Event listener for button click:
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }

    // --- Business Spotlights ---
    const spotlightGrid = document.getElementById('spotlight-businesses');
    const membersJsonUrl = 'https://thneri95.github.io/wdd231/chamber/Json/members.json';

    async function loadSpotlightBusinesses() {
        if (!spotlightGrid) return;

        try {
            const response = await fetch(membersJsonUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'} \nResponse: ${errorText}`);
            }
            const allMembers = await response.json();

            // Filter for Gold and Silver members:
            const eligibleMembers = allMembers.filter(member => member.membership_level === 3 || member.membership_level === 2);

            // If no eligible members, use all members:
            const membersToChooseFrom = eligibleMembers.length > 0 ? eligibleMembers : allMembers;

            // Shuffle the list of members:
            const shuffledMembers = membersToChooseFrom.sort(() => 0.5 - Math.random());

            // Select the first 3:
            const selectedSpotlights = shuffledMembers.slice(0, 3);

            displaySpotlightBusinesses(selectedSpotlights);

        } catch (error) {
            console.error('Error loading featured businesses:', error);
            spotlightGrid.innerHTML = '<p>Failed to load featured businesses. Please try again later.</p>';
        }
    }

    // Function to display featured businesses:
    function displaySpotlightBusinesses(businesses) {
        if (!spotlightGrid) return;
        spotlightGrid.innerHTML = ''; // Clear previous spots

        if (businesses.length === 0) {
            spotlightGrid.innerHTML = '<p>No featured businesses available at this time.</p>';
            return;
        }

        businesses.forEach(business => {
            const businessCard = document.createElement('div');
            businessCard.classList.add('business-card-spotlight');

            businessCard.innerHTML = `
                <img src="${business.image}" alt="${business.name} Logo" loading="lazy">
                <h3>${business.name}</h3>
                <p>${business.tagline}</p>
                <p><a href="${business.website}" target="_blank" rel="noopener noreferrer">${business.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
            `;
            spotlightGrid.appendChild(businessCard);
        });
    }

    // --- Set current year in footer: ---
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Set last modified date in footer: ---
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // --- For my Initial Calls: ---
    loadSpotlightBusinesses();
});