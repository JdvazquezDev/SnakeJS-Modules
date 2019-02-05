const myCanvas = document.getElementById('myCanvas');
const context = myCanvas.getContext('2d');

const SIZE = 20;

const head = {
    x: 0,
    y: 0
};
const body = [];

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
    if (body.length >= 1) {
        prevX = body[body.length - 1].x;
        prevY = body[body.length - 1].y;
    } else {
        prevX = head.x;
        prevY = head.y;
    }

    // The body follows the snake
    for (let i = body.length - 1; i >= 1; --i) {
        body[i].x = body[i - 1].x; // elem.x 1 <- elem.x 0
        body[i].y = body[i - 1].y; // elem.y 1 <- elem.y 0
    }
    if (body.length >= 1) {
        body[0].x = head.x;
        body[0].y = head.y;
    }

    // Update coordinates of the snake's head
    head.x += dx;
    head.y += dy;
    if (dx !== 0) {
        lastAxis = 'X'
    } else if (dy !== 0) {
        lastAxis = 'Y';
    }

    // Detect if snake has eaten food
    if (food && head.x === food.x && head.y === food.y) {
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
        position = {
            x: getRandomX(),
            y: getRandomY()
        };
    }
    while (checkFoodCollision(position));
    return position;
}

function checkSnakeCollision() {
    // Check if coordinates of head are the same as other elem of snake's body
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }

    // Detect snake collisions against context limits
    const topCollision = (head.y < 0); // x: ?, y: 0
    const bottomCollision = (head.y > myCanvas.height); //x: ?, y: myCanvas.height
    const leftCollision = (head.x < 0); // x: 0, y: ?
    const rightCollision = (head.x > myCanvas.width); //x: myCanvas.width, y: ?

    if (topCollision || bottomCollision || leftCollision || rightCollision) {
        return true;
    }

    return false;
}

function checkFoodCollision(position) {
    // Check if coordinates of food are the same as other elem of snake's body
    for (let i = 0; i < body.length; i++) {
        if (position.x === body[i].x && position.y === body[i].y) {
            return true;
        }
    }
    // Check if coordinates of food are the same as snake's head
    if (position.x === head.x && position.y === head.y) {
        return true;
    }

    return false;
}

function gameOver() {
    alert('GAME OVER!');
    head.x = 0;
    head.y = 0;
    dx = 0;
    dy = 0;
    body.length = 0; // By assigning length = 0 js understands that you want to empty the array
}

function increaseSnakeSize(prevX, prevY) {
    body.push({
        x: prevX,
        y: prevY
    });
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
    drawObject(head, 'lime');

    // Body
    body.forEach(
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