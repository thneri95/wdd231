// main.js - Main script for all pages

/**
 * A map routing page filenames to their corresponding module loaders.
 * This makes the code scalable; to support a new page, just add an entry here.
 * The value is a function that returns a dynamic import promise.
 */
const pageModules = {
    'index.html': () => import('./home.js'),
    'courses.html': () => import('./courses.js'),
    'resources.html': () => import('./resources.js'),
    'contact.html': () => import('./contact.js'),
    // Add other page-specific scripts here, e.g.:
    // 'verbs.html': () => import('./verbs.js'),
};

/**
 * Dynamically updates the year in the footer.
 */
const setFooterYear = () => {
    // Corrected ID to match the HTML: 'current-year'
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
};

/**
 * Manages the mobile navigation (hamburger menu) toggle.
 */
const handleMobileNav = () => {
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('header nav'); // More specific selector

    if (!menuButton || !nav) {
        return; // Exit if elements aren't on the page
    }

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('open');
        // Set aria-expanded to the opposite of its current state
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });
};

/**
 * Sets the 'active' class on the navigation link corresponding to the current page.
 */
const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll('header nav a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        // Use link.href which is the fully resolved URL, for a robust comparison
        if (link.href === currentUrl) {
            link.classList.add('active');
            // For accessibility, indicate the current page
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
};

/**
 * Loads and initializes the JavaScript module for the current page.
 */
const loadPageModule = () => {
    // Get the filename of the current page (e.g., "courses.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Check if the current page has a module defined in our router
    if (pageModules[currentPage]) {
        pageModules[currentPage]()
            .then(module => {
                // Check if the module has an exported 'init' function before calling it
                if (module && typeof module.init === 'function') {
                    module.init();
                }
            })
            .catch(err => {
                console.error(`Failed to load module for ${currentPage}:`, err);
            });
    }
};

/**
 * Main function to initialize all shared functionalities.
 */
const main = () => {
    setFooterYear();
    handleMobileNav();
    setActiveNavLink();
    loadPageModule();
};

// Initialize the main script when the DOM is ready.
document.addEventListener('DOMContentLoaded', main);