// Variables
let qIndex = 0;
let time = 60;
let countdown;
let correctAnswers = 0;
let points = 0;

// Questions and answers
const questions = [
    {
        q: "What is the correct way to select an element with ID 'myElement' using JavaScript?",
        answers: ["document.myElement", "getElementById('myElement')", "#myElement", "$('#myElement')"],
        a: "getElementById('myElement')"
    },
    {
        q: "Which of the following is NOT a primitive data type in JavaScript?",
        answers: ["string", "boolean", "number", "array"],
        a: "array"
    },
    {
        q: "What does CSS stand for?",
        answers: ["Cascading Style Sheets", "Creative Style Syntax", "Computer Style System", "Customizable Source Sheets"],
        a: "Cascading Style Sheets"
    },
    {
        q: "What is the output of the following code: console.log(1 + '2' + 3 + '4')",
        answers: ["1234", "10", "16", "NaN"],
        a: "1234"
    }
];

// The updatable HTML as game proceeds
const qContainer = document.getElementById("question-container");
const timerEl = document.getElementById("timer");
const aDiv = document.getElementById("answer-container");

// START GAME //
function startGame() {
    time = 60;
    timerEl.textContent = time;
    
    // Start timer
    countdown = setInterval(function() {
        time--;
        timerEl.textContent = time;
        
        // When timer ends, the game ends
        if (time <= 0) {
            endGame();
        }
    }, 1000); 
    
    start(qIndex);
}

// Shows questions and answers
function start(index) {
    const currentQuestion = questions[index];
    
    const qEl = document.createElement("h2");
    qEl.textContent = currentQuestion.q;
    qContainer.innerHTML = "";
    qContainer.appendChild(qEl);

    // Displays buttons
    aDiv.innerHTML = "";
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const aButton = document.createElement("button");
        aButton.textContent = currentQuestion.answers[i];
        
        aButton.addEventListener("click", function() {
            getAnswer(i);
        });
        aDiv.appendChild(aButton);
    }
}

// This checks if answer is correct
function getAnswer(index) {
    const selectedAnswer = questions[qIndex].answers[index];
    const correctAnswer = questions[qIndex].a;

    // Increments if answer is correct and moves on to next question
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        if (qIndex + 1 < questions.length) {
            qIndex++;
            start(qIndex);
        } else {
            endGame();
        }
    } 
    // If answer is incorrect this displays that it is incorrect and deducts 10 seconds
    else {
        time -= 10;
        timerEl.textContent = time;
        
        const msgEl = document.createElement("p");
        msgEl.style.color = "red";
        msgEl.textContent = "Incorrect answer. Please try again.";
        aDiv.appendChild(msgEl);
    }
}

// END GAME //
function endGame() {
    clearInterval(countdown); // Stop countdown timer
    qIndex = 0;
    
    // Creates HTML to show current game stats
    const resultEl = document.createElement("h2");
    resultEl.textContent = "Thanks for playing!";
    qContainer.innerHTML = "";
    qContainer.appendChild(resultEl);

    points = time;

    const correctAnswersEl = document.createElement("p");
    correctAnswersEl.textContent = `You answered ${correctAnswers} questions correctly.`;
    qContainer.appendChild(correctAnswersEl);

    const pointsEl = document.createElement("p");
    pointsEl.textContent = `You earned ${points} points.`;
    qContainer.appendChild(pointsEl);

    // RETRY //
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Retry";
    retryBtn.addEventListener("click", function() {
        time = 60;
        correctAnswers = 0;
        points = 0;
        startGame();
    });
    qContainer.appendChild(retryBtn);
}

startGame(); // Starts the game when page loads 








