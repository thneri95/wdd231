
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️'; // Sun icon for light mode
        } else {
            darkModeToggle.textContent = '🌑'; // Moon icon for dark mode
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.textContent = '🌑';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.textContent = '☀️';
            }
        });
    }

    // Set current year in footer:
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified date in footer:
    const lastModifiedSpan = document.getElementById('lastmodified');
    if (lastModifiedSpan) {
        // This will display the last modified date of the current HTML file
        // For dynamic updates, you might need server-side logic or a build process
        lastModifiedSpan.textContent = document.lastModified;
    }
});