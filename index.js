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
const canvas = document.getElementById('game');
// Getting the drawing context
const ctx = canvas.getContext('2d'); 
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;

// Further UI elements
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");

// Start game
resetGame();

// Resets game state and layout
function resetGame() {
    phase = 'waiting';
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


function generatePlatform() {
    const minimumGap = 40;
    const maximumGap = 200;
    const minimumWidth = 20;
    const maximumWidth = 100;

    const lastPlatform = platforms[platforms.length-1];
    let futhestX = lastPlatform.x + lastPlatform.w;

    const x = futhestX + minimumGap + Math.floor(Math.random()* (maximumGap - minimumGap));
    const w = minimumWidth + Math.floor(Math.random()*(maximumWidth - minimumWidth)); 
    platforms.push({x:x,w:w});
}

function draw() {
    // paints the whole canvas based on the state. 
    // shifts the whole UI by the offset, 
    // puts the hero in position, 
    // paints the platforms and the sticks.
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.save();
    ctx.translate(-sceneOffset,0);
    //draw scene
    drawPlatforms();
    drawHero();
    drawSticks();
}
function drawPlatforms(){
    platforms.forEach(({x,w})=>{
        ctx.fillStyle = 'black';
        ctx.fillRect(x,canvasHeight - platformHeight, w, platformHeight);
    });
}
function drawHero(){
    const heroWidth = 20;
    const heroHeight = 30;
    ctx.fillStyle = 'red';
    ctx.fillRect(
        heroX, heroY+canvasHeight - platformHeight, heroWidth,heroHeight
    );
}
function drawSticks(){
    sticks.forEach((stick)=>{
        ctx.save();
        ctx.translate(stick.x, canvasHeight - platformHeight);
        ctx.rotate((Math.PI/180) * stick.rotation);
        // draw stick
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0, -stick.length);
        ctx.stroke();

        ctx.restore();

    });
}
window.addEventListener('mousedown', (event)=>{
 if(phase === 'waiting'){
    phase = 'streching';
    lastTimestamp = undefined;
    window.requestAnimationFrame(animate);
 }
});
window.addEventListener('mouseup', (event)=>{
    if (phase == "stretching") {
        phase = "turning";
      }
});
restartButton.addEventListener('click', (e)=>{
    resetGame();
    restartButton.style.display = "none";
})
function animate(timestamp){
    if (!lastTimestamp){
        lastTimestamp = timestamp;
        window.requestAnimationFrame(animate);
        return;
    }
    let timePassed = timestamp - lastTimestamp;
    switch(phase){
        case 'waiting':
            return;
        case 'streching':{
            sticks[sticks.length-1].length += timePassed / strechingSpeed;
            break;
        }
        case 'turning':{
            sticks[sticks.length-1].length += timePassed/turninSpeed;

            break;
        }
        case 'walking':{
            heroX += timePassed / walkingSpeed;

            break;
        }
        case 'transitioning':{
            sceneOffset += timePassed /transitioningSpeed;
            
            break;
        }
        case 'falling':{
            heroY += timePassed/fallingSpeed;

            break;
        }
        draw();
        lastTimestamp = timestamp;
        window.requestAnimationFrame(animate);
    }
}