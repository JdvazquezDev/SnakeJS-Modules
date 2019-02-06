import Square from './Square.js'
import Snake from './Snake.js'

console.log('Starting Game...');

const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const snake = new Snake();

const SIZE = 20;

let food = null; // x: y:

let dx = 0;
let dy = 0;

let lastAxis; // 'Y' 'X'

setInterval(main, 100); // 1000ms = 1s

function main() { // Logic
    update(); // update variables
    draw(); // draw game objects
}

function update() {
    const collisionDetected = checkSnakeCollision();
    if (collisionDetected) {
        gameOver();
        return;
    }

    //Save previous position
    let prevX, prevY;
    const lastElement = snake.getLastElement();
    prevX = lastElement.x;
    prevY = lastElement.y;

    //Makes the snake advance
    snake.move(dx, dy);

    if (dx !== 0) {
        lastAxis = 'X'
    } else if (dy !== 0) {
        lastAxis = 'Y';
    }

    // Detect if snake has eaten food
    if (food && snake.head.checkCollision(food)) {
        food = null;
        // Increase the size of the snake
        increaseSnakeSize(prevX, prevY);
    }

    // Generate food if it doesn't already exists
    if (!food) {
        food = randomFoodPosition();
    }
}

function randomFoodPosition() {
    let position;
    do {
        position = new Square(getRandomX(), getRandomY());
    }
    while (checkFoodCollision(position));
    return position;
}

function checkFoodCollision(position) {
    if (snake.checkFullCollision(position))
        return true;

    return false;
}

function checkSnakeCollision() {
    // Check if coordinates of head are the same as other elem of snake's snake.body
    if (snake.hasCollided())
        return true;

    // Detect snake collisions against context limits
    if (snake.hasBrokenTheLimits(0, myCanvas.width - SIZE, 0, myCanvas.height - SIZE))
        return true;

    return false;
}

function gameOver() {
    alert('GAME OVER!');
    dx = 0;
    dy = 0;
    snake.reset();
}

function increaseSnakeSize(prevX, prevY) {
    snake.addElement(
        new Square(prevX, prevY)
    );
}

function getRandomX() {
    // 0, 20, 40, ..., 380
    // 0, 1, 2, 3, ..., 20  x2
    return 20 * parseInt(Math.random() * 20);
}

function getRandomY() {
    // 0, 20, 40, ..., 440
    // 0, 1, 2, 3, ..., 22 x2
    return 20 * parseInt(Math.random() * 22);
}

function draw() {
    // Define black background
    context.fillStyle = 'black';
    context.fillRect(0, 0, myCanvas.width, myCanvas.height); // Clear context

    // Head
    drawObject(snake.head, 'lime');

    // Body
    snake.body.forEach(
        elem => drawObject(elem, 'lime')
    );

    // Food
    drawObject(food, 'white');
}

function drawObject(obj, color) {
    context.fillStyle = color;
    context.fillRect(obj.x, obj.y, SIZE, SIZE);
}

// 'keypress' don't activate arrows keys
document.addEventListener('keydown', moveSnake);

function moveSnake(event) {
    // Conditions restrict movement on the same axis
    switch (event.key) {
        case 'ArrowUp':
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = -SIZE;
                console.log('Move up');
            }
            break;
        case 'ArrowDown':
            if (lastAxis !== 'Y') {
                dx = 0;
                dy = SIZE;
                console.log('Move down');
            }
            break;
        case 'ArrowLeft':
            if (lastAxis !== 'X') {
                dx = -SIZE;
                dy = 0;
                console.log('Move left');
            }
            break;
        case 'ArrowRight':
            if (lastAxis !== 'X') {
                dx = SIZE;
                dy = 0;
                console.log('Move right');
            }
            break;
    }
}