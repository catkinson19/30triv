let questions = [];
let time = 30;
let intervalId;
let currentQuestion;
let userAns;
let correct = 0;
let incorrect = 0;

$(document).ready(function () {
    getData();
    welcomeBuild();
});

$(document).on('click', "#reset-game", function () {
    console.log("Reset");
    questions = [];
    time = 30;
    intervalId;
    currentQuestion;
    userAns;
    correct = 0;
    incorrect = 0;
    getData();
    welcomeBuild();
});

$(document).on('click', "#start-game", function () {
    gameStart();
    $("#ans1").click(function () {
        userAns = currentQuestion.mOptions[0];
        evalAns();
    });
    $("#ans2").click(function () {
        userAns = currentQuestion.mOptions[1];
        evalAns();
    });
    $("#ans3").click(function () {
        userAns = currentQuestion.mOptions[2];
        evalAns();
    });
    $("#ans4").click(function () {
        userAns = currentQuestion.mOptions[3];
        evalAns();
    });
});

function gameStart() {
    run();
    gameBuild();
    getQuestion();
}

function gameOver() {
    console.log('game over')
    gameOverBuild();
}

function run() {
    time = time * 20
    intervalId = setInterval(decrement, 50);
}

function decrement() {
    if (time >= 0) {
        time--;
        $('.progress-bar').width((time / 6) + "%");
    } else {
        clearInterval(intervalId);
        gameOver();
    }
}

function getQuestion() {
    let questionCnt = 1 + correct + incorrect;
    let rand = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[rand]
    questions.splice(rand, 1);//This guy is borked
    $("#question-number").html('Question ' + questionCnt);
    $("#question-text").html(currentQuestion.qText);
    $("#ans1").html(currentQuestion.mOptions[0]);
    $("#ans2").html(currentQuestion.mOptions[1]);
    $("#ans3").html(currentQuestion.mOptions[2]);
    $("#ans4").html(currentQuestion.mOptions[3]);
}

function evalAns() {
    //Implement countdown clock
    if (userAns === currentQuestion.mOptions[(currentQuestion.qAnswer - 1)]) {
        correct++;
        console.log('correct');
        setTimeout(function () {
            getQuestion();
        }, 200)
    } else {
        if (currentQuestion.qAnswer === 1) {
            $("#ans1").css("color", "#ff0000");
        }
        if (currentQuestion.qAnswer === 2) {
            $("#ans2").css("color", "#ff0000");
        }
        if (currentQuestion.qAnswer === 3) {
            $("#ans3").css("color", "#ff0000");
        }
        if (currentQuestion.qAnswer === 4) {
            $("#ans4").css("color", "#ff0000");
        }
        incorrect++;
        console.log('incorrect');
        setTimeout(function () {
            $(".ans").removeAttr("style")
            getQuestion();
        }, 200)
    }
}

function getData() {
    $.ajax({
        crossOrigin: false,
        dataType: 'json',
        url: "../30triv/assets/data/questions.json",
        type: "GET",
        success: function (data) {
            Object.keys(data).forEach(function (key) {
                questions.push(data[key]);
            })
        }
    })
}

function welcomeBuild(){
    $("#gameContent").empty();
    $("#gameContent").hide().append('<h1 class="display-3" id="welcome-text">30.triv</h1>').fadeIn(500);
    $("#gameContent").hide().append('<p class="lead" id="info-text">Answer as many questions as possible in 30 seconds</p>').fadeIn(500);
    $("#gameContent").hide().append('<a class="btn btn-primary btn-lg" id="start-game" role="button">Start Game</a>').fadeIn(500);
}

function gameBuild(){
    $("#gameContent").empty();
    $("#gameContent").append('<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>');
    $("#gameContent").append('<h2 class="display-3" id="question-number"></h2>');
    $("#gameContent").append('<p class="display-3" id="question-text"></p>');
    $("#gameContent").append('<div class="row"><div class="col-lg-6"><p class="ans" id="ans1"></p></div><div class="col-lg-6"><p class="ans" id="ans2"></p></div>');
    $("#gameContent").append('<div class="row"><div class="col-lg-6"><p class="ans" id="ans3"></p></div><div class="col-lg-6"><p class="ans" id="ans4"></p></div>');
}

function gameOverBuild(){
    $("#gameContent").empty();
    $("#gameContent").append('<h1 class="display-3" id="welcome-text">Time Up</h1>');
    $("#gameContent").hide().append('<p class="lead" id="correct"></p>').fadeIn(200);
    $("#gameContent").hide().append('<p class="lead" id="incorrect"></p>').fadeIn(200);
    $("#gameContent").hide().append('<a class="btn btn-primary btn-lg" id="reset-game" role="button">Reset</a>').fadeIn(200);
    $("#correct").html("<p>Correct Answers: " + correct + "</p>");
    $("#incorrect").html("<p>Incorrect Answers: " + incorrect + "</p>");
}