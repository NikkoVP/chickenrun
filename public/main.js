//variable declarations

const gameBoard = document.querySelector("#canvas");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const highscore = document.getElementById("highscore")
const startBtn = document.getElementById("startBtn");
// const exitBtn = document.getElementById("exitBtn");
// const exitBtn2 = document.getElementById("exitHomepage")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const paddle1Color = "rgb(102, 51, 0)";
const paddle2Color = "rgb(102, 51, 0)";
const paddleBorder = "black";
// const ballColor = "yellow"; for testing the location of the ball/chicken
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 100;


const ballImage = new Image();




let intervalID;
let ballSpeed;
let tempHighScore = 0;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerScore = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: 0
}

//EventLisener

window.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", gameStart);
// exitBtn2.addEventListener("click", exitGame);


clearBoard();
drawPaddles();
createBall();


//Functions

function gameStart() {
    clearTimeout(intervalID);
    playerScore = 0;
    updateScore();
    createBall();
    nextTick();
};


function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        nextTick();
    }, 10)
};

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function drawPaddles() {
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

};

function createBall() {
    ballSpeed = 1.5;

    if (Math.round(Math.random()) === 1) {
        ballXDirection = 1;
        ballImage.src = "cutechickenrun.png";
    }
    else {
        ballXDirection = -1;
        ballImage.src = "cutechickenrunleft.png";
    }

    if (Math.round(Math.random()) === 1) {
        ballYDirection = 1;
    }
    else {
        ballYDirection = -1;
    }

    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall();
};

function moveBall() {
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);

    checkCollision();
};

function drawBall() {

    let counter = 0,
        frame_width = 48,
        frame_height = 48;

    ballImage.onload = function () {
        window.requestAnimationFrame(animate);

        function animate() {

            let frame = Math.floor(counter % 2);
            ctx.drawImage(ballImage, frame * frame_width, 0, frame_width, frame_height, ballX - 25, ballY - 23, frame_width, frame_height);
            counter = counter + .10;

            window.requestAnimationFrame(animate);
        }
        //FOR TESTING THE LOCATION OF THE BALL/CHICKEN
        // ctx.fillStyle = ballColor;
        // ctx.strokeStyle = ballBorderColor;
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();
    };
}


function checkCollision() {
    if (ballY <= 0 + ballRadius) {
        ballYDirection *= -1;
    }
    if (ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1;
    }

    if (ballX <= 0) {
        alertmessage();
        updatehighscore();
        playerScore = 0;
        updateScore();
        ballSpeed = 1;

        return;
    }


    if (ballX >= gameWidth) {
        alertmessage();
        updatehighscore();
        playerScore = 0;
        updateScore();
        ballSpeed = 1;

        return;
    }


    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed += 0.3;
            ballImage.src = "cutechickenrun.png";
            drawBall();
            playerScore += 1;
            updateScore();

        }
    }

    if (ballX >= (paddle2.x - ballRadius)) {

        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 0.3;
            ballImage.src = "cutechickenrunleft.png";
            drawBall();
            playerScore += 1;
            updateScore();
        }
    }

};


function changeDirection(event) {
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;

    switch (keyPressed) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
                paddle2.y -= paddleSpeed;
            }
            break;
        case (paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
                paddle2.y += paddleSpeed;
            }
            break;
    }
};

function updateScore() {
    scoreText.textContent = playerScore;
};

function updatehighscore() {
    if (playerScore > tempHighScore) {
        tempHighScore = playerScore;
        highscore.textContent = "Highscore: " + playerScore;
    }
};

function alertmessage() {

    alert(" The chicken got away, Your score is:  " + playerScore + "!  Click 'OK' to play again!")
    ballX = gameWidth / 2;
}


// function exitGame() {

// };


