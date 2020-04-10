function init() {

  // * Dom elements
  const grid = document.querySelector('.grid')
  const cells = []
  const randomize = document.querySelector('#random-generate')
 
  //* grid variables
  const width = 10
  const cellCount = width * width
 
 
  //* game variables
  const ships = [2, 3, 3, 4, 5]
  const ship = []
  


    
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
  function createShip(numOfSquaresToFill) {
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
        ship.push(num)
        num = num + 10
      }  
      for (let i = 0; i < ship.length; i++) {
        cells[ship[i]].classList.add('ship')
      }
      console.log(`my vertical element is ${numOfSquaresToFill} squares long`)
    }


    //* creating horizontal ship
    function createHorizontalShip() {
      const newArray = []
      for (let i = 0; i < cells.length; i++){
        if (i % width < (width - (numOfSquaresToFill - 1))) {
          newArray.push(i)
        }  
      }
      let num = Math.floor(Math.random() * newArray.length)

      console.log(newArray[num])
      
      for (let i = 0; i < numOfSquaresToFill; i++) {
        ship.push(newArray[num])
        num++
      }  
      console.log(ship)
      
      for (let i = 0; i < ship.length; i++) {
        cells[ship[i]].classList.add('ship')
      }
      console.log(`my horizontal element is ${numOfSquaresToFill} squares long`)
    }
    horizontalOrVertical()
  }

  //* CREATING MULTIPLE SHIPS -----------------

  function createAllShips() {
    ships.forEach(element => {
      createShip(element)
    })
  }


  //* RAMDOM BUTTON FOR P1
  function randomShips() {
    // for (let i = 0; i < ship1.length; i++){
    //   console.log(allGridDivs) 
    // }
  }




  createGrid()
  createAllShips()


  //* event listeners
  randomize.addEventListener('click', randomShips)



}

window.addEventListener('DOMContentLoaded', init)