//const gameBoard = ["X","X","X","X","X","X","X","X","X"];
const gameBoard = ["","","","","","","","",""]
let winner;

const gameController = (() => {
    const winCombinations = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const minimax = (score, depth) => {
        
    }

    const computerTurn = () => {
        const stateOfGame = gameBoard
        let worstScore = 0
        let bestScore = 0
        let computerMove
        for (let i = 0; i < 3;i++){
            for(let y = 0; y < 3;y++){
                if (stateOfGame[i][y] == ""){
                    stateOfGame[i][y] = "O"
                }
            }
        }
    }

    const turnsLeft = (board) => {
        let avaiableSpots = 0
        for (let i = 0; i < 3; i++){
            for (let y = 0; y < 3;y++){
                if (board[i][y] == ""){
                    avaiableSpots++
                }
            }
        }
        return avaiableSpots
    }

    const checkWin = (board) => {

        for (let i = 0; i < winCombinations.length; i++){
            let tic = winCombinations[i][0]
            let tac = winCombinations[i][1]
            let toe = winCombinations[i][2]
            if (board[tic] == board[tac] && board[tic] == board[toe] &&
                board[tic] == "X" ){
                console.log("win!")
                return "player"
            } else if (board[tic] == board[tac] && board[tic] == board[toe] &&
                board[tic] == "O"){
                return "computer"
            } else if (checkDraw() == "draw"){
                return "draw"
            }
        }

        
    }

    const checkDraw = () => {
        let fillCounter = 0;
        
        for (let i = 0; i < gameBoard.length; i++){
            if(gameBoard[i] != ""){
                fillCounter++;
            }
            if (fillCounter == 9){
                console.log("empate")
                return "draw"
            }   
        }
    }

    const gameButton = (event) => {
        const tileSelector = event.target
        //console.log(tileSelector.id)
        if (tileSelector.textContent == null || tileSelector.textContent == undefined || 
            tileSelector.textContent == "" || gameBoard[tileSelector.id] == undefined ||
            gameBoard[tileSelector.id] == null || gameBoard[tileSelector.id] == ""){
            tileSelector.textContent = "X";
            gameBoard[tileSelector.id] = "X";
            if(checkWin(gameBoard) == "player"){
                console.log("player wins!")
            }
        } 
    }

    return {
        gameButton,
        checkWin,
    }
})()

const gameBoardRender = (() => {

    const render = () => {
        const board = document.getElementById('game-grid');
        for (let i = 0; i < 9; i++){
            board.appendChild(document.createElement('div'));
            board.lastChild.id = i;
            board.lastChild.textContent = gameBoard[i];
            board.lastChild.addEventListener('click', event => {gameController.gameButton(event)})
        }
    }

    const reset = () => {
        for (let i = 0; i < gameBoard.length; i++){
            document.getElementById(i).textContent = "";
            gameBoard[i] = "";
        }
    }

    return {
        render,
        reset,
        gameBoard,
    }
})();

gameBoardRender.render()

//buttons

const resetGame = document.getElementById('reset')
resetGame.addEventListener('click', gameBoardRender.reset)