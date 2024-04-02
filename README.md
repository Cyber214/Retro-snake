# Retro-snake
Draw board by specifying cell size from MDN:
Constant for grid size
Define a list of variables:
Set snake initial position on the board
Set initial food position on the grid
Set Empty array to store score history
Set initial score to 0
Set dx and dy to represent position on x and y axis on the grid
Cached elements:
Cached element for score
Cashed element for score list
Event listener:
Add an event listener for the arrow keys to change direction of snake
Function draw cell:
Function to fill a cell that has the position of the snake with a color
Function to fill a cell that has the position of the food with a color
Function to move the snake:
When the snake changes position update the initial head of the snake with .unshift method
Create a function to change the direction of the snake with dx and dy in relation to the arrow keys
Function check for collision:
If the position of the head of the snake exceeds the boundaries of the grid let the game end
Function for score:
Function to save player name 
Function to save player score
Function to increase player score
Score history Function to display the last 5 player names and score 
Game initializing:
Function to clear clear the canvas
Function to reset game
Function to start new game
Add a function to start a new game to a button
