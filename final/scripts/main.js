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
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        modifiedSpan.textContent = new Intl.DateTimeFormat('en-US', options).format(lastModifiedDate);
    }
};

const handleMobileNav = () => {
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('header nav');

    if (!menuButton || !nav) return;

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.classList.toggle('open');
        nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });
};

const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll('header nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
};

const handleNewsletterForm = () => {
    const newsletterForm = document.querySelector(".newsletter-form");
    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector("input[type='email']");
        const submitButton = newsletterForm.querySelector("button[type='submit']");

        if (emailInput.value.trim() === "") return;

        submitButton.textContent = "Subscribing...";
        submitButton.disabled = true;
        emailInput.disabled = true;

        setTimeout(() => {
            submitButton.textContent = "Thank you! 🎉";
            emailInput.value = "";

            setTimeout(() => {
                submitButton.textContent = "Subscribe";
                submitButton.disabled = false;
                emailInput.disabled = false;
            }, 2500);
        }, 1500);
    });
};

const loadPageModule = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (pageModules[currentPage]) {
        pageModules[currentPage]()
            .catch(err => console.error(`Failed to load module for ${currentPage}:`, err));
    }
};

const initializeSite = () => {
    setFooterYear();
    setLastModified();
    handleMobileNav();
    setActiveNavLink();
    handleNewsletterForm();
    loadPageModule();
};

document.addEventListener('DOMContentLoaded', initializeSite);
