function init() {

  // * Dom elements
  const grid = document.querySelector('.grid')
  const cells = []
 
  //* grid variables
  const width = 10
  const cellCount = width * width
 
 
  //* game variables
  const ships = {
    ship1: []

  }
    
 
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }


  function createShip() {
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
      const num = Math.floor(Math.random() * 59)
      ships.ship1.push(num)
      ships.ship1.push(num + 10)
      ships.ship1.push(num + 20)
      ships.ship1.push(num + 30)
      ships.ship1.push(num + 40)
      for (let i = 0; i < ships.ship1.length; i++) {
        cells[ships.ship1[i]].classList.add('ship')
      }
    }

    //* creating horizontal ship

    function createHorizontalShip() {
      const newArray = []
      for (let i = 0; i < cells.length; i++){
        if (i % width < 6) {
          newArray.push(i)
        }
      }
      const num = Math.floor(Math.random() * newArray.length)
      ships.ship1.push(newArray[num])
      ships.ship1.push(newArray[num] + 1)
      ships.ship1.push(newArray[num] + 2)
      ships.ship1.push(newArray[num] + 3)
      ships.ship1.push(newArray[num] + 4)
      for (let i = 0; i < ships.ship1.length; i++) {
        cells[ships.ship1[i]].classList.add('ship')
      }
    }

    horizontalOrVertical()
  }

 
  createGrid()
  createShip()

 
 
  //* event listeners
  // document.addEventListener('keyup', handleKeyUp)



}

window.addEventListener('DOMContentLoaded', init)