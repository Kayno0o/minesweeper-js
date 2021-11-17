export default class Board {

    constructor(width, height, mines) {
        this.width = width;
        this.height = height;
        this.board = [];
        this.mines = mines;
        this.isFinished = 0;
    }

    init() {
        this.board = [];

        for (let i = 0; i < this.height; i++) {
            this.board[i] = [];

            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = 0;
            }
        }

        this.isFinished = 0;
    }

    generateMines() {
        let mines = 0;

        while (mines < this.mines) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            if (this.board[y][x] === 0) {
                this.board[y][x] = -1;
                mines++;
            }
        }
    }

    isWin() {
        let count = 0;

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === 0) {
                    count++;
                }
            }
        }

        if (count === this.mines) {
            this.isFinished = 1;
        }
    }

    checkPosition(row, col, msg) {
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
            if(msg) console.log("Invalid position");
            return false;
        } else {
            return true;
        }
    }

    flag(row, col) {
        if(!this.checkPosition(row, col, true)) return;

        row = parseInt(row);
        col = parseInt(col);

        console.log("Flagging: " + row + " " + col);

        if (this.board[row][col] === -1) {
            this.board[row][col] = -4;
        } else if (this.board[row][col] === -4) {
            this.board[row][col] = -1;
        }

        if (this.board[row][col] === 0) {
            this.board[row][col] = -3;
        } else if (this.board[row][col] === -3) {
            this.board[row][col] = 0;
        }
    }

    open(row, col) {
        if(!this.checkPosition(row, col, true)) return;

        row = parseInt(row);
        col = parseInt(col);

        console.log("Opening: " + row + " " + col);

        if (this.board[row][col] === -1) {
            this.board[row][col] = -2;
            this.isFinished = -1;
        } else {
            this.openAdjacent(row, col);
        }
    }

    openAdjacent(row, col) {
        if(!this.checkPosition(row, col, false)) return;

        if (this.board[row][col] !== 0) {
            return;
        }

        this.board[row][col] = this.adjacentMines(row, col);

        if (this.board[row][col] !== 1) {
            return;
        }

        let rows = [row - 1, row, row + 1];
        let cols = [col - 1, col, col + 1];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (rows[i] === row && cols[j] === col) {
                    continue;
                }

                this.openAdjacent(rows[i], cols[j]);
            }
        }
    }

    adjacentMines(row, col) {
        let mines = 1;

        let rows = [row - 1, row, row + 1];
        let cols = [col - 1, col, col + 1];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (rows[i] === row && cols[j] === col) {
                    continue;
                }

                mines += this.hasMine(rows[i], cols[j]);
            }
        }

        return mines;
    }

    hasMine(row, col) {
        if(!this.checkPosition(row, col, false)) return 0;

        if (this.board[row][col] === -1) {
            return 1;
        }

        return 0;
    }

    print(displayMines) {
        let col = "    │ ";
        let col2 = " ───┼─";
        for(let i = 0; i < this.height; i++) {
            col += i + " ";
            col2 += "──";
        }
        console.log(col);
        console.log(col2);

        for (let i = 0; i < this.height; i++) {
            let line = " " + i + "  │ ";

            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === 0) {
                    line += ".";
                } else if (this.board[i][j] === -1 && !displayMines) {
                    line += ".";
                } else if (this.board[i][j] === -1 && displayMines) {
                    line += "*";
                } else if (this.board[i][j] === -2) {
                    line += "X";
                } else if (this.board[i][j] === -3 || this.board[i][j] === -4) {
                    line += "F";
                } else {
                    line += this.board[i][j] - 1;
                }

                line += " ";
            }

            console.log(line);
        }

        console.log("");
    }
}