let snakeDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let score = 0;
let speed = 20;
let lastPaintTime = 0;
let snakeArr = [
    { x: 12, y: 15 }
]

food = { x: 5, y: 8 };

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        //console.log(ctime);
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if snake collide with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you collide into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;

}

function gameEngine() {
    //Part 1:Updating snakeArr And food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        snakeDir = { x: 0, y: 0 };
        Swal.fire({
            text: 'Game Over. Please try again!!',
            icon: 'error',
            confirmButtonText: 'Retry'
        });
        snakeArr = [{ x: 12, y: 15 }];
        score = 0;
    }

    // If snake have eatten the food , increament the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + snakeDir.x, y: snakeArr[0].y + snakeDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += snakeDir.x;
    snakeArr[0].y += snakeDir.y;


    //Part 2:Display Snake and food
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Game logic starts
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    snakeDir = { x: 0, y: 1 }//start the game
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log('arrowup');
            snakeDir.x = 0;
            snakeDir.y = -1;
            break;

        case "ArrowDown":
            console.log('arrowdown');
            snakeDir.x = 0;
            snakeDir.y = 1
            break;

        case "ArrowLeft":
            console.log('arrowleft');
            snakeDir.x = -1;
            snakeDir.y = 0
            break;

        case "ArrowRight":
            console.log('arrowright');
            snakeDir.x = 1;
            snakeDir.y = 0;
            break;

        default:
            break;
    }

});
