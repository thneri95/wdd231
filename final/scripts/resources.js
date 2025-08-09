document.addEventListener("DOMContentLoaded", () => {
    initializePhraseOfTheDay();
    initializeQuiz();
});

function initializePhraseOfTheDay() {
    const phrases = [
        { spanish: "¿Cómo estás?", english: "How are you?" },
        { spanish: "¡Buenos días!", english: "Good morning!" },
        { spanish: "¿Dónde está el baño?", english: "Where is the bathroom?" },
        { spanish: "Gracias por todo.", english: "Thanks for everything." },
        { spanish: "Me gusta aprender español.", english: "I like learning Spanish." },
        { spanish: "¿Cuál es tu nombre?", english: "What is your name?" },
        { spanish: "Estoy feliz.", english: "I am happy." },
        { spanish: "¿Cuántos años tienes?", english: "How old are you?" },
        { spanish: "¿Dónde vives?", english: "Where do you live?" },
        { spanish: "Hasta luego.", english: "See you later." },
        { spanish: "Por favor, ayuda.", english: "Please, help." },
        { spanish: "Lo siento.", english: "I'm sorry." },
        { spanish: "¿Qué hora es?", english: "What time is it?" },
        { spanish: "Tengo hambre.", english: "I am hungry." },
        { spanish: "¿Quieres bailar?", english: "Do you want to dance?" },
        { spanish: "Hace calor hoy.", english: "It's hot today." },
        { spanish: "¿Puedes repetir?", english: "Can you repeat?" },
        { spanish: "Estoy cansado.", english: "I am tired." },
        { spanish: "Me encanta la música.", english: "I love music." },
        { spanish: "¿Dónde trabajas?", english: "Where do you work?" },
        { spanish: "Tengo sed.", english: "I am thirsty." },
        { spanish: "¿Hablas inglés?", english: "Do you speak English?" },
        { spanish: "Estoy aprendiendo.", english: "I am learning." },
        { spanish: "Necesito un doctor.", english: "I need a doctor." },
        { spanish: "Es muy bonito.", english: "It's very nice." },
        { spanish: "¿Puedes ayudarme?", english: "Can you help me?" },
        { spanish: "Estoy perdido.", english: "I am lost." },
        { spanish: "¿Dónde está la estación?", english: "Where is the station?" },
        { spanish: "Tengo una pregunta.", english: "I have a question." },
        { spanish: "¿Qué quieres comer?", english: "What do you want to eat?" }
    ];

    const phraseTextEl = document.getElementById("phrase-text");
    const newPhraseBtnEl = document.getElementById("new-phrase-button");

    function showRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        const phrase = phrases[randomIndex];
        phraseTextEl.innerHTML = `${phrase.spanish} <br><em>${phrase.english}</em>`;
    }

    newPhraseBtnEl.addEventListener("click", showRandomPhrase);
    showRandomPhrase();
}
function initializeQuiz() {
    const quizDataFull = [
        { question: 'What does <em>“comer”</em> mean?', options: [{ value: "eat", label: "To eat" }, { value: "drink", label: "To drink" }, { value: "run", label: "To run" }], correctAnswer: "eat", successMessage: "Correct! 'Comer' means 'to eat'. 🎉", errorMessage: "Not quite. 'Comer' means 'to eat'." },
        { question: 'What does <em>“beber”</em> mean?', options: [{ value: "eat", label: "To eat" }, { value: "write", label: "To write" }, { value: "drink", label: "To drink" }], correctAnswer: "drink", successMessage: "Excellent! 'Beber' means 'to drink'. 🎉", errorMessage: "Incorrect. 'Beber' means 'to drink'." },
        { question: 'What does <em>“correr”</em> mean?', options: [{ value: "walk", label: "To walk" }, { value: "run", label: "To run" }, { value: "sleep", label: "To sleep" }], correctAnswer: "run", successMessage: "Great job! 'Correr' means 'to run'. 🎉", errorMessage: "That's not it. 'Correr' means 'to run'." },
        { question: 'What does <em>“hablar”</em> mean?', options: [{ value: "talk", label: "To talk" }, { value: "listen", label: "To listen" }, { value: "write", label: "To write" }], correctAnswer: "talk", successMessage: "'Hablar' means 'to talk'. Well done! 🎉", errorMessage: "No, 'Hablar' means 'to talk'." },
        { question: 'What does <em>“leer”</em> mean?', options: [{ value: "read", label: "To read" }, { value: "write", label: "To write" }, { value: "sleep", label: "To sleep" }], correctAnswer: "read", successMessage: "'Leer' means 'to read'. Good job! 🎉", errorMessage: "Oops! 'Leer' means 'to read'." },
        { question: 'What does <em>“escribir”</em> mean?', options: [{ value: "write", label: "To write" }, { value: "read", label: "To read" }, { value: "listen", label: "To listen" }], correctAnswer: "write", successMessage: "'Escribir' means 'to write'. 👍", errorMessage: "'Escribir' means 'to write'." },
        { question: 'What does <em>“escuchar”</em> mean?', options: [{ value: "talk", label: "To talk" }, { value: "listen", label: "To listen" }, { value: "write", label: "To write" }], correctAnswer: "listen", successMessage: "'Escuchar' means 'to listen'. 🎉", errorMessage: "'Escuchar' means 'to listen'." },
        { question: 'What does <em>“dormir”</em> mean?', options: [{ value: "eat", label: "To eat" }, { value: "sleep", label: "To sleep" }, { value: "run", label: "To run" }], correctAnswer: "sleep", successMessage: "'Dormir' means 'to sleep'. 💤", errorMessage: "'Dormir' means 'to sleep'." },
        { question: 'What does <em>“caminar”</em> mean?', options: [{ value: "walk", label: "To walk" }, { value: "run", label: "To run" }, { value: "jump", label: "To jump" }], correctAnswer: "walk", successMessage: "'Caminar' means 'to walk'. 👣", errorMessage: "'Caminar' means 'to walk'." },
        { question: 'What does <em>“beber”</em> mean?', options: [{ value: "drink", label: "To drink" }, { value: "eat", label: "To eat" }, { value: "sleep", label: "To sleep" }], correctAnswer: "drink", successMessage: "'Beber' means 'to drink'. 🥤", errorMessage: "'Beber' means 'to drink'." },
        { question: 'What does <em>“pensar”</em> mean?', options: [{ value: "think", label: "To think" }, { value: "write", label: "To write" }, { value: "listen", label: "To listen" }], correctAnswer: "think", successMessage: "'Pensar' means 'to think'. 🤔", errorMessage: "'Pensar' means 'to think'." },
        { question: 'What does <em>“jugar”</em> mean?', options: [{ value: "play", label: "To play" }, { value: "work", label: "To work" }, { value: "run", label: "To run" }], correctAnswer: "play", successMessage: "'Jugar' means 'to play'. 🕹️", errorMessage: "'Jugar' means 'to play'." },
        { question: 'What does <em>“trabajar”</em> mean?', options: [{ value: "work", label: "To work" }, { value: "play", label: "To play" }, { value: "sleep", label: "To sleep" }], correctAnswer: "work", successMessage: "'Trabajar' means 'to work'. 💼", errorMessage: "'Trabajar' means 'to work'." },
        { question: 'What does <em>“vivir”</em> mean?', options: [{ value: "live", label: "To live" }, { value: "die", label: "To die" }, { value: "sleep", label: "To sleep" }], correctAnswer: "live", successMessage: "'Vivir' means 'to live'. 🌎", errorMessage: "'Vivir' means 'to live'." },
        { question: 'What does <em>“morir”</em> mean?', options: [{ value: "live", label: "To live" }, { value: "die", label: "To die" }, { value: "sleep", label: "To sleep" }], correctAnswer: "die", successMessage: "'Morir' means 'to die'. ☠️", errorMessage: "'Morir' means 'to die'." },
        { question: 'What does <em>“abrir”</em> mean?', options: [{ value: "open", label: "To open" }, { value: "close", label: "To close" }, { value: "shut", label: "To shut" }], correctAnswer: "open", successMessage: "'Abrir' means 'to open'. 🚪", errorMessage: "'Abrir' means 'to open'." },
        { question: 'What does <em>“cerrar”</em> mean?', options: [{ value: "close", label: "To close" }, { value: "open", label: "To open" }, { value: "shut", label: "To shut" }], correctAnswer: "close", successMessage: "'Cerrar' means 'to close'. 🔒", errorMessage: "'Cerrar' means 'to close'." },
        { question: 'What does <em>“escuchar”</em> mean?', options: [{ value: "listen", label: "To listen" }, { value: "talk", label: "To talk" }, { value: "write", label: "To write" }], correctAnswer: "listen", successMessage: "'Escuchar' means 'to listen'. 👂", errorMessage: "'Escuchar' means 'to listen'." },
        { question: 'What does <em>“leer”</em> mean?', options: [{ value: "read", label: "To read" }, { value: "write", label: "To write" }, { value: "listen", label: "To listen" }], correctAnswer: "read", successMessage: "'Leer' means 'to read'. 📖", errorMessage: "'Leer' means 'to read'." },
        { question: 'What does <em>“cantar”</em> mean?', options: [{ value: "sing", label: "To sing" }, { value: "dance", label: "To dance" }, { value: "play", label: "To play" }], correctAnswer: "sing", successMessage: "'Cantar' means 'to sing'. 🎤", errorMessage: "'Cantar' means 'to sing'." },
        { question: 'What does <em>“bailar”</em> mean?', options: [{ value: "dance", label: "To dance" }, { value: "sing", label: "To sing" }, { value: "run", label: "To run" }], correctAnswer: "dance", successMessage: "'Bailar' means 'to dance'. 💃", errorMessage: "'Bailar' means 'to dance'." },
        { question: 'What does <em>“leer”</em> mean?', options: [{ value: "read", label: "To read" }, { value: "write", label: "To write" }, { value: "listen", label: "To listen" }], correctAnswer: "read", successMessage: "'Leer' means 'to read'. 📚", errorMessage: "'Leer' means 'to read'." },
        { question: 'What does <em>“sentir”</em> mean?', options: [{ value: "feel", label: "To feel" }, { value: "hear", label: "To hear" }, { value: "see", label: "To see" }], correctAnswer: "feel", successMessage: "'Sentir' means 'to feel'. ❤️", errorMessage: "'Sentir' means 'to feel'." },
        { question: 'What does <em>“ver”</em> mean?', options: [{ value: "see", label: "To see" }, { value: "hear", label: "To hear" }, { value: "feel", label: "To feel" }], correctAnswer: "see", successMessage: "'Ver' means 'to see'. 👀", errorMessage: "'Ver' means 'to see'." },
        { question: 'What does <em>“tener”</em> mean?', options: [{ value: "have", label: "To have" }, { value: "need", label: "To need" }, { value: "want", label: "To want" }], correctAnswer: "have", successMessage: "'Tener' means 'to have'. 👍", errorMessage: "'Tener' means 'to have'." },
        { question: 'What does <em>“querer”</em> mean?', options: [{ value: "want", label: "To want" }, { value: "have", label: "To have" }, { value: "need", label: "To need" }], correctAnswer: "want", successMessage: "'Querer' means 'to want'. 💖", errorMessage: "'Querer' means 'to want'." },
        { question: 'What does <em>“necesitar”</em> mean?', options: [{ value: "need", label: "To need" }, { value: "have", label: "To have" }, { value: "want", label: "To want" }], correctAnswer: "need", successMessage: "'Necesitar' means 'to need'. 🆘", errorMessage: "'Necesitar' means 'to need'." },
        { question: 'What does <em>“decir”</em> mean?', options: [{ value: "say", label: "To say" }, { value: "tell", label: "To tell" }, { value: "ask", label: "To ask" }], correctAnswer: "say", successMessage: "'Decir' means 'to say'. 🗣️", errorMessage: "'Decir' means 'to say'." },
        { question: 'What does <em>“preguntar”</em> mean?', options: [{ value: "ask", label: "To ask" }, { value: "say", label: "To say" }, { value: "tell", label: "To tell" }], correctAnswer: "ask", successMessage: "'Preguntar' means 'to ask'. ❓", errorMessage: "'Preguntar' means 'to ask'." }
    ];

    // Selecionas 5 perguntas aleatórias sem repetição
    const quizData = shuffleArray(quizDataFull).slice(0, 5);

    let currentQuestionIndex = 0;
    let score = 0;

    const form = document.getElementById("quiz-form");
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const submitBtn = form.querySelector("button[type='submit']");
    function loadQuestion(index) {
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        feedbackEl.className = 'quiz-feedback';
        submitBtn.disabled = false;

        const questionData = quizData[index];
        questionEl.innerHTML = questionData.question;

        // Embaralhar as opções antes de mostrar
        const shuffledOptions = shuffleArray([...questionData.options]);

        shuffledOptions.forEach((opt, i) => {
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

        submitBtn.disabled = true;
        const currentQuestion = quizData[currentQuestionIndex];
        const isCorrect = selectedOption.value === currentQuestion.correctAnswer;

        if (isCorrect) score++;

        const allLabels = form.querySelectorAll('label');
        allLabels.forEach(label => {
            const associatedInput = document.getElementById(label.htmlFor);
            if (!associatedInput) return;

            if (associatedInput.value === currentQuestion.correctAnswer) {
                label.classList.add('correct-answer');
            }
            if (associatedInput.checked && associatedInput.value !== currentQuestion.correctAnswer) {
                label.classList.add('incorrect-answer');
            }
            label.classList.add('disabled');
        });

        const message = isCorrect ? currentQuestion.successMessage : currentQuestion.errorMessage;
        displayFeedback(message, isCorrect ? 'success' : 'error');

        setTimeout(nextQuestion, 2000);
    }

    function displayFeedback(message, type) {
        feedbackEl.textContent = message;
        feedbackEl.className = 'quiz-feedback ' + type;
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
        questionEl.textContent = `Great job! You completed the quiz. Your score is ${score} out of ${quizData.length}.`;
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "";
        submitBtn.textContent = "Quiz Complete!";
        submitBtn.disabled = true;
    }

    form.addEventListener("submit", handleAnswer);
    loadQuestion(currentQuestionIndex);
}

// Função para embaralhar array
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
