

// Course List Array:  ---> (PLACEHOLDER - REPLACE WITH YOUR ACTUAL DATA)
const courses = [
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true // I need to Change to true/false  to mark completion
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Front-end Development I',
        credits: 3,
        completed: false
    },
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Classes',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 232,
        title: 'Dynamic Web Forms',
        credits: 3,
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Introduction to Databases',
        credits: 3,
        completed: false
    },

    {
        subject: 'CSE',
        number: 212,
        title: 'Programming with Data Structures',
        credits: 2,
        completed: false
    },

    {
        subject: 'CSE',
        number: 340,
        title: ' Web Backend Development',
        credits: 3,
        completed: false
    },
    {
        subject: 'CSE',
        number: 341,
        title: 'Web Services Development',
        credits: 3,
        completed: false
    },
    {
        subject: 'WDD',
        number: 330,
        title: 'Web Frontend Development II',
        credits: 3,
        completed: false
    },
    {
        subject: 'WDD',
        number: 430,
        title: 'Web Full-Stack Development',
        credits: 3,
        completed: false
    }



];


// ================== Mobile Navigation Toggle ==================
const hamburger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".main-nav"); // Changed from navMenu to mainNav as per HTML update

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mainNav.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mainNav.classList.remove("active");
}));


// ================== Dynamic Course Display and Filtering ==================
const courseListDiv = document.getElementById('courseList');
const filterAllBtn = document.getElementById('filterAll');
const filterCSEBtn = document.getElementById('filterCSE');
const filterWDDBtn = document.getElementById('filterWDD');
const totalCreditsSpan = document.getElementById('totalCredits');

/**
 * Displays a list of courses in the DOM.
 * @param {Array} courseArray The array of course objects to display!
 */
function displayCourses(courseArray) {
    courseListDiv.innerHTML = ''; // Clear previous content

    if (courseArray.length === 0) {
        courseListDiv.innerHTML = '<p>No courses found for this filter.</p>';
        totalCreditsSpan.textContent = 0;
        return;
    }

    courseArray.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        // Add 'completed' class if the course is completed
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        const subjectP = document.createElement('p');
        subjectP.textContent = `Subject: ${course.subject}`;

        const numberP = document.createElement('p');
        numberP.textContent = `Number: ${course.number}`;

        const titleP = document.createElement('p');
        titleP.textContent = `Title: ${course.title}`;

        const creditsP = document.createElement('p');
        creditsP.textContent = `Credits: ${course.credits}`;

        courseCard.appendChild(subjectP);
        courseCard.appendChild(numberP);
        courseCard.appendChild(titleP);
        courseCard.appendChild(creditsP);

        courseListDiv.appendChild(courseCard);
    });

    // Update total credits for currently displayed courses
    updateTotalCredits(courseArray);
}

/**
 * Calculates and updates the total credits for the given array of courses.
 * @param {Array} courseArray The array of course objects.
 */
function updateTotalCredits(courseArray) {
    const totalCredits = courseArray.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}


// Event Listeners for Filter Buttons
filterAllBtn.addEventListener('click', () => {
    displayCourses(courses); // Display all courses
    // Update active class for buttons
    filterAllBtn.classList.add('active');
    filterCSEBtn.classList.remove('active');
    filterWDDBtn.classList.remove('active');
});

filterCSEBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
    // Update active class for buttons
    filterAllBtn.classList.remove('active');
    filterCSEBtn.classList.add('active');
    filterWDDBtn.classList.remove('active');
});

filterWDDBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
    // Update active class for buttons
    filterAllBtn.classList.remove('active');
    filterCSEBtn.classList.remove('active');
    filterWDDBtn.classList.add('active');
});

// Initial display of all courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCourses(courses);
    filterAllBtn.classList.add('active'); // Set 'All' button as active initially
});

