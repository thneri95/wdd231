
// URL for the JSON data file:
const coursesJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/courses.json';

// Module-level variable to store all fetched courses, making it accessible to all functions.
let allCourses = [];

/**
 * Formats a number as USD currency.
 * @param {number} price - The price to format.
 * @returns {string} - The formatted price string ( "$99.00").
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

/**
 * Renders an array of course objects into the DOM.
 * @param {Array} coursesToRender - The array of courses to display.
 */
function renderCourses(coursesToRender) {
    const container = document.getElementById('course-container');
    if (!container) return; // Exit if the container element isn't on the page.

    container.innerHTML = ''; // Clear previous content.

    if (!coursesToRender.length) {
        container.innerHTML = '<p class="card">No courses found for the selected level. Please try another selection.</p>';
        return;
    }

    coursesToRender.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card card';

        card.innerHTML = `
            <img src="images/courses/${course.id}.jpg" alt="${course.title}" class="course-image" loading="lazy" onerror="this.src='images/placeholder.jpg'; this.alt='Placeholder image for course';">
            <div class="course-card-content">
                <span class="course-level">${course.level}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-details">
                    <span>🕒 ${course.duration}</span>
                </div>
                <div class="course-footer">
                    <span class="course-price">${formatPrice(course.price)}</span>
                    <button class="course-button" data-course-id="${course.id}" aria-label="View details for ${course.title}">Learn More</button>
                </div>
            </div>
        `;

        // Add event listener to the "Learn More" button on this specific card.
        card.querySelector('.course-button').addEventListener('click', () => openModal(course));
        container.appendChild(card);
    });
}

/**
 * Opens and populates the course details modal.
 * @param {Object} course - The course object to display.
 */
function openModal(course) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    // Populate the modal with detailed course information.
    modalBody.innerHTML = `
        <h2 id="modal-title">${course.title}</h2>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Price:</strong> ${formatPrice(course.price)}</p>
        ${course.syllabus?.length ? `
            <h4>What You'll Learn:</h4>
            <ul>
                ${course.syllabus.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
        ` : ''}
    `;

    // FIX: Use the .is-open class to trigger CSS animations, instead of inline styles.
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll.
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scroll.
}


function setupEventListeners() {
    // --- Filter logic ---
    const filterSelect = document.getElementById('level-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            const selectedLevel = event.target.value;
            const filteredCourses = selectedLevel === 'all'
                ? allCourses
                : allCourses.filter(course => course.level === selectedLevel);
            renderCourses(filteredCourses);
        });
    }

    // --- Modal closing logic ---
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('modal-close');
    if (modal && closeButton) {
        closeButton.addEventListener('click', closeModal);
        // Close modal if user clicks on the dark overlay.
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
        // Close modal if user presses the Escape key.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
}


async function init() {
    try {
        const response = await fetch(coursesJsonUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Store the fetched courses in the module-level variable.
        allCourses = await response.json();

        // Now that we have the data, render the courses and set up event listeners.
        renderCourses(allCourses);
        setupEventListeners();

    } catch (error) {
        console.error('Failed to fetch and initialize courses:', error);
        const container = document.getElementById('course-container');
        if (container) {
            container.innerHTML = '<p class="card error">Sorry, we were unable to load the course list at this time. Please try again later.</p>';
        }
    }
}

export { init };