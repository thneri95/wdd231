// This module handles all logic for the home page, including "Word of the Day" and "Featured Courses".

// --- Configuration ---
const coursesJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/courses.json';
// Assuming your vocabulary JSON is in a similar location. Adjust the path if needed.
const vocabularyJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/vocabulary.json';

// --- Helper Functions ---

/**
 * A reusable function to fetch JSON data from a URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Array>} A promise that resolves to the JSON data array.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        // Return an empty array on failure so the rest of the script doesn't break.
        return [];
    }
}

/**
 * Formats a number as USD currency.
 * @param {number} price - The price to format.
 * @returns {string} The formatted price string (e.g., "$99.00").
 */
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

/**
 * Calculates the current day of the year (1-366).
 * @returns {number} The current day of the year.
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
 * Displays the deterministic Word of the Day.
 * @param {Array} vocabulary - The array of vocabulary words.
 */
function displayWordOfTheDay(vocabulary) {
    const container = document.getElementById('word-container');
    if (!container || vocabulary.length === 0) {
        if (container) container.innerHTML = '<p>Could not load the word of the day.</p>';
        return;
    }

    // FIX: Use the day of the year to pick the same word for everyone all day.
    const dayIndex = getDayOfYear();
    const todayWord = vocabulary[dayIndex % vocabulary.length];

    if (!todayWord) {
        container.innerHTML = '<p>Word of the day is currently unavailable.</p>';
        return;
    }

    // This HTML structure assumes your vocabulary.json has 'word', 'translation', 'example', and 'image' keys.
    container.innerHTML = `
        <h3>${todayWord.word}</h3>
        <p class="translation">${todayWord.translation}</p>
        <p class="example"><em>"${todayWord.example}"</em></p>
        ${todayWord.image ? `<img src="${todayWord.image}" alt="Image related to ${todayWord.word}" loading="lazy" style="max-width: 100%; height: auto; margin-top: 1rem; border-radius: 8px;">` : ''}
    `;
}

/**
 * Fetches and displays featured courses on the homepage.
 * @param {Array} allCourses - The array of all course objects.
 */
function displayFeaturedCourses(allCourses) {
    const container = document.getElementById('featured-courses-grid');
    if (!container) return;

    if (allCourses.length === 0) {
        container.innerHTML = '<p class="card error">Could not load featured courses.</p>';
        return;
    }

    const featuredCourseIds = [1, 4, 6]; // Beginner, Business, Travel
    const featuredCourses = allCourses.filter(course => featuredCourseIds.includes(course.id));

    container.innerHTML = '';

    featuredCourses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card card';
        card.innerHTML = `
            <img src="${course.image_url}" alt="${course.title}" class="course-image" loading="lazy" onerror="this.src='images/placeholder.jpg';">
            <div class="course-card-content">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-footer">
                    <a href="courses.html" class="course-button">Learn More</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Initialization ---


async function init() {
    // Fetch all data concurrently for better performance.
    const [coursesData, vocabularyData] = await Promise.all([
        fetchData(coursesJsonUrl),
        fetchData(vocabularyJsonUrl)
    ]);

    // Now that all data is loaded, display the sections.
    displayFeaturedCourses(coursesData);
    displayWordOfTheDay(vocabularyData);
}

export { init };