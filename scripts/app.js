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
  const ship1 = []


    
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



  //* CREATING A 5 length SHIP ----------------------------
  function createShip(squares) {
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

      const num = (Math.floor(Math.random() * cells.length) - ((squares * 10) + 10))
      console.log(num)
      // for (let i = 0; i < squares; i++) {
      //   ship1.push(num += 10)
      // }
      for (let i = 0; i < ship1.length; i++) {
        cells[ship1[i]].classList.add('ship')
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
      ship1.push(newArray[num])
      ship1.push(newArray[num] + 1)
      ship1.push(newArray[num] + 2)
      ship1.push(newArray[num] + 3)
      ship1.push(newArray[num] + 4)
      for (let i = 0; i < ship1.length; i++) {
        cells[ship1[i]].classList.add('ship')
      }
      console.log(`my horizontal element is ${squares} squares long`)
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