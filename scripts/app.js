function init() {

  // * Dom elements
  const grid = document.querySelector('.grid')
  const cells = []
  const randomizeShipsBtn = document.querySelector('#randomize-ships')
  
 
  //* grid variables
  const width = 10
  const cellCount = width * width
 
 
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
        createHorizontalShip()
      }
    }


    //* creating verticle ship
    function createVerticalShip() {
      let num = Math.floor(Math.random() * (cells.length - ((numOfSquaresToFill * width) + 10)))    
      for (let i = 0; i < numOfSquaresToFill; i++) {
        ship[shipIndex].location.push(num)
        num = num + 10
      }  
      // console.log(ship[shipIndex].location)

      for (let i = 0; i < ship.length; i++) {
        ship[i].location.forEach(element => {
          console.log(element)
          
        })
      }
      
      for (let i = 0; i < ship[shipIndex].size; i++) {
        cells[ship[shipIndex].location[i]].classList.add('ship')
      }
      // console.log(`my vertical element is ${numOfSquaresToFill} squares long`)
    }


    //* creating horizontal ship
    function createHorizontalShip() {
      const newArray = []
      for (let i = 0; i < cells.length; i++){
        if (i % width < (width - (numOfSquaresToFill - 1))) {
          newArray.push(i)
        }  
      }
      const num = Math.floor(Math.random() * newArray.length)

      for (let i = 0; i < numOfSquaresToFill; i++) {
        ship[shipIndex].location.push(newArray[num])
        newArray[num]++
      }  
      // console.log(ship[shipIndex].location)
      
      for (let i = 0; i < ship[shipIndex].size; i++) {
        cells[ship[shipIndex].location[i]].classList.add('ship')
      }
      // console.log(`my horizontal element is ${numOfSquaresToFill} squares long`)
    }
    horizontalOrVertical()
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