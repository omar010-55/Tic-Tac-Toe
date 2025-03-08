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
    let isFalse
    const falseCheck = () => isFalse
    if(board[row][column].getValue() !== 0) {  // Check if the move is valid
      isFalse = true
      return
    }
    board[row][column].addMark(player)  // Assign the move
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

  const playRound = (row, column) => {

    board.putMark(getActivePlayer().mark, row, column)

    if(putMark.isFalse === true) {
      console.log("Wrong play try again")
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

// gameController.playRound(0,2)