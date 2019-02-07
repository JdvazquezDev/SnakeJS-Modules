import Game from './Game.js'
import CanvasHandler from './CanvasHandler.js';

console.log('Starting Game...');

setInterval(main, 100); // 1000ms = 1s

const game = new Game();
const myCanvas = new CanvasHandler('myCanvas');

function main() { // Logic
    game.update(); // update variables
    myCanvas.draw(); // draw game objects
}