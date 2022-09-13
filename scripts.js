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

    const minimax = (board, depth, isComputer) => {
		let checkEndOFGame = checkWin(board)
		if (checEndOFGame == "player"){
			let score = 1
			return score
		} else if (checkEndOFGame == "computer"){
			let score = -1
			return score
		} else if (checEndOFGame == "draw" || checkEndOFGame == "continue"){
			let score = 0
			return score
		}
		
        if(maximazing){
			let bestScore = -10000
			for (let i = 0; i < 9; i++){
				if(board[i] == ""){
					board[i] = "O"
					let score = minimax(board, depth + 1, false)
					board[i] = ""
					if (bestScore < score){
						bestScore = score
					}
				}
			}
			return bestScore
		} else {
			let bestScore = 10000
			for (let i = 0; i < 9; i++){
				if(board[i] == ""){
					board[i] = "X"
					let score = minimax(board, depth + 1, true)
					board[i] = ""
					if (score < bestScore){
						bestScore = score
					}
				}
			}
			return bestScore
		}
			
    }

    const computerTurn = () => {
        const stateOfGame = gameBoard
        let bestScore = -10000
        let bestMove
        let score
        for (let i = 0; i < 9; i++){
			if (stateOfGame[i] == ""){
                    stateOfGame[i] = "O"
					let score = minimax(stateOfGame, 0, true)
					stateOfGame[i] = ""
					if (bestScore < score){
						bestScore = score
						bestMove = i
					}
                }
        }
    }

    const turnsLeft = (board) => {
        let avaiableSpots = 0
        for (let i = 0; i < 9; i++){

			avaiableSpots++
        }
        return avaiableSpots
    }

    const checkWin = (board) => {

        for (let i = 0; i < winCombinations.length; i++){
            let tic = winCombinations[i][0]
            let tac = winCombinations[i][1]
            let toe = winCombinations[i][2]
            if (board[tic] == board[tac] && board[tac] == board[toe] &&
                board[tic] == "X" ){
                console.log("win!")
                return "player"
            } else if (board[tic] == board[tac] && board[tac] == board[toe] &&
                board[tic] == "O"){
                return "computer"
            } else if (checkDraw() == "draw"){
                return "draw"
            } else {
				return "continue"
			}
        }

        
    }

    const checkDraw = () => {
        let fillCounter = 0;
        
        for (let i = 0; i < 9; i++){
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