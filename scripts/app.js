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
  const audio = document.querySelector('#audio')


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
  let playerWinner = false
  const ships = [2, 3, 4, 5, 6]
  const ship = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Aircraft Carrier',
      size: 4,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Battle Cruiser',
      size: 5,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Mega Cruiser',
      size: 6,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    }
  ]

  const compShip = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Aircraft Carrier',
      size: 4,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Battle Cruiser',
      size: 5,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
    },
    {
      name: 'Mega Cruiser',
      size: 6,
      location: [],
      hitLocation: [],
      isSunk: false,
      isVerticle: true
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
      ship[shipIndex].isVerticle = true
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
      ship[shipIndex].isVerticle = false
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
    playerShipImages()
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


  //! ADDING IMAGES TO THE SHIPS ------------------------------------------------------------

  function playerShipImages() {
    if (ship[0].isVerticle === true) {
      cellsPlayer[ship[0].location[0]].classList.add('destroyer-vert-one')
      cellsPlayer[ship[0].location[1]].classList.add('destroyer-vert-two')
    } else {
      cellsPlayer[ship[0].location[0]].classList.add('destroyer-hori-one')
      cellsPlayer[ship[0].location[1]].classList.add('destroyer-hori-two')
    }
    if (ship[1].isVerticle === true) {
      cellsPlayer[ship[1].location[0]].classList.add('submarine-vert-one')
      cellsPlayer[ship[1].location[1]].classList.add('submarine-vert-two')
      cellsPlayer[ship[1].location[2]].classList.add('submarine-vert-three')
    } else {
      cellsPlayer[ship[1].location[0]].classList.add('submarine-hori-one')
      cellsPlayer[ship[1].location[1]].classList.add('submarine-hori-two')
      cellsPlayer[ship[1].location[2]].classList.add('submarine-hori-three')
    }
    if (ship[2].isVerticle === true) {
      cellsPlayer[ship[2].location[0]].classList.add('carrier-vert-one')
      cellsPlayer[ship[2].location[1]].classList.add('carrier-vert-two')
      cellsPlayer[ship[2].location[2]].classList.add('carrier-vert-three')
      cellsPlayer[ship[2].location[3]].classList.add('carrier-vert-four')
    } else {
      cellsPlayer[ship[2].location[0]].classList.add('carrier-hori-one')
      cellsPlayer[ship[2].location[1]].classList.add('carrier-hori-two')
      cellsPlayer[ship[2].location[2]].classList.add('carrier-hori-three')
      cellsPlayer[ship[2].location[3]].classList.add('carrier-hori-four')
    }
    if (ship[3].isVerticle === true) {
      cellsPlayer[ship[3].location[0]].classList.add('battle-vert-one')
      cellsPlayer[ship[3].location[1]].classList.add('battle-vert-two')
      cellsPlayer[ship[3].location[2]].classList.add('battle-vert-three')
      cellsPlayer[ship[3].location[3]].classList.add('battle-vert-four')
      cellsPlayer[ship[3].location[4]].classList.add('battle-vert-five')
    } else {
      cellsPlayer[ship[3].location[0]].classList.add('battle-hori-one')
      cellsPlayer[ship[3].location[1]].classList.add('battle-hori-two')
      cellsPlayer[ship[3].location[2]].classList.add('battle-hori-three')
      cellsPlayer[ship[3].location[3]].classList.add('battle-hori-four')
      cellsPlayer[ship[3].location[4]].classList.add('battle-hori-five')
    }
    if (ship[4].isVerticle === true) {
      cellsPlayer[ship[4].location[0]].classList.add('mega-vert-one')
      cellsPlayer[ship[4].location[1]].classList.add('mega-vert-two')
      cellsPlayer[ship[4].location[2]].classList.add('mega-vert-three')
      cellsPlayer[ship[4].location[3]].classList.add('mega-vert-four')
      cellsPlayer[ship[4].location[4]].classList.add('mega-vert-five')
      cellsPlayer[ship[4].location[5]].classList.add('mega-vert-six')
    } else {
      cellsPlayer[ship[4].location[0]].classList.add('mega-hori-one')
      cellsPlayer[ship[4].location[1]].classList.add('mega-hori-two')
      cellsPlayer[ship[4].location[2]].classList.add('mega-hori-three')
      cellsPlayer[ship[4].location[3]].classList.add('mega-hori-four')
      cellsPlayer[ship[4].location[4]].classList.add('mega-hori-five')
      cellsPlayer[ship[4].location[5]].classList.add('mega-hori-six')
    }
  }
  
  



  //! BUTTON CONTROLLERS -------------------------------------------------------------------

  //* Start Game Button
  function startGame() {
    if (isStartPressed) return
    isStartPressed = true
    isRandomPressed = true
    gridComp.style.display = 'flex'
    
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
      element.classList = 'whole-grid-player'
      
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
    playerWinner = false
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
    gameMessage.innerHTML = 'INCOMING MESSAGE: <br/>I declare WAR. Arrange your ships and lets do BATTLE!...'
    shipSunkMessage.textContent = ''
    gameMessages.style.display = 'flex'
  }






  // ! GAMEPLAY ------------------------------------------------------------------------

  function startGameActions() {
    if (playerWinner) return
    // * Who goes first ------------------------
    function whoGoesFirst() {
      if (playerWinner) return
      // const num = Math.floor(Math.random() * 2)
      const num = 0
      if (num === 0) {
        gameMessage.textContent = 'YOUR TURN, Lets see what you\'ve got!'

      } else {
        isPlaying = true
        gameMessage.textContent = 'I\'ll KICK THINGS OFF, How do you like THIS!'
        droppingCompBombs()
      }
    }

    cellsComp.forEach(element => {
      element.addEventListener('click', droppingPlayerBombs)
    })

    //* Players gameplay ----------------------------------
    const playersBombDrops = []
    function droppingPlayerBombs(event) {
      if (playerWinner) return
      if (isPlaying) {
        return
      } else if (playersBombDrops.includes(event.target.textContent)) {
        gameMessage.textContent = 'You already picked this square dummy! TRY AGAIN'
      } else {
        playersBombDrops.push(event.target.textContent)

        if (!event.target.classList.contains('comp-ship')) {
          audioPlayerMiss()
          setTimeout(() => {
            event.target.classList.add('missed-shot')
            gameMessage.textContent = 'You can do better than that... MY TURN NOW'
            setTimeout(() => {
              isPlaying = true
              droppingCompBombs()
            },1500)
          }, 8000)
        } else {
          if (playerWinner) return
          //removes and adds classes
          audioPlayerHit()
          setTimeout(() => {
            gameMessage.textContent = 'Good shot, I\'ll get you this time!'
            
            event.target.classList.add('ship-hit')
  
            // checks if whole ship is sank. 
            checkCompSunk(event)
            if (playerWinner) return
            setTimeout(() => {
              isPlaying = true
              droppingCompBombs()
            },1500)
            
          }, 7500)
          
        }
        isPlaying = true
      }
    }


    //* Computers Gameplay -----------------------------------
    const shotsTaken = [-1]
    let cellsFull = false
    let compHit = false

    function droppingCompBombs() {
      if (playerWinner) return

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
            audioCompHit()
            setTimeout(() => {
              
              cellsPlayer[bombDropLocation].classList.add('ship-hit')
              gameMessage.textContent = 'How\'d ya like me now?! TAKE THAT!... your turn.'
              cellsFull = false
              checkPlayerSunk(bombDropLocation)
              isPlaying = false
              droppingPlayerBombs()
            }, 6500)
          } else {
            audioCompMiss()
            setTimeout(() => {
              cellsPlayer[bombDropLocation].classList.add('missed-shot')
              gameMessage.textContent = 'DAMMIT, I missed. I\'ll get you next time'
              // console.log(bombDropLocation)
              // console.log(shotsTaken)
              cellsFull = false
              isPlaying = false
              droppingPlayerBombs()
            }, 5000)
          }
        }
      }
    }

    //* COMP INTELLIGENCE, Creating COMPS next move if prevous shot was a hit --------------------------

    //checking prevous shot was a hit
    function checkCompHit() {
      if (playerWinner) return
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
      if (playerWinner) return
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
          audioCompHit()
          setTimeout(() => {
            
            cellsPlayer[targetedCompShotSelections[selection]].classList.add('ship-hit')
            gameMessage.textContent = 'HAHAHAH you\'re going to lose!!...'
            cellsFull = false
            checkPlayerSunk(targetedCompShotSelections[selection])
            isPlaying = false
            droppingPlayerBombs()
          }, 6500)
          
        } else {
          audioCompMiss()
          setTimeout(() => {
            cellsPlayer[targetedCompShotSelections[selection]].classList.add('missed-shot')
            gameMessage.textContent = 'CLOSE.... I\'ll destroy you next time!'
            // console.log(bombDropLocation)
            // console.log(shotsTaken)
            //!add AUDIO HERE SPLASH
            cellsFull = false
            isPlaying = false
            droppingPlayerBombs()
          }, 5000)
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
            shipSunkMessage.textContent = `You have sunk the enemies ${compShip[i].name}! `
            declareWinner()
          }
        }
      }
    }
    // Player
    function checkPlayerSunk(bombDropLocation) {
      if (playerWinner) return
      for (let i = 0; i < ship.length; i++) {
        if (ship[i].location.includes(bombDropLocation)) {
          ship[i].hitLocation.push(bombDropLocation)
          if (ship[i].hitLocation.length === ship[i].location.length) {
            ship[i].isSunk = true
            shipSunkMessage.textContent = `Computer has sunk your ${ship[i].name}!`
            declareWinner()
          }
        }
      }
      return
    }
    whoGoesFirst()
  }


  //! AUDIO FUNCTIONS ---------------------------------------------------------------------

  function audioCompHit() {
    audio.src = './assets/audio/comp-hit.wav'
    audio.play()
  }

  function audioCompMiss() {
    audio.src = './assets/audio/comp-miss.wav'
    audio.play()
  }

  function audioPlayerHit() {
    audio.src = './assets/audio/player-hit.wav'
    audio.play()
  }

  function audioPlayerMiss() {
    audio.src = './assets/audio/player-miss.wav'
    audio.play()
  }



  // ! DECLARING THE WINNER ---------------------------------------------------------------

  function declareWinner() {

    if (compShip[0].isSunk === true &&
    compShip[1].isSunk === true &&
    compShip[2].isSunk === true &&
    compShip[3].isSunk === true &&
    compShip[4].isSunk === true) {
      console.log('CONGRATS')
      playerWinner = true
      setTimeout(() =>{
        gameBoard.style.display = 'none'
        gameMessages.style.display = 'none'
        winnerBoard.style.display = 'flex'
        winnerMessage.textContent = 'Congratulations, you are the winner'
        playerCurrentScore++
        playerScore.textContent = `${playerCurrentScore}`
      }, 5000)
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