 # Project One - BattleShips!

Table of Contents:
- Project Overview
- The Brief
- Technologies Used
- Approach Taken
- Featured Code
- Screenshots
- Bugs
- Wins and Blockers
- Future Content and Improvements


# Project Overview
Battleships is an strategic type guessing game. Originating as a pencil and paper game dating from around World War I, then released in the 1960's as a board game. Skip to the current day, where the game has spawned a number of electronic versions. 

Commense battle and challenge yourself to sink all your opponents ships before they sink yours. 

This was my first project from General Assembly's Software Engineering Immersive course. It was an individual project built in 9 days, and was the first proper game I had built, and my first real-world type practice with JavaScript. 

Launch the game here on GitHub pages. Check out the GitHup Repo.

(image or gif of gameplay)



# Game Brief:
- Render a grid based game in the browser
- Create a one-player game against the computer
- The computer must be able to randomly place its peices at the start of the game
- The computer should be able to make random attacks on the players board
- Design logic for winning and losing and display this on the screen
- Include separate HTML, CSS and JavaScript files
- Deploy your game online



 # Technologies used:
- HTML5 with HTML5 audio
- CSS3 with animation
- JavaScript (ES6)
- Git
- GitHub
- Google Fonts



# Approach Taken:
Grid Layout and generation of Ships on screen  - 
Functionality
Game control
Audio



# Featured Code:
Creating ships?
Checking overlapping


# Screenshots 
At MVP
After some styling
At final submitted product



# Bugs:
- currently the computer has basic intelligence. It will check if its previous shot was a hit and if so, take its next shot around that cell. however, if it then misses it will take its next shot at random. Idealy I would like the computer, once it has made a hit, to have the intelligence to completely sink the ship in all directions before moving on to its next random shot. 
- Throughout the build of the project there were a number of bugs experienced. however, by keeping the mindset to create a simple game and trying not to over-complicate things as well as spending lots of time testing has helped me iron out all smaller bugs and create a simple and fun game


# Wins and Blockers
- The biggest challenge and blocker for me was getting the ships to place randomly on the grid without overlapping each other. Once I understood the idea of creating a potential ship location in an array and then checking this against all current ship locations then I was able to move past this point. But this did take me a long while to work out. 
- A big win for me in this project was my increased level of JS and how to apply code in an ordered manner. Using higher level functionality and 


# Future content and improvements:
- Increased Computer intelligence
- differing levels of difficulty
- the ability for players to move ships and place them where they want as well as the random button currently implemented
- Add a multi-player feature so two players could compete against each other
- explosions and misses to be animated
- the grids to be animated
- animated bombs across the page from one grid to the other
- more concise and DRY code in certain areas
