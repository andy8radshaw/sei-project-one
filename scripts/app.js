function init() {

  // * Dom elements
  const gridPlayer = document.querySelector('.grid-player')
  const gridComp = document.querySelector('.grid-comp')
  const cellsPlayer = []
  const cellsComp = []
  const randomizeShipsBtn = document.querySelector('#randomize-ships')
  const startGameBtn = document.querySelector('#start-game')


  //* grid variables
  const width = 10
  const cellCount = width * width

  let reservedSpaces = []

  //* game variables
  let isPlaying = false
  const ships = [2, 3, 4, 5, 6]
  const ship = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      isSunk: false
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      isSunk: false
    },
    {
      name: 'Cruiser',
      size: 4,
      location: [],
      isSunk: false
    },
    {
      name: 'Battleship',
      size: 5,
      location: [],
      isSunk: false
    },
    {
      name: 'Carrier',
      size: 6,
      location: [],
      isSunk: false
    }
  ]

  const compShip = [
    {
      name: 'Destroyer',
      size: 2,
      location: [],
      isSunk: false
    },
    {
      name: 'Submarine',
      size: 3,
      location: [],
      isSunk: false
    },
    {
      name: 'Cruiser',
      size: 4,
      location: [],
      isSunk: false
    },
    {
      name: 'Battleship',
      size: 5,
      location: [],
      isSunk: false
    },
    {
      name: 'Carrier',
      size: 6,
      location: [],
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
    if (isPlaying) return
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


    function whoGoesFirst() {
      // const num = Math.floor(Math.random() * 2)
      const num = 1
      if (num === 0) {
        console.log('Player goes first')
        
      } else {
        console.log('Computer goes first')
        setTimeout(() => {
          droppingCompBombs()
        }, 3000)
      }
    }

    cellsComp.forEach(element => {
      element.addEventListener('click', droppingPlayerBombs)
    })


    function droppingPlayerBombs(event) {
      
      if (!event.target.classList.contains('comp-ship')) {
        event.target.classList.add('missed-shot')
        console.log('You missed, its MY turn now!')
        console.log('TRIGGER SOUND HERE')
        setTimeout(() => {
          droppingCompBombs()
        }, 3000)

      } else {

        event.target.classList.remove('comp-ship')
        event.target.classList.add('ship-hit')
        console.log(event.target.classList)
        setTimeout(() => {
          droppingCompBombs()
        }, 3000)
      }
      // return nextPlayer()
    }
    const shotsTaken = []
    
    function droppingCompBombs() {
      
      const bombDropLocation = Math.floor(Math.random() * cellCount)

      if (shotsTaken.includes(bombDropLocation)) {
        return droppingCompBombs()
      } else {
        shotsTaken.push(bombDropLocation)
        if (cellsPlayer[bombDropLocation].classList.contains('ship')) {
          console.log('I have hit a ship!')
          cellsPlayer[bombDropLocation].classList.remove('ship')
          cellsPlayer[bombDropLocation].classList.add('ship-hit')
          droppingPlayerBombs()
        }
        cellsPlayer[bombDropLocation].classList.add('missed-shot')
        console.log('I missed, your turn')
        console.log(bombDropLocation)
        console.log(shotsTaken)
        droppingPlayerBombs()
      }
    }

    whoGoesFirst()

  }



  // ! STARTING THE GAME ---------------------------------------------------------------

  function startGame() {
    if (isPlaying) return
    isPlaying = true
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