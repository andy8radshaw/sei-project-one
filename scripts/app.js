function init() {

  // * Dom elements
  const gridPlayer = document.querySelector('.grid-player')
  const gridComp = document.querySelector('.grid-comp')
  const cellsPlayer = []
  const cellsComp = []
  const randomizeShipsBtn = document.querySelector('#randomize-ships')
  const startGameBtn = document.querySelector('#start-game')
  const gameMessage = document.querySelector('.game-message')


  //* grid variables
  const width = 10
  const cellCount = width * width

  let reservedSpaces = []

  //* game variables
  let isPressed = false
  let isPlaying = false
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
  function createGridPlayer() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      gridPlayer.appendChild(cell)
      cellsPlayer.push(cell)
      cell.classList.add('whole-grid-player')
    }
  }

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
  //* Randomize ships button
  function randomizeAllShips() {
    if (isPressed) return
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


  // ! GAMEPLAY ------------------------------------------------------------------------



  function startGameActions() {

    // * Who goes first ------------------------
    function whoGoesFirst() {
      const num = Math.floor(Math.random() * 2)
      // const num = 0
      if (num === 0) {
        gameMessage.textContent = 'YOUR TURN, Lets see what you\'ve got!'

      } else {
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
    function droppingPlayerBombs(event) {
      if (isPlaying) return
      if (!event.target.classList.contains('comp-ship')) {
        event.target.classList.add('missed-shot')
        gameMessage.textContent = 'PLAYER missed, Computers turn next!'
        //!add AUDIO HERE DROP N SPLASH
        setTimeout(() => {
          droppingCompBombs()
        }, 500)

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
        }, 500)
      }
      isPlaying = true
    }
    
    //* Computers Gameplay -----------------------------------

    const shotsTaken = []
    
    function droppingCompBombs() {
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
          checkPlayerSunk(bombDropLocation)
          droppingPlayerBombs()
        } else {
          cellsPlayer[bombDropLocation].classList.add('missed-shot')
          gameMessage.textContent = 'COMPUTER missed, Players turn'
          // console.log(bombDropLocation)
          // console.log(shotsTaken)
          //!add AUDIO HERE SPLASH
          droppingPlayerBombs()
        }
      }
      isPlaying = false
    }


    //* checking if whole ship is sunk functions --------------------

    function checkCompSunk(event) {
      for (let i = 0; i < compShip.length; i++) {
        if (compShip[i].location.includes(parseInt(event.target.textContent))) {
          compShip[i].hitLocation.push(parseInt(event.target.textContent))
          if (compShip[i].hitLocation.length === compShip[i].location.length) {
            compShip[i].isSunk = true
            console.log(`You have sunk HMS ${compShip[i].name}! I will get you this time!`)
          }
        }
      }
    }

    function checkPlayerSunk(bombDropLocation) {
      for (let i = 0; i < ship.length; i++) {
        if (ship[i].location.includes(bombDropLocation)) {
          ship[i].hitLocation.push(bombDropLocation)
          if (ship[i].hitLocation.length === ship[i].location.length) {
            ship[i].isSunk = true
            console.log(`I have sunk your ${ship[i].name}! MWA HAHAHAHA!`)
          }
        }
      }
    }

    whoGoesFirst()

  }



  // ! STARTING THE GAME ---------------------------------------------------------------

  function startGame() {
    if (isPressed) return
    isPressed = true
    createGridComp()
    createAllCompShips()
    startGameActions()

  }

  createGridPlayer()












  //! EVENT LISTENERS ------------------------------------------------------------------------
  randomizeShipsBtn.addEventListener('click', randomizeAllShips)
  startGameBtn.addEventListener('click', startGame)
  // cellsComp.forEach(cell => cell.addEventListener('click', droppingBombs))


}

window.addEventListener('DOMContentLoaded', init)