const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const grid = 32;
const tetrominoes = [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0]
];

let tetromino = tetrominoes[0];
let position = { x: 5, y: 0 };
let startTime = Date.now();
const fallingDuration = 15000;

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (tetromino[row * 4 + col]) {
                context.fillStyle = 'cyan';
                context.fillRect((position.x + col) * grid, (position.y + row) * grid, grid - 1, grid - 1);
            }
        }
    }
}

function update() {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < fallingDuration) {
        position.y++;
        draw();
    } else {
        clearInterval(fallInterval);
    }
}

function handleTouch(event) {
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;
    const gridX = Math.floor(touchX / grid);
    const gridY = Math.floor(touchY / grid);

    const index = Math.floor(Math.random() * tetrominoes.length);
    tetromino = tetrominoes[index];
    position = { x: gridX, y: gridY };
    
    draw();
}

const fallInterval = setInterval(update, 1000);

canvas.addEventListener('touchstart', handleTouch);
