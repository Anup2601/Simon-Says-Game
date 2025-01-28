let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let highScore = 0;

const btns = ["blue", "chartreuse", "red", "teal"];
const h2 = document.querySelector("h2");

// Start the game on touch or click
document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn") && !start) {
        console.log("Game Started");
        startGame();
    }
});

document.addEventListener("touchstart", function (e) {
    if (!e.target.classList.contains("btn") && !start) {
        console.log("Game Started (Touch)");
        startGame();
    }
});

// Function to start the game
function startGame() {
    start = true;
    level = 0;
    gameSeq = [];
    nextLevel();
}

// Function to flash a button
function flashButton(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash");
    }, 300);
}

// Function to flash the user's incorrect choice
function userFlashError(button) {
    button.classList.add("user-error");
    setTimeout(() => {
        button.classList.remove("user-error");
    }, 300);
}

// Function to go to the next level
function nextLevel() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIndex = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIndex];
    const randButton = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    // Flash the sequence
    setTimeout(() => {
        flashButton(randButton);
        console.log(`Game Sequence: ${gameSeq}`);
    }, 500);
}

// Function to check the user's input
function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        // If the user has completed the sequence, go to the next level
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, 1000);
        }
    } else {
        gameOver();
    }
}

// Add event listeners for button clicks and touch
document.querySelectorAll(".btn").forEach((button) => {
    // Handle both touch and click events
    button.addEventListener("click", handleButtonPress);
    button.addEventListener("touchstart", handleButtonPress);
});

// Function to handle button presses
function handleButtonPress(e) {
    e.preventDefault(); // Prevent default touch behavior
    const userColor = this.id;
    userSeq.push(userColor);
    flashButton(this);

    console.log(`User Sequence: ${userSeq}`);
    checkAnswer(userSeq.length - 1);
}

// Function to handle game over
function gameOver() {
    const score = level * 10;
    highScore = Math.max(highScore, score);

    h2.innerHTML = `
        Game Over! Your score is <b>${score}</b>.
        High Score: <b>${highScore}</b>. Click anywhere to restart.
    `;

    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
    }, 500);

    resetGame();
}

// Function to reset the game
function resetGame() {
    setTimeout(() => {
        start = false;
        userSeq = [];
        gameSeq = [];
        level = 0;
    }, 2000);
}
