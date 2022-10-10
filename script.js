//DOM elements

const board = document.getElementById("boardContainer");
const button = document.getElementById("restartButton");


//player objects

const createPlayer = (name, marker, active) => ({ name, marker, active });
const player1 = createPlayer('player1', 'x', true);
const player2 = createPlayer('player2', 'o', false);

//game board

const gameBoard = {
    create: function() {
        //this will create a new board with 9 divs, labeling each with the index as its data label
        board.innerHTML = '';
        let index = 0;
        for (i = 0; i < 9; i++) {
            let div = document.createElement("div");
            div.classList.add("cell", "empty");
            div.setAttribute("data", index);
            board.appendChild(div);

            //should this part be in the display controller?
            div.addEventListener("click", () => {
                if (div.classList.contains("empty")) {
                    div.classList.remove("empty");
                    if (player1.active) {
                        div.classList.add("x");
                        player1.active = false;
                        player2.active = true;
                    } else {
                        div.classList.add("o");
                        player2.active = false;
                        player1.active = true;
                    }
                }
            })

            index++;
        }
    }
}


//display controller

const displayController = {
    checkForWin: function() {
        //some code
    },
    checkForDraw: function() {
        //some code
    }
}


gameBoard.create();