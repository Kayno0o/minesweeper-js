export default class Game {
    constructor(board, readline) {
        this.board = board;
        this.readline = readline;
    }

    start() {
        console.clear();

        this.board.init();
        this.board.generateMines();

        this.promptPosition();
    }

    step() {
        if (this.board.isFinished == 1) {
            console.log("You win!");
            this.board.print(true);
            this.replay();
            return;
        } else if (this.board.isFinished == -1) {
            console.log("You lose!");
            this.board.print(true);
            this.replay();
            return;
        }

        this.promptPosition();
    }

    replay() {
        this.readline.question("Do you want to play again? (y/n) ", (answer) => {
            if (answer == "n") {
                console.log("Bye!");
                process.exit();
            } else {
                this.start();
            }
        });
    }

    promptPosition() {
        console.clear();
        this.board.print();

        console.log("Enter a position (row, col)");
        console.log("Start line with F to put a flag")

        this.readline.question("", (line) => {
            console.clear();

            line = line.toUpperCase();

            if (line.startsWith("F")) {
                let [col, row] = line.substring(1).split(" ");
                if (isNaN(col) || isNaN(row)) {
                    console.log("Invalid position");
                    this.promptPosition();
                    return;
                }
                this.board.flag(row, col);
            } else {
                let [col, row] = line.split(" ");
                if (isNaN(col) || isNaN(row)) {
                    console.log("Invalid position");
                    this.promptPosition();
                    return;
                }
                this.board.open(row, col);
            }

            this.step();
        });
    }
}