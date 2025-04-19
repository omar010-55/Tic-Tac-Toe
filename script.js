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

  const play = document.querySelector(".play") // LOL

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
        activePlayer = players[0]
        display()

        realPlayerOne = ''
        realPlayerTwo = ''
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
          console.log(`${win} is the winner`)
          return turn.textContent = `${win} is the winner`
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
            console.log(`${win} is the winner`)
            return turn.textContent = `${win} is the winner`
          }
        }
      }
      let sc = 0
      for(let i = 0; i < 2; i++) {  // Check if win diagonally
        if(board.getBoard()[i][i].getValue() !== 0 && board.getBoard()[i][i].getValue() === board.getBoard()[i+1][i+1].getValue()) {
          sc += 1
        }
      }
      if(sc === 2) {
        let win = theWinner.thereIsWinnner()
        console.log(`${win} is the winner`)
        return turn.textContent = `${win} is the winner`
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
        console.log(`${win} is the winner`)
        return turn.textContent = `${win} is the winner`
      }
    }
    //

    let roundBeingPlayed = 0  // Count round
    const countRound = () => roundBeingPlayed = roundBeingPlayed + 1
    const getRound = () => roundBeingPlayed
    const resetCount = () => roundBeingPlayed = 0

    // the Display
    
    const turn = document.querySelector("#turn")
    const result = document.querySelector("#result")

    const display = function() {

      let Counter = 0
      let Column = 0
      let Row = 0

      play.innerHTML = ""
      board.getBoard().map((row) => row.map((column) => {
        let value = column.getValue()
        if (value === 0) {
          play.innerHTML += `<div class="cell" data-row="${Row}" data-column="${Column}"></div>`
          Column = Column + 1
          if(Column === 3) {Column = 0; Row = Row + 1}
        } else {
          play.innerHTML += `<div class="cell" data-row="${Row}" data-column="${Column}">${value}</div>`
          Column = Column + 1
          if(Column === 3) {Column = 0; Row = Row + 1}
        }
      }))

      turn.textContent = `${getActivePlayer().name} Turn`
      
    }


  const playRound = (row, column) => {


    if(theWinner.getWinner() !== false) {
      return console.log("the Game Is Over Start New Game?")
    }

    if(board.putMark(getActivePlayer().mark, row, column) === false && theWinner.getWinner() === false) {
      return console.log(`player ${getActivePlayer().name} turn Again`)
    }
    

    // Check the win condition

    let ourBoard = board.getBoard()
    display()
    winFunc()

    if(theWinner.getWinner() !== false) return

    countRound()

    if(getRound() === 9) {
      console.log("Tie Tie Tie")
      display()
      return turn.textContent = `its a tie`
    }

    
    switchActivePlayer()
    printNewRound()
    display()
  }

  return {playRound, getActivePlayer, resetGame, display}
}// problem


const playerOneInput = document.getElementById("playerOne")
const playerTwoInput = document.getElementById("playerTwo")

const r = document.querySelector(':root')

const layer = document.getElementById("layer")

const box = document.querySelector('.box')

const newgame = document.getElementById("newgame")

const restart = document.getElementById("restart")

const gameStarter = document.getElementById("gameStarter")

newgame.addEventListener('click', function() { // Removing the playground and showing the start menu
  r.style.setProperty('--showing', 'none')
  box.style.setProperty('display', 'initial')
})

let realPlayerOne 
let realPlayerTwo //465465
  let creatGameControler
  
function theMain(event) { // Showing the playground and Hide the Menu
  event.preventDefault()
  
  r.style.setProperty('--showing', 'initial')
  box.style.setProperty('display', 'none')
  if(playerOneInput.value !== '' && playerTwoInput.value !== '') {
    console.log(playerOneInput.value)
    realPlayerOne = playerOneInput.value
    realPlayerTwo = playerTwoInput.value
    creatGameControler = gameController(realPlayerOne, realPlayerTwo)
  } else {creatGameControler = gameController()}
  creatGameControler.resetGame()
  box.reset()
}

gameStarter.addEventListener('click', theMain)


restart.addEventListener("click", () => {
  creatGameControler.resetGame()
})


function dgg(event) {
  if(realPlayerOne !== '' && realPlayerTwo !== '') {
    creatGameControler.playRound(1,0)
  }
}

  // the cell in every square
function Cell() {
  let value = 0

  const addMark = (player) => {
    value = player
  }

  const getValue = () => value

  return {addMark, getValue}
}



play.addEventListener("click", (e) => {
  console.log(e.target.getAttribute("data-column"))
  let theRow = e.target.getAttribute("data-row");
  let theColumn = e.target.getAttribute("data-column");

  if(realPlayerOne !== '' && realPlayerTwo !== '') {
    creatGameControler.playRound(+theRow, +theColumn)
  } else {
    creatGameControler.playRound(+theRow, +theColumn)
  }
})
