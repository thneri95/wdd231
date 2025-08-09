// This module handles all logic for the home page, including "Word of the Day" and "Featured Courses".

// --- Configuration ---
const coursesJsonUrl = 'https://thneri95.github.io/wdd231/final/Json/courses.json';
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
        return []; // Return an empty array on failure so the rest of the script doesn't break.
    }
}

/**
 * Formats a number as USD currency. (Not used on the homepage but available for other pages)
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

    const dayIndex = getDayOfYear();
    const todayWord = vocabulary[dayIndex % vocabulary.length];

    if (!todayWord) {
        container.innerHTML = '<p>Word of the day is currently unavailable.</p>';
        return;
    }

    // --- MODIFIED: Removed inline styles from the image and replaced with a class for better practice.
    container.innerHTML = `
        <h3 class="word-title">${todayWord.word}</h3>
        <p class="translation">${todayWord.translation}</p>
        <p class="example"><em>"${todayWord.example}"</em></p>
        ${todayWord.image ? `<img class="word-day-image" src="${todayWord.image}" alt="Image related to ${todayWord.word}" loading="lazy">` : ''}
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
        container.innerHTML = '<p class="card error-message">Could not load featured courses.</p>';
        return;
    }

    const featuredCourseIds = [1, 4, 6]; // Beginner, Business, Travel
    const featuredCourses = allCourses.filter(course => featuredCourseIds.includes(course.id));

    container.innerHTML = ''; // Clear the spinner

    featuredCourses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card card';

        // --- MODIFIED: Added course description and the .mt-auto class to the footer for alignment.
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
}

// --- Initialization ---

/**
 * Initializes the homepage by fetching all necessary data and displaying it.
 */
async function main() {
    // Fetch all data concurrently for better performance.
    const [coursesData, vocabularyData] = await Promise.all([
        fetchData(coursesJsonUrl),
        fetchData(vocabularyJsonUrl)
    ]);

    // Now that all data is loaded, display the sections.
    displayFeaturedCourses(coursesData);
    displayWordOfTheDay(vocabularyData);
}

// Run the main function when the script loads.
main();