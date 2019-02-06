import Square from './Square.js'

export default class {
    constructor() {
        this.head = new Square(0, 0);
        this.body = [];
    }
    
    addElement(element){
        this.body.push(element);
    }

    getLastElement() {
        if (this.body.length >= 1) {
            return this.body[this.body.length - 1];

        } else {
            return this.head;
        }
    }

    move(dx, dy) {
        // The snake.body follows the snake
        // 3 elem -> body.length = 3
        // i=3; i=2, i=1;
        // 3<-2  2<-1 1<-0 0<-head
        for (let i = this.body.length - 1; i >= 1; --i) {
            this.body[i].x = this.body[i - 1].x; // elem.x 1 <- elem.x 0
            this.body[i].y = this.body[i - 1].y; // elem.y 1 <- elem.y 0
        }
        if (this.body.length >= 1) {
            this.body[0].x = this.head.x;
            this.body[0].y = this.head.y;
        }
        // Update coordinates of the snake's head
        this.head.move(dx, dy);
    }

    hasCollided() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].checkCollision(this.head))
                return true;
        }
    }

    hasBrokenTheLimits(x1, x2, y1, y2) {
        const topCollision = (this.head.y < y1); // x: ?, y: 0
        const bottomCollision = (this.head.y > y2); //x: ?, y: myCanvas.height
        const leftCollision = (this.head.x < x1); // x: 0, y: ?
        const rightCollision = (this.head.x > x2); //x: myCanvas.width, y: ?

        if (topCollision || bottomCollision || leftCollision || rightCollision) {
            return true;
        }
    }

    checkFullCollision(position) {
        // Check if coordinates of food are the same as other elem of snake's body
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].checkCollision(position)) {
                return true;
            }
        }
        // Check if coordinates of food are the same as snake's head
        if (this.head.checkCollision(position)) {
            return true;
        }
    }

    reset() {
        this.head.y = 0;
        this.head.x = 0;
        this.body.length = 0; // By assigning length = 0 js understands that you want to empty the array
    }
}