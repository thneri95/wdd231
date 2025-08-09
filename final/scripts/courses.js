// courses.js (module)
const coursesJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/courses.json';
let allCourses = [];

function formatPrice(price) {
    const n = Number(price) || 0;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

// Pequena função para evitar injeção ao montar innerHTML
function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Normaliza caminhos estranhos como "images/business/webp" -> "images/business.webp"
function normalizeImageUrl(url) {
    if (!url) return 'images/placeholder.jpg';
    const s = String(url).trim();
    if (/^https?:\/\//i.test(s)) return s; // url absoluta
    const last = s.split('/').pop();
    // se último segmento não tem ponto e é uma extensão conhecida, converte "/ext" -> ".ext"
    if (last && !last.includes('.')) {
        const extCandidates = /^(webp|jpg|jpeg|png|gif|svg|bmp|avif)$/i;
        if (extCandidates.test(last)) {
            return s.replace(/\/([^\/]+)$/, '.$1');
        }
    }
    return s;
}

function renderCourses(coursesToRender) {
    const container = document.getElementById('course-container');
    if (!container) {
        console.warn('course-container not found');
        return;
    }
    container.innerHTML = '';

    if (!Array.isArray(coursesToRender) || coursesToRender.length === 0) {
        container.innerHTML = '<p class="card">No courses found for the selected level. Please try another selection.</p>';
        return;
    }

    coursesToRender.forEach(course => {
        const imgSrc = normalizeImageUrl(course.image_url ?? course.image ?? `images/courses/${course.id}.jpg`);

        const article = document.createElement('article');
        article.className = 'course-card card';

        article.innerHTML = `
      <img
        src="${escapeHtml(imgSrc)}"
        alt="${escapeHtml(course.title)}"
        class="course-image"
        loading="lazy"
        onerror="this.onerror=null;this.src='images/placeholder.jpg';this.alt='Imagem não disponível';"
      />
      <div class="course-card-content">
        <span class="course-level">${escapeHtml(course.level ?? '')}</span>
        <h3 class="course-title">${escapeHtml(course.title)}</h3>
        <p class="course-description">${escapeHtml(course.description)}</p>
        <div class="course-details"><span>🕒 ${escapeHtml(String(course.duration_weeks ?? '—'))} weeks</span></div>
        <div class="course-footer">
          <span class="course-price">${formatPrice(course.price)}</span>
          <button class="course-button" data-course-id="${escapeHtml(course.id)}" aria-label="View details for ${escapeHtml(course.title)}">Learn More</button>
        </div>
      </div>
    `;

        const btn = article.querySelector('.course-button');
        if (btn) btn.addEventListener('click', () => openModal(course));

        container.appendChild(article);
    });
}

function openModal(course) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
    <h2 id="modal-title">${escapeHtml(course.title)}</h2>
    <p><strong>Level:</strong> ${escapeHtml(course.level)}</p>
    <p><strong>Duration:</strong> ${escapeHtml(String(course.duration_weeks ?? '—'))} weeks</p>
    <p><strong>Price:</strong> ${formatPrice(course.price)}</p>
    ${Array.isArray(course.syllabus) && course.syllabus.length ? `
      <h4>What You'll Learn</h4>
      <ul>${course.syllabus.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    ` : ''}
  `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function setupEventListeners() {
    const filterSelect = document.getElementById('level-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const selected = String(e.target.value || 'all');
            if (selected === 'all') renderCourses(allCourses);
            else renderCourses(allCourses.filter(c => String(c.level || '').toLowerCase() === selected.toLowerCase()));
        });
    }

    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('modal-close');
    if (modal && closeButton) {
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
    }
}

async function init() {
    try {
        const res = await fetch(coursesJsonUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allCourses = Array.isArray(data) ? data : (data.courses ?? []);
        renderCourses(allCourses);
        setupEventListeners();
    } catch (err) {
        console.error('Failed to fetch courses:', err);
        const container = document.getElementById('course-container');
        if (container) container.innerHTML = '<p class="card error">Sorry, we were unable to load the course list at this time. Please try again later.</p>';
    }
}

init();

export { init };
