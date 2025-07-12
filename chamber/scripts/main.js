document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu  ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Add/remove 'active' class on the button itself

            // Set aria-expanded based on the navigation state:
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Change button text based on active state for the 'X' effect:
            if (isExpanded) {
                menuToggle.textContent = '✕'; // 'X' icon when menu is open
            } else {
                menuToggle.textContent = '☰'; // Hamburger icon when menu is closed
            }
        });
    }

    // Dark Mode Toggle :
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Create a notification element:

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

    // Function to apply the theme:
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
        // 1. If a theme is saved in localStorage, use it
        // 2. If no theme is saved, use the system preference
        // 3. Otherwise, default to light mode!

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
            if (!localStorage.getItem('theme')) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });

        // Event listener for button click:
        darkModeToggle.addEventListener('click', () => {
            // Toggle between 'dark' and 'light' based on current state!
            const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }

    // --- Set current year in footer-->
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Set last modified date in footer-->
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});