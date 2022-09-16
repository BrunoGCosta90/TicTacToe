//const gameBoard = ["X","X","X","X","X","X","X","X","X"];
const gameBoard = ["", "", "", "", "", "", "", "", ""]
//let winner;

const gameController = (() => {

    const resetGame = document.getElementById('reset')
    
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

    const scoreDisplyay = document.getElementById('score')

    const endOfGame = () => {
        const winner = checkWin(gameBoard)
        console.log(winner)

        if (winner == "player") {
            scoreDisplyay.textContent = "player wins!"
        } else if (winner == "computer") {
            scoreDisplyay.textContent = "computer wins!"
        } else if (winner == "draw") {
            scoreDisplyay.textContent = "draw!"
        }
    }



    const minimax = (board, depth, isComputer) => {
        let checkEndOFGame = checkWin(board)
        if (checkEndOFGame == "player") {
            return (depth -10)
        } else if (checkEndOFGame == "computer") {
            return (depth +10)
        } else if (checkEndOFGame == "draw") {
            return 0
        }

        if (isComputer) {
            let bestScore = -10000
            for (let i = 0; i < 9; i++) {
                if (board[i] == "") {
                    board[i] = "O"
                    let score = minimax(board, depth -1, false)
                    board[i] = ""
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore
        } else {
            let bestScore = 10000
            for (let i = 0; i < 9; i++) {
                if (board[i] == "") {
                    board[i] = "X"
                    let score = minimax(board, depth -1, true)
                    board[i] = ""
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore
        }

    }

    const computerTurn = () => {
        const stateOfGame = gameBoard
        let bestScore = -10000
        let bestMove
        for (let i = 0; i < 9; i++) {
            if (stateOfGame[i] == "") {
                stateOfGame[i] = "O"
                let score = minimax(stateOfGame, false)
                stateOfGame[i] = ""
                if (bestScore < score) {
                    bestScore = score
                    bestMove = i
                }
            }
        }
        gameBoard[bestMove] = "O"
        document.getElementById(bestMove).textContent = "O"
        endOfGame()
    }

    const turnsLeft = (board) => {
        let avaiableSpots = 9
        for (let i = 0; i < 9; i++) {
            if (board[i] == ""){
                avaiableSpots--
            }
        }
        return avaiableSpots
    }

    const checkWin = (board) => {
        for (let i = 0; i < winCombinations.length; i++) {
            let tic = winCombinations[i][0]
            let tac = winCombinations[i][1]
            let toe = winCombinations[i][2]
            if (board[tic] == board[tac] && board[tac] == board[toe] &&
                board[tic] == "X") {
                return "player"
            } else if (board[tic] == board[tac] && board[tac] == board[toe] &&
                board[tic] == "O") {
                return "computer"
            } else if (checkDraw(board) == "draw") {
                return "draw"
           }
        }


    }

    const checkDraw = (board) => {
        let fillCounter = 0;

        for (let i = 0; i < 9; i++) {
            if (board[i] != "") {
                fillCounter++
            }
        }
        if (fillCounter == 9) {
            return "draw"
        }
    }

    const gameButton = (event) => {
        const tileSelector = event.target
        if (tileSelector.textContent == "" && gameBoard[tileSelector.id] == "") {
            tileSelector.textContent = "X";
            gameBoard[tileSelector.id] = "X";
            checkEndOFGame = checkWin(gameBoard)
            if (checkEndOFGame == "player") {
                endOfGame()
            } else if (checkEndOFGame == "draw") {
                endOfGame()
            } else {
                computerTurn()
            }
        }
    }

    return {
        gameButton,
        checkWin,
        scoreDisplyay,
        resetGame
    }
})()

const gameBoardRender = (() => {

    const render = () => {
        const board = document.getElementById('game-grid');
        for (let i = 0; i < 9; i++) {
            board.appendChild(document.createElement('div'));
            board.lastChild.id = i;
            board.lastChild.textContent = gameBoard[i];
            board.lastChild.addEventListener('click', event => { gameController.gameButton(event) })
        }
    }

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).textContent = "";
            gameBoard[i] = "";
        }
        gameController.scoreDisplyay.textContent = ""
    }

    return {
        render,
        reset
    }
})();

gameBoardRender.render()

//buttons

gameController.resetGame.addEventListener('click', gameBoardRender.reset)
