const GameBoard = function() {
  const board = [
    [],
    [],
    []
  ]

  // Add rows and columns and cells , check if the play is wrong and assign the square
  const rows = 3
  const columns = 3
  const resetBoard = function() {
    for(let i = 0; i < rows; i++) {
      board[i] = []
      for(let j = 0; j < columns; j++) {
        board[i].push(Cell())
      }
    }
  }
  resetBoard()
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
 
 
  return {getBoard, putMark, printBoard, resetBoard}
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
    const reset = () => winner = false
    return {thereIsWinnner, getWinner, reset}
  }()

      // Reset the game
      const resetGame = function() {
        board.resetBoard()
        theWinner.reset()
        resetCount()
      }


    // Test

    const winFunc = function() {
      board.getBoard().map((row) => { // Check if the win in rows
        let all = 0
        for(let i = 1; i < row.length; i++) {
          if(row[0].getValue() !== 0 && row[0].getValue() === row[i].getValue()) {
            all += 1 
          }
        }
        if(all === 2) {
          let win = theWinner.thereIsWinnner()
          console.log(`${win} is the winner ffff`)
          return
        }
      })
      for(let j = 0; j < board.getBoard().length; j++) { // 0 - 2 Check if the win in vertical
        let vertical = 0
        for(let k = 1; k < 3; k++) {
          if(board.getBoard()[0][j].getValue() !== 0 && board.getBoard()[0][j].getValue() === board.getBoard()[k][j].getValue()) {
            vertical += 1
          }
          if(vertical === 2) {
            let win = theWinner.thereIsWinnner()
            console.log(`${win} is the winner ffff cv`)
            return
          }
        }
      }
      let sc = 0
      for(let i = 0; i < 2; i++) {  // Check if win diagonally
        if(board.getBoard()[i][i].getValue() !== 0 && board.getBoard()[i][i].getValue() === board.getBoard()[i+1][i+1].getValue()) {
          sc += 1
        }
        // if(board.getBoard()[i][0].getValue() !== 0 && board.getBoard()[j][j].getValue() === board.getBoard()[j+1][j+1].getValue())
      }
      if(sc === 2) {
        let win = theWinner.thereIsWinnner()
        console.log(`${win} is the winner ffff sc`)
        return
      }
      let count = 0
      let erhamni = 2
      for(let i = 0; i < 2; i++) {
          if(board.getBoard()[erhamni][i].getValue() !== 0 && board.getBoard()[erhamni][i].getValue() === board.getBoard()[erhamni-1][i+1].getValue()) {
            count += 1
            erhamni -= 1
          } else {erhamni -= 1}
      }
      if(count === 2) {
        let win = theWinner.thereIsWinnner()
        console.log(`${win} is the winner ffff sc`)
        return
      }
    }
    //

    let roundBeingPlayed = 0  // Count round
    const countRound = () => roundBeingPlayed = roundBeingPlayed + 1
    const getRound = () => roundBeingPlayed
    const resetCount = () => roundBeingPlayed = 0

  const playRound = (row, column) => {


    if(theWinner.getWinner() !== false) {
      return console.log("the Game Is Over Start New Game?")
    }

    if(board.putMark(getActivePlayer().mark, row, column) === false && theWinner.getWinner() === false) {
      return console.log(`player ${getActivePlayer().name} turn Again`)
    }
    

    // Check the win condition

    let ourBoard = board.getBoard()

    winFunc()

    // for(let i = 0; i < ourBoard.length; i++) {
    //   if(ourBoard[i][0].getValue() === ourBoard[i][1].getValue() && ourBoard[i][1].getValue() === ourBoard[i][2].getValue() && ourBoard[i][2].getValue() !== 0) {  // Check the winner in rows
    //     console.log(`${getActivePlayer().name} is the winner`)
    //     theWinner.thereIsWinnner()
    //     return
    //   }
    //   if(ourBoard[0][i].getValue() === ourBoard[1][i].getValue() && ourBoard[1][i].getValue() === ourBoard[2][i].getValue() && ourBoard[2][i].getValue() !== 0) {  // Check the winner in columns
    //     console.log(`${getActivePlayer().name} is the winner`)
    //     theWinner.thereIsWinnner()
    //     return
    //   }
    // }

    // if(ourBoard[0][0].getValue() === ourBoard[1][1].getValue() && ourBoard[1][1].getValue() === ourBoard[2][2].getValue() && ourBoard[1][1].getValue() !== 0 || ourBoard[0][2].getValue() === ourBoard[1][1].getValue() && ourBoard[1][1].getValue() === ourBoard[2][0].getValue() && ourBoard[1][1].getValue() !== 0) {  // Check the winner in scissors
    //   console.log(`${getActivePlayer().name} is the winner`)
    //   theWinner.thereIsWinnner()
    //   return
    // }

    if(theWinner.getWinner() !== false) return

    countRound()

    if(getRound() === 9) {
      console.log("Tie Tie Tie")
      return
    }

    switchActivePlayer()
    printNewRound()
  }

  return {playRound, getActivePlayer, resetGame}
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

// gameController.playRound(0,0)
// gameController.playRound(1,0)
// gameController.playRound(0,1)
// gameController.playRound(1,1)
// gameController.playRound(0,2)

// gameController.playRound(0,2)
// gameController.playRound(1,0)
// gameController.playRound(1,2)
// gameController.playRound(2,0)
// gameController.playRound(2,2)

// gameController.playRound(0,0)
// gameController.playRound(0,1)
// gameController.playRound(0,2)
// gameController.playRound(1,0)
// gameController.playRound(1,2)
// gameController.playRound(1,1)
// gameController.playRound(2,1)
// gameController.playRound(2,2)
// gameController.playRound(2,0)