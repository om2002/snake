let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 7, y: 13 };
//Game FUnction


// Start Instruction
function start() {
    musicSound.play();
    instruction = document.getElementsByClassName('instruction');
    instruction[0].style.visibility = "hidden";
}
// High Score 

let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score " + hiscore;
}
function main(ctime) {

    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    //console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // if you bump into yourself

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true;
    }

    // if you bump into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0)
        return true;

    return false;

}
function gameEngine() {
    //Part1 : Updating the snake array

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over .Press any ARROW key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food ,increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(score));
            hiscoreBox.innerHTML = "Hi Score " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part2 : Display the sanke and food


    //display the snake
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
            //console.log("yup");
        }

        board.appendChild(snakeElement);
    })


    //display the food
    foddElement = document.createElement('div')
    foddElement.style.gridRowStart = food.y;
    foddElement.style.gridColumnStart = food.x;
    foddElement.classList.add('food');
    board.appendChild(foddElement);
}

window.requestAnimationFrame(main);


/**Aroow key for move */
window.addEventListener('keydown', e => {

    inputDir = { x: 0, Y: 1 } // start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRIght")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})



