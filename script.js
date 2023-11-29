'use strict';

const tiles = document.querySelectorAll('.tile');
const playerDisplay = document.querySelector('.display-player');
const btnReset = document.querySelector('#reset');
const announcer = document.querySelector('.announcer')


let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = 'TIE';

const play = function (x, y) {
    if (board[x][y] === '' && isGameActive) {
        board[x][y] = currentPlayer;


        checkWinner();


        displayBoard();
        changePlayer();


    }


    // currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    console.log(board);


}

const changePlayer = function () {
    playerDisplay.classList.remove(`player--${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player--${currentPlayer}`);
}


const displayBoard = function () {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cellId = `cell-${i}-${j}`;
            const cell = document.getElementById(cellId);
            cell.textContent = board[i][j];

            // Clear any previous player class
            cell.classList.remove('player--X', 'player--0');


            // Add class based on the current player's move
            if (board[i][j] === 'X') {
                cell.classList.add('player--X');
            } else if (board[i][j] === '0') {
                cell.classList.add('player--0');
            }
        }
    }

}

const announce = (type) => {
    switch (type) {
        case PLAYERO_WON:
            announcer.innerHTML = `Player <span class="player--0">0</span> wins!`
            break;
        case PLAYERX_WON:
            announcer.innerHTML = `Player <span class="player--X">X</span> wins!`
            break;
        case TIE:
            announcer.innerHTML = 'Tie';
    }
    announcer.classList.remove('hide');
}

const checkWinner = function () {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2] ||
            board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]
        ) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2] ||
            board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]
        ) {

            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) announce(TIE);

    }

}

const reset = function () {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    tiles.forEach(tile => {
        tile.innerText = '';

    });
    
    isGameActive = true;
    if (currentPlayer === '0') {
        changePlayer();
    }




    checkWinner();


    displayBoard();



    console.log('reset');
}

btnReset.addEventListener('click', reset);