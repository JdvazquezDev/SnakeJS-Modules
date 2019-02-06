import Square from './Square.js'
import Snake from './Snake.js'
import CanvasHandler from './CanvasHandler.js';

export default class {

    constructor(standardSize = 20) {
        this.myCanvas = new CanvasHandler('myCanvas');

        this.SIZE = standardSize;

        this.food = null; // x: y:

        this.snake = new Snake();
        this.dx = 0;
        this.dy = 0;
        this.lastAxis; // 'Y' 'X'

        // 'keypress' don't activate arrows keys
        document.addEventListener('keydown', this.moveSnake);
    }

    update() {
        if (this.snakeHasCollided()) {
            this.gameOver();
            return;
        }

        //Save previous position
        const lastElement = this.snake.getLastElement();
        let prevX = lastElement.x;
        let prevY = lastElement.y;

        //Makes the snake advance
        this.snake.move(this.dx, this.dy);

        if (this.dx !== 0) {
            this.lastAxis = 'X'
        } else if (this.dy !== 0) {
            this.lastAxis = 'Y';
        }

        // Detect if snake has eaten food
        if (this.food && this.snake.head.checkCollision(this.food)) {
            this.food = null;
            // Increase the size of the snake
            this.snake.addElement(
                new Square(prevX, prevY)
            );
        }

        // Generate food if it doesn't already exists
        this.generateFoodIfNeeded();
    }

    snakeHasCollided() {
        // Check if coordinates of head are the same as other elem of snake's snake.body
        if (this.snake.hasCollided())
            return true;

        // Detect this.snake collisions against context limits
        if (this.snake.hasBrokenTheLimits(0, this.myCanvas.width - this.SIZE, 0, this.myCanvas.height - this.SIZE))
            return true;

        return false;
    }

    gameOver() {
        console.log('GAME OVER!');
        alert('GAME OVER!');
        dx = 0;
        dy = 0;
        this.snake.reset();
    }

    generateFoodIfNeeded() {
        if (this.food)
            return;
        do {
            this.food = new Square(this.getRandomX(), this.getRandomY());
        }
        while (this.snake.checkFullCollision(this.food));

    }

    getRandomX() {
        // 0, 20, 40, ..., 380
        // 0, 1, 2, 3, ..., 20  x2
        let numSquaresX = this.myCanvas.width / this.SIZE;
        return this.SIZE * parseInt(Math.random() * numSquaresX);
    }

    getRandomY() {
        // 0, 20, 40, ..., 440
        // 0, 1, 2, 3, ..., 22 x2
        let numSquaresY = this.myCanvas.height / this.SIZE;
        return this.SIZE * parseInt(Math.random() * numSquaresY);
    }



    moveSnake(event) {
        // Conditions restrict movement on the same axis
        switch (event.key) {
            case 'ArrowUp':
                if (this.lastAxis !== 'Y') {
                    this.dx = 0;
                    this.dy = -SIZE;
                    console.log('Move up');
                }
                break;
            case 'ArrowDown':
                if (this.lastAxis !== 'Y') {
                    this.dx = 0;
                    this.dy = SIZE;
                    console.log('Move down');
                }
                break;
            case 'ArrowLeft':
                if (this.lastAxis !== 'X') {
                    this.dx = -SIZE;
                    this.dy = 0;
                    console.log('Move left');
                }
                break;
            case 'ArrowRight':
                if (this.lastAxis !== 'X') {
                    this.dx = SIZE;
                    this.dy = 0;
                    console.log('Move right');
                }
                break;
        }
    }

}