// main.js - Script principal para todas as páginas
import { init as initDictionary } from './dictionary.js';


// Atualiza dinamicamente o ano no rodapé
const setFooterYear = () => {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
};

// Gerencia a navegação mobile (menu hambúrguer)
const handleMobileNav = () => {
    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            const isExpanded = nav.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isExpanded.toString());
        });
    }
};

// Destaca o link ativo da navegação com base na página atual
const setActiveNavLink = () => {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });
};

// Carrega o módulo JS correspondente à página atual
const loadPageModule = () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (!page || page === 'index.html') {
        import('./home.js').then(module => module.init()).catch(err => console.error('Erro ao carregar home.js', err));
    } else if (page === 'verbs.html') {
        import('./verbs.js').then(module => module.init()).catch(err => console.error('Erro ao carregar verbs.js', err));
    } else if (page === 'resources.html') {
        import('./dictionary.js').then(module => module.init()).catch(err => console.error('Erro ao carregar dictionary.js', err));
    }
};

// Inicializa funcionalidades compartilhadas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    handleMobileNav();
    setActiveNavLink();
    loadPageModule();
});
