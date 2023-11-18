// Game State
let phase = 'waiting'; //waiting | stretching | turning | walking | transitioning | falling
let lastTimestamp; //The timestamp of the previous animation cycle
let heroX;
let heroY;
let sceneOffset;

let platforms = [];
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
    phaase = 'waiting';
    lastTimestamp = undefined;
    platforms = [{
        x:50,
        y:50
    }];
    generatePlatform();
    generatePlatform();
    generatePlatform();
    generatePlatform();
    //Hero pos
    heroX = platforms[0].x + platforms[0].w - 30; // Hero stands a bit before the edge
    heroY = 0;
    sceneOffset = 0;

    sticks = [
        {
            x:platforms[0].x + platforms[0].w,
            length:0,
            rotation: 0
        }
    ];
    score = 0;
    restartButton.style.display = "none"; // Hide reset button
    scoreElement.innerText = score; // Reset score display
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