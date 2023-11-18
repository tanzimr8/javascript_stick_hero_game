// Game State
let phase = 'waiting'; //waiting | stretching | turning | walking | transitioning | falling
let timestamp; //The timestamp of the previous animation cycle
let heroX;
let heroYl
let sceneOffset;

let platform = [];
let sticks = [];

let score = 0;

// Config
// Getting the canvas element
const canvas = document.getElementById('#game');
// Getting the drawing context
const ctx = canvas.getContext('2d'); 

// Further UI elements
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

// Start game
resetGame();

// Resets game state and layout
function resetGame() {
    
  
    draw();
}

function draw() {

}
window.addEventListener('mousedown', (event)=>{

});
window.addEventListener('mouseup', (event)=>{

});
function animate(timestamp){

}