import Snake from "./Snake.js";

export default class{
    constructor(idCanvasElement){
        this.myCanvas = document.getElementById(idCanvasElement);
        this.context = myCanvas.getContext('2d');
        
        this.snake = new Snake();
    }
    
    draw() {
        // Define black background
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height); // Clear this.context

        // Head
        this.drawObject(this.snake.head, 'lime');

        // Body
        this.snake.body.forEach(
            elem => this.drawObject(elem, 'lime')
        );

        // Food
        this.drawObject(this.snake.food, 'white');
    }

    drawObject(obj, color) {
        this.context.fillStyle = color;
        this.context.fillRect(obj.x, obj.y, this.snake.SIZE, this.snake.SIZE);
    }

}