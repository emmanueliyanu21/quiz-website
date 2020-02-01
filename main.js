// select all element
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer")

// create our questions
let questions = [
    {
        question: "What does HTML stands for?",
        imgSrc: "img/html.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "What does CSS stands for?",
        imgSrc: "img/css.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
    {
        question: "What does js stands for?",
        imgSrc: "img/js.png",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A"
    },
];

// Create some variables

const lastQuestion = questions.length - 1;
let runningQuestions = 0;

let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
    let q = questions[runningQuestions];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); //
}

// render preogress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }

}

// counter render
function renderCounter() {  // not well understood
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        answerIsWrong()
        if (runningQuestions < lastQuestion) {
            runningQuestions++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

//checkAnswer

function checkAnswer(answer) {
    if (answer == questions[runningQuestions].correct) {
        // answer is correct
        score++
        // change progress to green
        answerIsCorrect()
    } else {
        // answer is wrong
        // change progress bar to red
        answerIsWrong()
    }
    count = 0;
    if (runningQuestions < lastQuestion) {
        runningQuestions++;
        renderQuestion();
    } else {

    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestions).style.backgroundColor = "#0f0";
}

// answer is wrong
function answerIsWrong() {
    document.getElementById(runningQuestions).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";


    // calculate the amount of questions the users answer
    const scorePercent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePercent
    let img = (scorePercent >= 80) ? "img/5.png" :
        (scorePercent >= 60) ? "img/4.png" :
            (scorePercent >= 40) ? "img/3.png" :
                (scorePercent >= 20) ? "img/2.png" :
                    "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML = "<p>" + scorePercent + "%</p>"
}