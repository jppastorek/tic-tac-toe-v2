//DOM elements

const boardContainer = document.getElementById("boardContainer");
const button = document.getElementById("restartButton");
const cells = document.getElementsByClassName("cell");
const winningMessage = document.getElementById("winning-message");
const messageText = document.getElementById("message-text");




//player objects

const player1 = { name: 'player1', marker: 'x', active: true };
const player2 = { name: 'player2', marker: 'o', active: false };


//game board

const gameBoard = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    checkForWin: function() {
        const board = this.board;
        //check rows
        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] != '') {
            this.declareWinner(board[0][0]);
            return true;
        } else if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] != '') {
            this.declareWinner(board[1][0]);
            return true;
        } else if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] != '') {
            this.declareWinner(board[2][0]);
            return true;
            //check columns
        } else if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] != '') {
            this.declareWinner(board[0][0]);
            return true;
        } else if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] != '') {
            this.declareWinner(board[0][1]);
            return true;
        } else if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] != '') {
            this.declareWinner(board[0][2]);
            return true;
            //check crosses
        } else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] != '') {
            this.declareWinner(board[0][0]);
            return true;
        } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] != '') {
            this.declareWinner(board[0][2]);
            return true;
        }
    },
    checkForDraw: function() {
        let count = 0;
        let win = this.checkForWin();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === '') {
                    count++;
                }
            }
        }
        if (count === 0 && !win) {
            this.declareDraw();
        }
    },
    declareWinner: function(mark) {
        displayController.showMessage(mark);
    },
    declareDraw: function(winner) {
        displayController.showMessage("no one");
    },
    updateBoard: function(cellNumber, mark) {
        if (cellNumber === "0") {
            this.board[0][0] = mark;
        } else if (cellNumber === "1") {
            this.board[0][1] = mark;
        } else if (cellNumber === "2") {
            this.board[0][2] = mark;
        } else if (cellNumber === "3") {
            this.board[1][0] = mark;
        } else if (cellNumber === "4") {
            this.board[1][1] = mark;
        } else if (cellNumber === "5") {
            this.board[1][2] = mark;
        } else if (cellNumber === "6") {
            this.board[2][0] = mark;
        } else if (cellNumber === "7") {
            this.board[2][1] = mark;
        } else if (cellNumber === "8") {
            this.board[2][2] = mark;
        }
        console.log(this.board);
    },
    newGame: function() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        player1.active = true;
        player2.active = false;
    }
}



//TODO update the current state of the board with new classes (x or o) or and/or use the data

//display controller

const displayController = {
    create: function() {
        //this will create a new board with 9 divs, labeling each with the index as its data label
        boardContainer.innerHTML = '';
        let index = 0;
        for (i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.classList.add("empty");
            div.setAttribute("data-cellNumber", index);
            boardContainer.appendChild(div);
            div.addEventListener("click", () => {
                if (div.classList.contains("empty")) {
                    div.classList.remove("empty");
                    if (player1.active) {
                        div.classList.add("x");
                        player1.active = false;
                        player2.active = true;
                        gameBoard.updateBoard(div.getAttribute("data-cellNumber"), "x");
                    } else {
                        div.classList.add("o");
                        player2.active = false;
                        player1.active = true;
                        gameBoard.updateBoard(div.getAttribute("data-cellNumber"), "o");
                    }
                    gameBoard.checkForWin();
                    gameBoard.checkForDraw();
                }
            })

            index++;
        }
    },
    showMessage: function(winner) {
        messageText.innerText = `${winner.toUpperCase()} wins!`
        winningMessage.classList.add("show");
    },
    restart: function() {
        winningMessage.classList.remove("show");
    }
}


button.addEventListener("click", () => {
    displayController.restart();
    displayController.create();
    gameBoard.newGame();
});

displayController.create();