
// --- Configuration ---
const coursesJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/courses.json';
const vocabularyJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/vocabulary.json';

// --- Helper Functions ---

/**
 * A reusable function to fetch JSON data from a URL:
 * @param {string} url - The URL to fetch data from!
 * @returns {Promise<Array>} A promise that resolves to the JSON data array!
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return []; // Return an empty array on failure so the rest of the script doesn't break
    }
}

/**
 * Formats a number as USD currency
 * @returns {string} The formatted price string ( "$99.00")
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

/**
 * Calculates the current day of the year (1-366):
 * @returns {number} The current day of the year
 */
function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// --- Display Functions ---

/**
 * Displays the  Word of the Day.
 * @param {Array} vocabulary - The array of vocabulary words
 */
function displayWordOfTheDay(vocabulary) {
    const container = document.getElementById('word-container');
    if (!container || vocabulary.length === 0) {
        if (container) container.innerHTML = '<p>Could not load the word of the day.</p>';
        return;
    }

    const dayIndex = getDayOfYear();
    const todayWord = vocabulary[dayIndex % vocabulary.length];

    if (!todayWord) {
        container.innerHTML = '<p>Word of the day is currently unavailable.</p>';
        return;
    }

    container.innerHTML = `
        <h3 class="word-title">${todayWord.word}</h3>
        <p class="translation">${todayWord.translation}</p>
        <p class="example"><em>"${todayWord.example}"</em></p>
        ${todayWord.image ? `<img class="word-day-image" src="${todayWord.image}" alt="Image related to ${todayWord.word}" loading="lazy">` : ''}
    `;
}

/**
 * Fetches and displays featured courses on my HP
 * @param {Array} allCourses - The array of all course objects
 */
function displayFeaturedCourses(allCourses) {
    const container = document.getElementById('featured-courses-grid');
    if (!container) return;

    if (allCourses.length === 0) {
        container.innerHTML = '<p class="card error-message">Could not load featured courses.</p>';
        return;
    }

    const featuredCourseIds = [1, 4, 6]; // Beginner, Business, Travel etc
    const featuredCourses = allCourses.filter(course => featuredCourseIds.includes(course.id));

    container.innerHTML = ''; // Clear the spinner

    featuredCourses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card card';

        // --- MODIFIED: Added course description and the .mt-auto class to the footer for alignment
        card.innerHTML = `
            <img src="${course.image_url}" alt="${course.title}" loading="lazy" onerror="this.src='images/placeholder.jpg';">
            <div class="course-card-content">
                <h3 class="course-title">${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-footer mt-auto">
                    <a href="courses.html?course=${course.id}" class="cta-button">View Details</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    function displayItems(items) {
        if (!itemsOfInterestContainer) return;
        itemsOfInterestContainer.innerHTML = '';

        if (items.length === 0) {
            itemsOfInterestContainer.innerHTML = '<p>No items of interest available at this time.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p class="card-description">${item.description}</p>
                <a href="${item.learn_more_url}" class="learn-more-button" target="_blank" rel="noopener noreferrer">Learn More</a>
            `;
            itemsOfInterestContainer.appendChild(card);
        });
    }

    function displayVisitMessage() {
        const visitMessageElement = document.getElementById('visit-message');
        if (!visitMessageElement) return;

        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        let message = '';

        if (!lastVisit) {
            message = "Welcome! Let us know if you have any questions.";
        } else {
            const lastTime = parseInt(lastVisit, 10);
            const msInADay = 1000 * 60 * 60 * 24;
            const daysPassed = Math.floor((now - lastTime) / msInADay);

            if (daysPassed < 1) {
                message = "Back so soon! Awesome!";
            } else if (daysPassed === 1) {
                message = "You last visited 1 day ago.";
            } else {
                message = `You last visited ${daysPassed} days ago.`;
            }
        }

        visitMessageElement.textContent = message;
        localStorage.setItem('lastVisit', now.toString());
    }

    displayVisitMessage();
}

// --- Initialization ---


async function main() {
    const [coursesData, vocabularyData] = await Promise.all([
        fetchData(coursesJsonUrl),
        fetchData(vocabularyJsonUrl)
    ]);

    displayFeaturedCourses(coursesData);
    displayWordOfTheDay(vocabularyData);
}


main();