function init() {

  //! Elements ------------------------------------------------------------------

  // * Dom elements
  const gridPlayer = document.querySelector('.grid-player')
  const gridComp = document.querySelector('.grid-comp')
  const randomizeShipsBtn = document.querySelector('#randomize-ships')
  const startGameBtn = document.querySelector('#start-game')
  const gameMessage = document.querySelector('.game-message')
  const instructionsBtn = document.querySelector('#instructions-button')
  const gameBoard = document.querySelector('.grid-wrapper')
  const instructionsBoard = document.querySelector('.instructions-board')
  const backToGameBtn = document.querySelector('#back-to-game-button')
  const gameMessages = document.querySelector('.game-messages')
  const winnerBoard = document.querySelector('.winner-board')
  const winnerMessage = document.querySelector('#winner-message')
  const resetGameBtn = document.querySelector('#reset-game')
  const shipSunkMessage = document.querySelector('.ship-sunk-message')
  const closeWinnerBoard = document.querySelector('#close-winner-board')
  const playAgainBtn = document.querySelector('#play-again')
  const playerScore = document.querySelector('#player-score')
  const compScore = document.querySelector('#comp-score')


  //* grid variables
  const width = 10
  const cellCount = width * width
  const cellsPlayer = []
  const cellsComp = []
  let reservedSpaces = []

  //* game variables
  let isRandomPressed = false
  let isStartPressed = true
  let isPlaying = false
  let playerCurrentScore = 0
  let compCurrentScore = 0
  const ships = [2, 3, 4, 5, 6]
  const ship = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Cruiser',
      size: 4,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Battleship',
      size: 5,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Carrier',
      size: 6,
      location: [],
      hitLocation: [],
      isSunk: false
    }
  ]

  const compShip = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Cruiser',
      size: 4,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Battleship',
      size: 5,
      location: [],
      hitLocation: [],
      isSunk: false
    },
    {
      name: 'Carrier',
      size: 6,
      location: [],
      hitLocation: [],
      isSunk: false
    }
  ]



  // ! CREATING THE GRID -------------------------------------------------------------------

  //Players Grid
  function createGridPlayer() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      gridPlayer.appendChild(cell)
      cellsPlayer.push(cell)
      cell.classList.add('whole-grid-player')
    }
  }

  //Computers Grid
  function createGridComp() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      gridComp.appendChild(cell)
      cellsComp.push(cell)
      cell.classList.add('whole-grid-comp')
    }
  }



  //! CREATING PLAYER'S SHIPS --------------------------------------------------------------

  function createShip(numOfSquaresToFill, shipIndex) {

    //* horizontal or vertical?
    function horizontalOrVertical() {
      const num = Math.floor(Math.random() * 2)
      if (num === 0) {
        createVerticalShip()
      } else {
        createHorizontalShip() // currently calling vertical ship again for testing, you need to change this back
      }
    }

    //* creating verticle ship
    function createVerticalShip() {
      //generate starting number
      const startingPoint = Math.floor(Math.random() * (cellsPlayer.length - ((numOfSquaresToFill * width) + 10)))
      // while random number is a reserved number, regenerate
      if (reservedSpaces.includes(startingPoint)) {
        return createShip(numOfSquaresToFill, shipIndex)
      }
      //this variable holds the starting point initially and then the next index is added in the loop below
      const currentShip = [startingPoint]
      // calculate rest of ship and put into current ship array
      for (let i = 1; i < numOfSquaresToFill; i++) {
        const shipBodyPart = startingPoint + (10 * i)
        if (reservedSpaces.includes(shipBodyPart)) {
          // if any part of the body is in reserved space, redo function (without having stored anything!)
          return createShip(numOfSquaresToFill, shipIndex)
        } else {
          currentShip.push(shipBodyPart)
        }
      }
      ship[shipIndex].location = currentShip //add current ship to the ship object
      for (let i = 0; i < ship[shipIndex].location.length; i++) {
        cellsPlayer[ship[shipIndex].location[i]].classList.add('ship')
        //add index to reserved spaces array
        reservedSpaces.push(ship[shipIndex].location[i])
      }
    }

    //* creating horizontal ship
    function createHorizontalShip() {
      // create array of suitable starting numbers to choose from
      const newArray = []
      for (let i = 0; i < cellsPlayer.length; i++) {
        if (i % width < (width - (numOfSquaresToFill - 1))) {
          newArray.push(i)
        }
      }
      // generate starting index and starting number from above array
      const startingPointIndex = Math.floor(Math.random() * newArray.length)
      const startingPoint = newArray[startingPointIndex]
      // while random number is a reserved number, regenerate
      if (reservedSpaces.includes(startingPoint)) {
        return createShip(numOfSquaresToFill, shipIndex)
      }
      // this variable holds the starting point initially and then the next index is added in the loop below
      const currentShip = [startingPoint]
      //calculate the rest of the ship and put into the current array
      for (let i = 1; i < numOfSquaresToFill; i++) {
        const shipBodyPart = startingPoint + (1 * i)
        if (reservedSpaces.includes(shipBodyPart)) {
          // if any part of the body is in reserved space, redo function (without having stored anything!)
          return createShip(numOfSquaresToFill, shipIndex)
        } else {
          currentShip.push(shipBodyPart)
        }
      }
      //add the current ship to the ship object
      ship[shipIndex].location = currentShip
      for (let i = 0; i < ship[shipIndex].size; i++) {
        cellsPlayer[ship[shipIndex].location[i]].classList.add('ship')
        reservedSpaces.push(ship[shipIndex].location[i])
      }
    }
    horizontalOrVertical()
  }

  //* creating multiple ships
  function createAllShips() {
    ships.forEach((currentValue, index) => {
      createShip(currentValue, index)
    })
  }




  //! CREATING COMP'S SHIPS ---------------------------------------------------------------

  function createCompShip(numOfSquaresToFill, shipIndex) {

    //* horizontal or vertical?
    function horizontalOrVertical() {
      const num = Math.floor(Math.random() * 2)
      if (num === 0) {
        createVerticalShip()
      } else {
        createHorizontalShip() // currently calling vertical ship again for testing, you need to change this back
      }
    }

    //* creating verticle ship
    function createVerticalShip() {
      //generate starting number
      const startingPoint = Math.floor(Math.random() * (cellsPlayer.length - ((numOfSquaresToFill * width) + 10)))
      // while random number is a reserved number, regenerate
      if (reservedSpaces.includes(startingPoint)) {
        return createCompShip(numOfSquaresToFill, shipIndex)
      }
      //this variable holds the starting point initially and then the next index is added in the loop below
      const currentShip = [startingPoint]
      // calculate rest of ship and put into current ship array
      for (let i = 1; i < numOfSquaresToFill; i++) {
        const shipBodyPart = startingPoint + (10 * i)
        if (reservedSpaces.includes(shipBodyPart)) {
          // if any part of the body is in reserved space, redo function (without having stored anything!)
          return createCompShip(numOfSquaresToFill, shipIndex)
        } else {
          currentShip.push(shipBodyPart)
        }
      }
      compShip[shipIndex].location = currentShip //add current ship to the ship object
      for (let i = 0; i < compShip[shipIndex].location.length; i++) {
        cellsComp[compShip[shipIndex].location[i]].classList.add('comp-ship')
        //add index to reserved spaces array
        reservedSpaces.push(compShip[shipIndex].location[i])
      }
    }

    //* creating horizontal ship
    function createHorizontalShip() {
      // create array of suitable starting numbers to choose from
      const newArray = []
      for (let i = 0; i < cellsPlayer.length; i++) {
        if (i % width < (width - (numOfSquaresToFill - 1))) {
          newArray.push(i)
        }
      }
      // generate starting index and starting number from above array
      const startingPointIndex = Math.floor(Math.random() * newArray.length)
      const startingPoint = newArray[startingPointIndex]
      // while random number is a reserved number, regenerate
      if (reservedSpaces.includes(startingPoint)) {
        return createCompShip(numOfSquaresToFill, shipIndex)
      }
      // this variable holds the starting point initially and then the next index is added in the loop below
      const currentShip = [startingPoint]
      //calculate the rest of the ship and put into the current array
      for (let i = 1; i < numOfSquaresToFill; i++) {
        const shipBodyPart = startingPoint + (1 * i)
        if (reservedSpaces.includes(shipBodyPart)) {
          // if any part of the body is in reserved space, redo function (without having stored anything!)
          return createCompShip(numOfSquaresToFill, shipIndex)
        } else {
          currentShip.push(shipBodyPart)
        }
      }
      //add the current ship to the ship object
      compShip[shipIndex].location = currentShip
      for (let i = 0; i < compShip[shipIndex].size; i++) {
        cellsComp[compShip[shipIndex].location[i]].classList.add('comp-ship')
        reservedSpaces.push(compShip[shipIndex].location[i])
      }
    }
    horizontalOrVertical()
  }

  //* CREATING MULTIPLE SHIPS -------------------------------
  function createAllCompShips() {
    ships.forEach((currentValue, index) => {
      createCompShip(currentValue, index)
    })
  }




  //! BUTTON CONTROLLERS -------------------------------------------------------------------

  //* Start Game Button
  function startGame() {
    if (isStartPressed) return
    isStartPressed = true
    isRandomPressed = true
    createGridComp()
    createAllCompShips()
    startGameActions()
  }

  //* Randomize ships button
  function randomizeAllShips() {
    if (isRandomPressed) return
    isStartPressed = false
    //set reserved spaces back to an empty array for a new board of ships
    reservedSpaces = []
    const wholeGridCells = document.querySelectorAll('.whole-grid-player')
    wholeGridCells.forEach(element => {
      element.classList.remove('ship')
    })
    for (let i = 0; i < ships.length; i++) {
      ship[i].location = []
    }
    createAllShips()
  }

  //* Instructions Button
  function handleInstructions() {
    gameBoard.style.display = 'none'
    gameMessages.style.display = 'none'
    instructionsBoard.style.display = 'flex'
  }

  //* Back to Game Button
  function handleBackToGame() {
    instructionsBoard.style.display = 'none'
    gameBoard.style.display = 'flex'
    gameMessages.style.display = 'flex'
  }

  //* Closing the Winner Board
  function handleWinnerClose() {
    closeWinnerBoard.style.display = 'none'
    gameBoard.style.display = 'flex'
    gameMessages.style.display = 'flex'
  }

  //* Reset game button on Game-Board and Play Again button on Winner-Board
  function handleResetGame() {
    cellsPlayer.forEach(cell => {
      cell.classList = 'whole-grid-player'
    })
    cellsComp.forEach(cell => {
      cell.classList = ''
      cell.textContent = ''
    })
    cellsComp.splice(0)
    reservedSpaces = []
    isRandomPressed = false
    isStartPressed = true
    isPlaying = false
    playerCurrentScore = 0
    compCurrentScore = 0
    ship.forEach(ship => {
      ship.location = []
      ship.hitLocation = []
      ship.isSunk = false
    })
    compShip.forEach(ship => {
      ship.location = []
      ship.hitLocation = []
      ship.isSunk = false
    })
    winnerBoard.style.display = 'none'
    gameBoard.style.display = 'flex'
    gameMessage.textContent = 'I declare WAR. Arrange your ships and lets do BATTLE!'
    shipSunkMessage.textContent = ''
    gameMessages.style.display = 'flex'
  }






  // ! GAMEPLAY ------------------------------------------------------------------------

  function startGameActions() {

    // * Who goes first ------------------------
    function whoGoesFirst() {
      const num = Math.floor(Math.random() * 2)
      // const num = 0
      if (num === 0) {
        gameMessage.textContent = 'YOUR TURN, Lets see what you\'ve got!'

      } else {
        isPlaying = true
        gameMessage.textContent = 'I\'ll KICK THINGS OFF, How do you like THIS!'
        //!add AUDIO HERE BOMB IN FLIGHT
        setTimeout(() => {
          droppingCompBombs()
        }, 3000)
      }
    }

    cellsComp.forEach(element => {
      element.addEventListener('click', droppingPlayerBombs)
    })

    //* Players gameplay ----------------------------------
    const playersBombDrops = []
    function droppingPlayerBombs(event) {
      if (isPlaying) return
      if (playersBombDrops.includes(event.target.textContent)) {
        gameMessage.textContent = 'You already picked this square dummy! TRY AGAIN'
      } else {
        playersBombDrops.push(event.target.textContent)

        if (!event.target.classList.contains('comp-ship')) {
          event.target.classList.add('missed-shot')
          gameMessage.textContent = 'PLAYER missed, Computers turn next!'
          //!add AUDIO HERE DROP N SPLASH
          setTimeout(() => {
            droppingCompBombs()
          }, 1500)

        } else {
          //removes and adds classes
          //!add AUDIO HERE DROP N BOMB-HIT
          gameMessage.textContent = 'Good shot, I\'ll get you this time!'
          event.target.classList.remove('comp-ship')
          event.target.classList.add('ship-hit')

          // checks if whole ship is sank. 
          checkCompSunk(event)


          // now triggers the comp to drop bomb
          //!add AUDIO HERE BOMB IN FLIGHT
          setTimeout(() => {
            droppingCompBombs()
          }, 1500)
        }
        isPlaying = true
      }
    }


    //* Computers Gameplay -----------------------------------
    const shotsTaken = [-1]
    let cellsFull = false
    let compHit = false

    function droppingCompBombs() {

      if (!cellsFull) {
        checkCompHit()
      }

      if (compHit) {
        persueCompHits()
      } else {
        const bombDropLocation = Math.floor(Math.random() * cellCount)
        if (shotsTaken.includes(bombDropLocation)) {
          return droppingCompBombs()
        } else {
          shotsTaken.push(bombDropLocation)
          if (cellsPlayer[bombDropLocation].classList.contains('ship')) {
            cellsPlayer[bombDropLocation].classList.remove('ship')
            cellsPlayer[bombDropLocation].classList.add('ship-hit')
            gameMessage.textContent = 'COMPUTER hit a ship! Players turn next'
            //!add AUDIO HERE BOMB-HIT
            cellsFull = false
            checkPlayerSunk(bombDropLocation)
            droppingPlayerBombs()
          } else {
            cellsPlayer[bombDropLocation].classList.add('missed-shot')
            gameMessage.textContent = 'COMPUTER missed, Players turn'
            // console.log(bombDropLocation)
            // console.log(shotsTaken)
            //!add AUDIO HERE SPLASH
            cellsFull = false
            droppingPlayerBombs()
          }
        }
      }
      isPlaying = false
    }

    //* COMP INTELLIGENCE, Creating COMPS next move if prevous shot was a hit --------------------------

    //checking prevous shot was a hit
    function checkCompHit() {
      if (cellsPlayer[(shotsTaken[(shotsTaken.length - 1)])] === undefined) {
        compHit = false
        return
      } else if (cellsPlayer[(shotsTaken[(shotsTaken.length - 1)])].classList.contains('ship-hit')) {
        compHit = true
        return
      } else {
        compHit = false
        return
      }
    }

    // creating array of next targets to choose from
    function persueCompHits() {
      let selection
      let targetedCompShotSelections = []
      if (shotsTaken[(shotsTaken.length - 1)] === 0) {
        targetedCompShotSelections = [
          (shotsTaken[(shotsTaken.length - 1)] + 1),
          (shotsTaken[(shotsTaken.length - 1)] + 10)
        ]
        selection = Math.floor(Math.random() * 2)
        // console.log(targetedCompShotSelections)
        // console.log(selection)
        // console.log(`my next shot would be ${targetedCompShotSelections[selection]}`)

      } else if (shotsTaken[(shotsTaken.length - 1)] === 99) {
        targetedCompShotSelections = [
          (shotsTaken[(shotsTaken.length - 1)] - 1),
          (shotsTaken[(shotsTaken.length - 1)] - 10)
        ]
        selection = Math.floor(Math.random() * 2)
        // console.log(targetedCompShotSelections)
        // console.log(selection)
        // console.log(`my next shot would be ${targetedCompShotSelections[selection]}`)

      } else if (shotsTaken[(shotsTaken.length - 1)] <= 9) {
        targetedCompShotSelections = [
          (shotsTaken[(shotsTaken.length - 1)] - 1),
          (shotsTaken[(shotsTaken.length - 1)] + 1),
          (shotsTaken[(shotsTaken.length - 1)] + 10)
        ]
        selection = Math.floor(Math.random() * 3)
        // console.log(targetedCompShotSelections)
        // console.log(selection)
        // console.log(`my next shot would be ${targetedCompShotSelections[selection]}`)

      } else if (shotsTaken[(shotsTaken.length - 1)] >= 90) {
        targetedCompShotSelections = [
          (shotsTaken[(shotsTaken.length - 1)] - 1),
          (shotsTaken[(shotsTaken.length - 1)] + 1),
          (shotsTaken[(shotsTaken.length - 1)] - 10)
        ]
        selection = Math.floor(Math.random() * 3)
        // console.log(targetedCompShotSelections)
        // console.log(selection)
        // console.log(`my next shot would be ${targetedCompShotSelections[selection]}`)

      } else {
        targetedCompShotSelections = [
          (shotsTaken[(shotsTaken.length - 1)] - 1),
          (shotsTaken[(shotsTaken.length - 1)] + 1),
          (shotsTaken[(shotsTaken.length - 1)] - 10),
          (shotsTaken[(shotsTaken.length - 1)] + 10)
        ]
        selection = Math.floor(Math.random() * 4)
        // console.log(targetedCompShotSelections)
        // console.log(selection)
        // console.log(`my next shot would be ${targetedCompShotSelections[selection]}`)
      }


      //checking if new target has already been taken
      const checkCellsAroundHit = targetedCompShotSelections.every(number => shotsTaken.includes(number))

      if (checkCellsAroundHit === true) {
        cellsFull = true
        compHit = false
        droppingCompBombs()
      } else if (shotsTaken.includes(targetedCompShotSelections[selection])) {
        persueCompHits()
      } else {
        shotsTaken.push(targetedCompShotSelections[selection])
        if (cellsPlayer[targetedCompShotSelections[selection]].classList.contains('ship')) {
          cellsPlayer[targetedCompShotSelections[selection]].classList.remove('ship')
          cellsPlayer[targetedCompShotSelections[selection]].classList.add('ship-hit')
          gameMessage.textContent = 'COMPUTER hit a ship! Players turn next'
          //!add AUDIO HERE BOMB-HIT
          cellsFull = false
          checkPlayerSunk(targetedCompShotSelections[selection])
          droppingPlayerBombs()
        } else {
          cellsPlayer[targetedCompShotSelections[selection]].classList.add('missed-shot')
          gameMessage.textContent = 'COMPUTER missed, Players turn'
          // console.log(bombDropLocation)
          // console.log(shotsTaken)
          //!add AUDIO HERE SPLASH
          cellsFull = false
          droppingPlayerBombs()
        }
      }
    }


    //* checking if whole ship is sunk functions ----------------------------

    // Computer
    function checkCompSunk(event) {
      for (let i = 0; i < compShip.length; i++) {
        if (compShip[i].location.includes(parseInt(event.target.textContent))) {
          compShip[i].hitLocation.push(parseInt(event.target.textContent))
          if (compShip[i].hitLocation.length === compShip[i].location.length) {
            compShip[i].isSunk = true
            shipSunkMessage.textContent = `You have sunk HMS ${compShip[i].name}! I will get you this time!`
            declareWinner()
          }
        }
      }
    }
    // Player
    function checkPlayerSunk(bombDropLocation) {
      for (let i = 0; i < ship.length; i++) {
        if (ship[i].location.includes(bombDropLocation)) {
          ship[i].hitLocation.push(bombDropLocation)
          if (ship[i].hitLocation.length === ship[i].location.length) {
            ship[i].isSunk = true
            shipSunkMessage.textContent = `I have sunk your ${ship[i].name}! MWA HAHAHAHA!`
            declareWinner()
          }
        }
      }
      return
    }
    whoGoesFirst()
  }



  // ! DECLARING THE WINNER ---------------------------------------------------------------

  function declareWinner() {

    if (compShip[0].isSunk === true &&
    compShip[1].isSunk === true &&
    compShip[2].isSunk === true &&
    compShip[3].isSunk === true &&
    compShip[4].isSunk === true) {
      console.log('CONGRATS')
      gameBoard.style.display = 'none'
      gameMessages.style.display = 'none'
      winnerBoard.style.display = 'flex'
      winnerMessage.textContent = 'Congratulations, you are the winner'
      playerCurrentScore++
      playerScore.textContent = `${playerCurrentScore}`
    } else if (ship[0].isSunk === true &&
    ship[1].isSunk === true &&
    ship[2].isSunk === true &&
    ship[3].isSunk === true &&
    ship[4].isSunk === true) {
      console.log('I WIN HAHAHAHAHAH')
      gameBoard.style.display = 'none'
      gameMessages.style.display = 'none'
      winnerBoard.style.display = 'flex'
      winnerMessage.textContent = 'BETTER LUCK NEXT TIME PUNK'
      compCurrentScore++
      compScore.textContent = `${compCurrentScore}`
    } else {
      return
    }
  }










  createGridPlayer()

  //! EVENT LISTENERS ------------------------------------------------------------------------
  randomizeShipsBtn.addEventListener('click', randomizeAllShips)
  startGameBtn.addEventListener('click', startGame)
  instructionsBtn.addEventListener('click', handleInstructions)
  backToGameBtn.addEventListener('click', handleBackToGame)
  resetGameBtn.addEventListener('click', handleResetGame)
  closeWinnerBoard.addEventListener('click', handleWinnerClose)
  playAgainBtn.addEventListener('click', handleResetGame)


}

window.addEventListener('DOMContentLoaded', init)