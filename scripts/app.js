function init() {

  // * Dom elements
  const grid = document.querySelector('.grid')
  const cells = []
 
  //* grid variables
  const width = 10
  const cellCount = width * width
 
 
  //* game variables
  const ships = {
    submarine: []
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
      const num = Math.floor(Math.random() * 69)
      ships.submarine.push(num)
      ships.submarine.push(num + 10)
      ships.submarine.push(num + 20)
      ships.submarine.push(num + 30)
      for (let i = 0; i < ships.submarine.length; i++) {
        cells[ships.submarine[i]].classList.add('ship')
      }
    }

    //* creating horizontal ship

    function createHorizontalShip() {
      // Math.floor(Math.Random() * 69)
      console.log('I am creating a Horizontal ship')
    }

    horizontalOrVertical()
  }

 
  createGrid()
  createShip()

 
 
  //* event listeners
  // document.addEventListener('keyup', handleKeyUp)



}

window.addEventListener('DOMContentLoaded', init)