function init() {

  // * Dom elements
  const grid = document.querySelector('.grid')
  const cells = []
  const randomizeShipsBtn = document.querySelector('#randomize-ships')


  //* grid variables
  const width = 10
  const cellCount = width * width

  let reservedSpaces = []

  //* game variables
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



  // * CREATING THE GRID ----------------------------
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
      cell.classList.add('whole-grid')
    }
  }



  //* CREATING A SHIP ----------------------------
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
      const startingPoint = Math.floor(Math.random() * (cells.length - ((numOfSquaresToFill * width) + 10)))
      
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
      console.log('currentShip 112', currentShip)
      ship[shipIndex].location = currentShip //add current ship to the ship object
     
      for (let i = 0; i < ship[shipIndex].location.length; i++) {
        console.log('cells[ship[shipIndex].location[i]]', cells[ship[shipIndex].location[i]])
        cells[ship[shipIndex].location[i]].classList.add('ship')
        //add index to reserved spaces array
        reservedSpaces.push(ship[shipIndex].location[i])
        
      }
    }
  
    // console.log(`my vertical element is ${numOfSquaresToFill} squares long`)




    //* creating horizontal ship
    function createHorizontalShip() {
      // create array of suitable starting numbers to choose from
      const newArray = []
      for (let i = 0; i < cells.length; i++) {
        if (i % width < (width - (numOfSquaresToFill - 1))) {
          newArray.push(i)
        }
      }
      // generate starting index and starting number from above array
      const startingPointIndex = Math.floor(Math.random() * newArray.length)
      const startingPoint = newArray[startingPointIndex]

      console.log(numOfSquaresToFill, startingPoint, newArray)
      

      // while random number is a reserved number, regenerate
      if (reservedSpaces.includes(startingPoint)) {
        return createShip(numOfSquaresToFill, shipIndex)
      }

      // this variable holds the starting point initially and then the next index is added in the loop below
      const currentShip = [startingPoint]
      console.log(currentShip)
      

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
        cells[ship[shipIndex].location[i]].classList.add('ship')
        reservedSpaces.push(ship[shipIndex].location[i])
      }
      console.log(`my horizontal element is ${numOfSquaresToFill} squares long`)
    }
    horizontalOrVertical()
    console.log('reservedSpaces', reservedSpaces)
  }

  //* CREATING MULTIPLE SHIPS -------------------------------
  function createAllShips() {
    ships.forEach((currentValue, index) => {
      createShip(currentValue, index)
    })
  }


  //* BUTTON CONTROLLERS -----------------------------------
  //* Randomize ships button
  function randomizeAllShips() {
    //set reserved spaces back to an empty array for a new board of ships
    reservedSpaces = []
    const wholeGridCells = document.querySelectorAll('.whole-grid')
    wholeGridCells.forEach(element => {
      element.classList.remove('ship')
    })
    for (let i = 0; i < ships.length; i++) {
      ship[i].location = []
    }
    createAllShips()
  }


  createGrid()



  //* event listeners
  randomizeShipsBtn.addEventListener('click', randomizeAllShips)



}

window.addEventListener('DOMContentLoaded', init)