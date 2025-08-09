document.addEventListener("DOMContentLoaded", () => {
    const phraseText = document.getElementById("phrase-text");
    const newPhraseBtn = document.getElementById("new-phrase-button");
    const quizForm = document.getElementById("quiz-form");

    if (phraseText && newPhraseBtn) {
        initializePhraseOfTheDay();
    }

    if (quizForm) {
        initializeQuiz();
    }
});


function initializePhraseOfTheDay() {
    // REFACTORED: Using an array of objects is more structured.
    const phrases = [
        { spanish: "¿Cómo estás?", english: "How are you?" },
        { spanish: "¡Buenos días!", english: "Good morning!" },
        { spanish: "¿Dónde está el baño?", english: "Where is the bathroom?" },
        { spanish: "Gracias por todo.", english: "Thanks for everything." },
        { spanish: "Me gusta aprender español.", english: "I like learning Spanish." },
    ];

    const phraseTextEl = document.getElementById("phrase-text");
    const newPhraseBtnEl = document.getElementById("new-phrase-button");

    function showRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        const phrase = phrases[randomIndex];
        phraseTextEl.innerHTML = `${phrase.spanish} <br><em>${phrase.english}</em>`;
    }

    newPhraseBtnEl.addEventListener("click", showRandomPhrase);
    showRandomPhrase(); // Initial call
}



function initializeQuiz() {
    const quizData = [
        { question: 'What does <em>“comer”</em> mean?', options: [{ value: "eat", label: "To eat" }, { value: "drink", label: "To drink" }, { value: "run", label: "To run" }], correctAnswer: "eat", successMessage: "Correct! 'Comer' means 'to eat'. 🎉", errorMessage: "Not quite. 'Comer' means 'to eat'." },
        { question: 'What does <em>“beber”</em> mean?', options: [{ value: "eat", label: "To eat" }, { value: "write", label: "To write" }, { value: "drink", label: "To drink" }], correctAnswer: "drink", successMessage: "Excellent! 'Beber' means 'to drink'. 🎉", errorMessage: "Incorrect. 'Beber' means 'to drink'." },
        { question: 'What does <em>“correr”</em> mean?', options: [{ value: "walk", label: "To walk" }, { value: "run", label: "To run" }, { value: "sleep", label: "To sleep" }], correctAnswer: "run", successMessage: "Great job! 'Correr' means 'to run'. 🎉", errorMessage: "That's not it. 'Correr' means 'to run'." },
    ];

    let currentQuestionIndex = 0;
    const form = document.getElementById("quiz-form");
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const submitBtn = form.querySelector("button[type='submit']");

    function loadQuestion(index) {
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        feedbackEl.className = 'quiz-feedback'; // Reset classes
        submitBtn.disabled = false;

        const questionData = quizData[index];
        questionEl.innerHTML = questionData.question;

        questionData.options.forEach((opt, i) => {
            const optionId = `q${index}-option${i}`;
            const li = document.createElement('li');

            const input = document.createElement("input");
            input.type = "radio";
            input.id = optionId;
            input.name = "answer";
            input.value = opt.value;

            const label = document.createElement("label");
            label.htmlFor = optionId;
            label.textContent = opt.label;
            label.className = 'quiz-option-label';

            li.appendChild(input);
            li.appendChild(label);
            optionsEl.appendChild(li);
        });
    }

    function handleAnswer(e) {
        e.preventDefault();
        const selectedOption = form.querySelector('input[name="answer"]:checked');

        if (!selectedOption) {
            displayFeedback("Please select an answer.", "error");
            return;
        }

        submitBtn.disabled = true; // Prevent multiple clicks
        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = selectedOption.value === currentQuestion.correctAnswer;

        // Show visual feedback on the options
        const allLabels = form.querySelectorAll('label');
        allLabels.forEach(label => {
            const associatedInput = document.getElementById(label.htmlFor);
            if (associatedInput.value === currentQuestion.correctAnswer) {
                label.classList.add('correct-answer'); // Always show the right answer
            }
            label.classList.add('disabled'); // Disable all options
        });

        const message = isCorrect ? currentQuestion.successMessage : currentQuestion.errorMessage;
        displayFeedback(message, isCorrect ? 'success' : 'error');

        // FIXED: Always proceed to the next question
        setTimeout(nextQuestion, 2000);
    }

    function displayFeedback(message, type) {
        feedbackEl.textContent = message;
        feedbackEl.classList.add(type);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            showCompletionScreen();
        }
    }

    function showCompletionScreen() {
        questionEl.textContent = "Great job! You completed the quiz.";
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        submitBtn.textContent = "Quiz Complete!";
        submitBtn.disabled = true;
    }

    form.addEventListener("submit", handleAnswer);
    loadQuestion(currentQuestionIndex); // Initial load
}