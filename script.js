let Questions = [
    {
        question: "What does 'var' do in JavaScript?",
        correct_answer: "Declares a variable",
        incorrect_answers: ["Defines a function", "Initializes an array", "Defines a class"]
    },
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        correct_answer: "function myFunction() {}",
        incorrect_answers: ["function: myFunction() {}", "function = myFunction() {}", "myFunction = function() {}"]
    },
    {
        question: "Which of these is a JavaScript data type?",
        correct_answer: "Object",
        incorrect_answers: ["Class", "Table", "Tableau"]
    }
];

let currQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let interval;

document.getElementById("retryBtn").style.display = "none"; // Hide retry button initially

// Function to start the quiz
function startQuiz() {
    document.getElementById("start-panel").style.display = "none"; // Hide start panel
    document.getElementById("quiz-panel").style.display = "block"; // Show quiz panel
    loadQues();
}

// Function to load a question
function loadQues() {
    const ques = document.getElementById("ques");
    const opt = document.getElementById("opt");

    let currentQuestion = Questions[currQuestion].question;
    ques.innerText = currentQuestion;

    opt.innerHTML = "";
    const correctAnswer = Questions[currQuestion].correct_answer;
    const incorrectAnswers = Questions[currQuestion].incorrect_answers;
    const options = [correctAnswer, ...incorrectAnswers];
    options.sort(() => Math.random() - 0.5);

    options.forEach((option) => {
        const choicesDiv = document.createElement("div");
        const choice = document.createElement("input");
        const choiceLabel = document.createElement("label");

        choice.type = "radio";
        choice.name = "answer";
        choice.value = option;
        choiceLabel.textContent = option;

        choicesDiv.appendChild(choice);
        choicesDiv.appendChild(choiceLabel);
        opt.appendChild(choicesDiv);
    });

    startTimer();
}

// Function to start the timer
function startTimer() {
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    interval = setInterval(function() {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            checkAns();
        }
    }, 1000);
}

// Function to check the answer
function checkAns() {
    const selectedAns = document.querySelector('input[name="answer"]:checked')?.value;

    if (selectedAns === Questions[currQuestion].correct_answer) {
        score++;
    }

    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        showResults();
    }
}

// Function to display results
function showResults() {
    clearInterval(interval);
    document.getElementById("opt").remove();
    document.getElementById("ques").remove();
    document.getElementById("btn").remove();
    document.getElementById("timer").remove();

    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of 3`;

    document.getElementById("retryBtn").style.display = "inline-block"; // Show retry button
}

// Function to restart the quiz
function restartQuiz() {
    currQuestion = 0;
    score = 0;
    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("quiz-panel").style.display = "none"; // Hide quiz panel
    document.getElementById("start-panel").style.display = "block"; // Show start panel
}
