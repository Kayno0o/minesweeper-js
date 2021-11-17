// get console input nodejs

import readline from 'readline';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

import Board from './src/board.js';
import Game from './src/game.js';

const board = new Board(10, 10, 20);

const game = new Game(board, rl);

game.start();