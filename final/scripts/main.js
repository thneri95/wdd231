// Main script for all pages


const pageModules = {
    'index.html': () => import('./home.js'),
    'courses.html': () => import('./courses.js'),
    'resources.html': () => import('./resources.js'),
    'contact.html': () => import('./contact.js'),
};


const setFooterYear = () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }
};


const setLastModified = () => {
    const modifiedSpan = document.getElementById('last-modified');
    if (modifiedSpan) {
        const lastModifiedDate = new Date(document.lastModified);

        const options = {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };


        modifiedSpan.textContent = new Intl.DateTimeFormat('en-US', options).format(lastModifiedDate);
    }
};


const handleMobileNav = () => {
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('header nav');

    if (!menuButton || !nav) {
        return;
    }

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });
};

const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll('header nav a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
};


const loadPageModule = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (pageModules[currentPage]) {
        pageModules[currentPage]()
            .then(module => {
                if (module && typeof module.init === 'function') {
                    module.init();
                }
            })
            .catch(err => {
                console.error(`Failed to load module for ${currentPage}:`, err);
            });
    }
};


const main = () => {
    setFooterYear();
    setLastModified();
    handleMobileNav();
    setActiveNavLink();
    loadPageModule();
};

document.addEventListener('DOMContentLoaded', main);
