import Game from './Game.js'

console.log('Starting Game...');

setInterval(main, 100); // 1000ms = 1s

const game = new Game('myCanvas');

function main() { // Logic
    game.update(); // update variables
    game.draw(); // draw game objects
}