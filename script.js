const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = 400;
const rows = canvasSize / box;
const cols = canvasSize / box;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
};

let score = 0;
let d;

// Adicionar listener de eventos para as teclas
document.addEventListener('keydown', direction);

// Função para mudar a direção com base na tecla pressionada
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (key == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (key == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (key == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

// Eventos de clique para os botões do D-pad
document.getElementById('left').addEventListener('click', function() {
    if (d != 'RIGHT') d = 'LEFT';
});

document.getElementById('up').addEventListener('click', function() {
    if (d != 'DOWN') d = 'UP';
});

document.getElementById('right').addEventListener('click', function() {
    if (d != 'LEFT') d = 'RIGHT';
});

document.getElementById('down').addEventListener('click', function() {
    if (d != 'UP') d = 'DOWN';
});

// Função para detectar colisão
function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
        if (newHead.x == array[i].x && newHead.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Função principal do jogo
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#0f0" : "#fff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').innerHTML = 'Pontuação: ' + score;
        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 100);
