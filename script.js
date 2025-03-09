const GameBoard = function() {
  const board = [
    [],
    [],
    []
  ]

  // Add rows and columns and cells , check if the play is wrong and assign the square
  const rows = 3
  const columns = 3
  for(let i = 0; i < rows; i++) {
    board[i] = []
    for(let j = 0; j < columns; j++) {
      board[i].push(Cell())
    }
  }
  //


  const getBoard = () => board;

  const putMark = (player, row, column) => {
    if(board[row][column].getValue() !== 0) {  // Check if the move is valid and return true or false for the turn switch
      console.log("Bad Move!")
      return false
    } else {
      board[row][column].addMark(player) // Assign the move
      return true
    }
  }

  const printBoard = () => {
    const getBoardValue = board.map((row) => row.map((column) => column.getValue()))
    console.log(getBoardValue)
  }

  return {getBoard, putMark, printBoard}
}()
  //


const gameController = function(playerOne = "playerOne", playerTwo = "playerTwo") {
  const board = GameBoard

  const players = [
    {
      name: playerOne,
      token: 1,
      mark: "X"
    },
    {
      name: playerTwo,
      token: 2,
      mark: "O"
    }
  ]

  let activePlayer = players[0]

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  const getActivePlayer = () => activePlayer

  const printNewRound = () => {
    board.printBoard()
    console.log(`${getActivePlayer().name}'s turn.`)
  }

  const theWinner = function() {  // If there is a winner the game will not play
    let winner = false
    const thereIsWinnner = () => winner = getActivePlayer().name
    const getWinner = () => winner
    return {thereIsWinnner, getWinner}
  }()

  const playRound = (row, column) => {


    if(theWinner.getWinner() !== false) {
      return console.log("the Game Is Over Start New Game?")
    }

    if(board.putMark(getActivePlayer().mark, row, column) === false && theWinner.getWinner() === false) {
      return console.log(`player ${getActivePlayer().name} turn Again`)
    }
    

    // Check the win condition

    let ourBoard = board.getBoard()


    for(let i = 0; i < ourBoard.length; i++) {
      if(ourBoard[i][0].getValue() === ourBoard[i][1].getValue() && ourBoard[i][1].getValue() === ourBoard[i][2].getValue() && ourBoard[i][2].getValue() !== 0) {  // Check the winner in rows
        console.log(`${getActivePlayer().name} is the winner`)
        theWinner.thereIsWinnner()
        return
      }
      if(ourBoard[0][i].getValue() === ourBoard[1][i].getValue() && ourBoard[1][i].getValue() === ourBoard[2][i].getValue() && ourBoard[2][i].getValue() !== 0) {  // Check the winner in columns
        console.log(`${getActivePlayer().name} is the winner`)
        theWinner.thereIsWinnner()
        return
      }
    }

    if(ourBoard[0][0].getValue() === ourBoard[1][1].getValue() && ourBoard[1][1].getValue() === ourBoard[2][2].getValue() && ourBoard[1][1].getValue() !== 0 || ourBoard[0][2].getValue() === ourBoard[1][1].getValue() && ourBoard[1][1].getValue() === ourBoard[2][0].getValue() && ourBoard[1][1].getValue() !== 0) {  // Check the winner in scissors
      console.log(`${getActivePlayer().name} is the winner`)
      theWinner.thereIsWinnner()
      return
    }


    switchActivePlayer()
    printNewRound()
  }

  return {playRound, getActivePlayer}
}()




// const game = function() {

// }
  //

  // the cell in every square
function Cell() {
  let value = 0

  const addMark = (player) => {
    value = player
  }

  const getValue = () => value

  return {addMark, getValue}
}
  //

// gameController.playRound(0,0)
// gameController.playRound(0,0)

// gameController.playRound(0,0)

// gameController.playRound(0,1)

// gameController.playRound(1,1) 

// gameController.playRound(1,2)

// gameController.playRound(2,2)