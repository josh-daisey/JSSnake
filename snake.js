const board = [];
const boardWidth = 40,
    boardHeight = 25;

var snakeX;
var snakeY;
var snakeLength;
var snakeDirection;
var score = 0;
var highscore = 0;


//  Makes the board and spawns everything in
function initGame() {
    const boardElement = document.getElementById('board');

    for (var y = 0; y < boardHeight; ++y) {
        var row = [];
        for (var x = 0; x < boardWidth; ++x) {
            var cell = {};

            // Create a <div></div> and store it in the cell object
            cell.element = document.createElement('div');

            // Add it to the board
            boardElement.appendChild(cell.element);

            // Add to list of all
            row.push(cell);
        }

        // Add this row to the board
        board.push(row);
    }

    startGame();

    // Start the game loop (it will call itself with timeout)
    gameLoop();
}

function placeApple() {
    // A random coordinate for the apple
    var appleX = Math.floor(Math.random() * boardWidth);
    var appleY = Math.floor(Math.random() * boardHeight);

    board[appleY][appleX].apple = 1;
}

function startGame() {
    if (score > highscore) {
        document.getElementById("highscore").innerHTML = score;
    }
    score = 0
    document.getElementById("score").innerHTML = score;
    // Default position for the snake in the middle of the board.
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    snakeLength = 5;
    snakeDirection = 'Up';

    // Clear the board
    for (var y = 0; y < boardHeight; ++y) {
        for (var x = 0; x < boardWidth; ++x) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
        }
    }

    // Set the center of the board to contain a snake
    board[snakeY][snakeX].snake = snakeLength;

    // Place the first apple on the board.
    placeApple();
}

function gameLoop() {

    // Update position depending on which direction the snake is moving.
    switch (snakeDirection) {
        case 'Up':
            snakeY--;
            break;
        case 'Down':
            snakeY++;
            break;
        case 'Left':
            snakeX--;
            break;
        case 'Right':
            snakeX++;
            break;
    }

    // This code will kill snake if he hits the border :,(
    // if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) {
    //   startGame();
    // }

    //  Causes snake to loop over board
    if (snakeX <= -1) {
        snakeX = 39
    }
    if (snakeX >= boardWidth) {
        snakeX = 0
    }

    if (snakeY <= -1) {
        snakeY = 24
    }

    if (snakeY >= boardHeight) {
        snakeY = 0
    }

    // Tail collision
    if (board[snakeY][snakeX].snake > 0) {
        startGame();
    }

    // Collect apples
    if (board[snakeY][snakeX].apple === 1) {
        snakeLength += 3;
        board[snakeY][snakeX].apple = 0;
        score++;
        document.getElementById("score").innerHTML = score;
        console.log(highscore)
        if (score > highscore) {
            highscore = score
            document.getElementById("highscore").innerHTML = score;
        }
        placeApple();
    }

    // Update the board at the new snake position
    board[snakeY][snakeX].snake = snakeLength;

    // Loop over the entire board, and update every cell
    for (var y = 0; y < boardHeight; y++) {
        for (var x = 0; x < boardWidth; x++) {
            var cell = board[y][x];

            if (cell.snake > 0) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            } else if (cell.apple === 1) {
                cell.element.className = 'apple';
            } else {
                cell.element.className = '';
            }
        }
    }

    // This function calls itself, with a timeout of 1000 milliseconds
    setTimeout(gameLoop, getSpeed(snakeLength));
}

//  Causes the game to get faster the longer the snake
function getSpeed(snakeLength) {
    if (snakeLength >= 0) {
        return 75
    }
    if (snakeLength >= 15) {
        return 50
    }
    if (snakeLength >= 20) {
        return 40
    }
    if (snakeLength >= 25) {
        return 30
    }
    if (snakeLength >= 30) {
        return 20
    }
}

function keyPress(event) {
    // Update direction depending on key hit
    if (event.key == 'ArrowUp' && snakeDirection != 'Down') {
        snakeDirection = 'Up';
    }
    if (event.key == 'ArrowDown' && snakeDirection != 'Up') {
        snakeDirection = 'Down';
    }
    if (event.key == 'ArrowLeft' && snakeDirection != 'Right') {
        snakeDirection = 'Left';
    }
    if (event.key == 'ArrowRight' && snakeDirection != 'Left') {
        snakeDirection = 'Right';
    }

    //  Stops the arrow keys from scrolling the site
    event.preventDefault();
}
