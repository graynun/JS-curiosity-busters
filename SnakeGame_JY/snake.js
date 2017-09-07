//  https://github.com/Lorengamboa/snake-game/blob/master/main.js

(function() {
  'use strict';

// * --- basic setting * --- //
// CANVAS
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
const height = canvas.height;
const width  = canvas.width;

// KEYCODE
const KEY_ENTER = 13,
      KEY_LEFT  = 37,
      KEY_DOWN  = 38,
      KEY_RIGHT = 39,
      KEY_UP    = 40;

// SETTING
var gameSpeed    = 5;
var tail         = [];
var score        = 0;
var highestScore = 0;
var image        = new Image();
image.src = "img/apple.png"

// FUNCTIONS
function run() {
  snakeEating(snake, apple);
  snake.move();
  snake.checkCollision();
  ctx.clearRect(0, 0, height, width)
  apple.draw();
  snake.draw();
  showScore();
};

function showScore() {
  ctx.fillText("Score : " + score, 0, height);
  ctx.fillText("Highest score : " + highestScore, 0, 10);
}

// SNAKE BODY
// METHODS: draw(), add(), hasBack(), copy()
// right/left/top/bottom()
function Square(x, y) {
  this.x    = x;
  this.y    = y;
  this.back = null;

  this.draw = () => {
    ctx.beginPath();
    ctx.rect(this.x, this.y, 10, 10);
    ctx.strokeStyle = "green";
    ctx.stroke();
    if(this.hasBack()) {
      this.back.draw();
    }
  }

  this.add = () => {
    if(this.hasBack()) return this.back.add();
    this.back = new Square(this.x, this.y);
    tail.push(this.back);
  }
  this.hasBack = () => {
    return this.back !== null;    // ??
  }
  this.copy = () => {             // ??
    if(this.hasBack()) {
      this.back.copy();
      this.back.x = this.x;
      this.back.y = this.y;
    }
  }
  this.right = () => {
    this.copy();
    this.x += 10;
    if (this.x >= 500) this.x = 0;
  }
  this.left = () => {
    this.copy();
    this.x -= 10;
    if(this.x < 0) this.x = 490;
  }
  this.up = () => {
    this.copy();
    this.y += 10;
    if(this.y >= 500) this.y = 0;
  }
  this.down = () => {
    this.copy();
    this.y -= 10;
    if(this.y < 0) this.y = 490;
  }
}

// SNAKE CLASS
function Snake() {
  this.head = new Square(100, 0);
  this.direction = "right";

  this.right = () => { this.direction = "right" }
  this.left = () => { this.direction = "left" }
  this.up = () => { this.direction = "up" }
  this.down = () => { this.direction = "down" }
  this.draw = () => { this.head.draw(); }
  this.move = () => {
    if (this.direction === "right") return this.head.right();
    if (this.direction === "left") return this.head.left();
    if (this.direction === "up") return this.head.up();
    if (this.direction === "down") return this.head.down();
  }
  this.checkCollision = () => {
    for(var i=0 ; i<tail.length ; i++) {
      if(tail[i].x == this.head.x && tail[i].y == this.head.y) {
        tail = [];
        gameSpeed = 5;
        score = 0;
        this.head.back = null;
        clearInterval(game);
        return game = setInterval(run, 1000 / gameSpeed);
      }
    }
  }
}

// GENERATE RANDOM FOOD
class randomFood {
  constructor() {
    this.x;
    this.y;
    this.food = false;
    this.newFood();
  }
  hasBeenEaten() {
    if(!this.food) this.newFood();
  }
  newFood() {
    this.food = true;
    this.x = Math.floor(Math.random() * 50) * 10;
    this.y = Math.floor(Math.random() * 50) * 10;
  }
  draw() {
    ctx.drawImage(image, this.x, this.y, 10, 10);
  }
}

function snakeEating(snake, apple) {
  if(snake.head.x == apple.x && snake.head.y == apple.y) {
    apple.food = false;
    gameSpeed += 1;
    score += 1;

    if(score > highestScore) highestScore = score;
    apple.hasBeenEaten();
    snake.head.add();
    clearInterval(game);
    game = setInterval(run, 1000 / gameSpeed);
  }
}

const snake = new Snake();
const apple = new randomFood();

var game = setInterval(run, 1000 / gameSpeed);

window.addEventListener('keydown', function(evt) {
  if(evt.keyCode > 36 && evt.keyCode < 41) evt.preventDefault();
  if(evt.keyCode === KEY_LEFT) return snake.left();
  if(evt.keyCode === KEY_RIGHT) return snake.right();
  if(evt.keyCode === KEY_DOWN) return snake.down();
  if(evt.keyCode === KEY_UP) return snake.up();
});

window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         function (callback) {
           window.setTimeout(callback, 17);
         };
}());
})();





// var canvas = document.getElementById('canvas')
// var ctx = canvas.getContext('2d');
// var w      = 520;
// var h      = 520;
// var score  = 0;
// var snake;
// var snakeSize = 10;

// // snake body (3px)
// // 1) pixel added when it eats snake food
// // 2) it moves in constantly
// // 3) it starts from right-down

// var drawModule = (function() {

//   var SnakeBody = function(x, y) {
//     ctx.fillStyle = 'green';
//     ctx.fillRect(0, 0, w, h);
//     ctx.strokeStyle = '#fff';
//     ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
//   }

//   var SnakeFood = function(x, y){
//     ctx.fillStyle = 'red';
//     ctx.fillRect(x * snakeSize+1, y * snakeSize+1, snakeSize-2, snakeSize-2)
//   }

//   var drawSnake = function() {
//     var length = 3;
//     snake = [];

//     for(var i = length; i>=0; i--) {
//       snake.push({x:i, y:0})
//     }
//   }

//   var scoreText = function() {
//     var score_text = "Score : " + score;
//     ctx.fillStyle = 'blue';
//     ctx.fillText(score_text, 145, h-5)
//   }
//   // snake food : randomly make on the canvas when snake eats it
//   var createFood = function() {
//     food = {
//       x: Math.floor((Math.random() * 30) + 1),
//       y: Math.floor((Math.random() * 30) + 1)
//     }
//     for(var i = 0; i > snake.length; i++) {
//       var snakeX = snake[i].x;
//       var snakeY = snake[i].y;

//       if(food.x === snakeX || food.y === snakeY ||
//          food.y === snakeY && food.x === snakeX) {
//            food.x = Math.floor((Math.random()) * 30 + 1 )
//            food.y = Math.floor((Math.random()) * 30 + 1 )
//          }
//     }
//   }

//   // Check if snake crash on body itself
//   var checkCollision = function(x, y, array) {
//     for(var i = 0; i < array.length; i++) {
//       if(array[i].x === x && array[i].y === y)
//       return true;
//     }
//     return false;
//   }

//   // Main function
//   var print = function() {
//     ctx.fillStyle = "lightgrey"
//     ctx.fillRect(0, 0, w, h)

//     ctx.strokeStyle = 'black'
//     ctx.strokeRect(0, 0, w, h);

//     var snakeX = snake[0].x;
//     var snakeY = snake[0].y;

//     if(direction == 'right') {
//       snakeX ++;
//     } else if (direction == 'left') {
//       snakeX --;
//     } else if (direction == 'up') {
//       snakeY ++;
//     } else if (direction == 'down') {
//       snakeY --;
//     }
//   }

//   // If snake crash on the borders
//   if(snakeX == -1 || snakeX / w * snakeSize ||
//      snakeY == -1 || snakeY / h * snakeSize ||
//      checkCollision(snakeX, snakeY, snake)) {

//     // stop game
//     // 초기화
//     ctx.fillRect(0, 0, w, h);
//     gameloop = clearInterval(gameloop);
//     return;
//   }

//   if(snakeX == food.x && snakeY == food.y) {
//     var tail = {
//       x : snakeX,
//       y : snakeY
//     }
//     createFood();
//   } else {
//     // pop out the last cell
//     var tail = snake.pop();
//     tail.x = snakeX;
//     tail.y = snakeY;
//   }
//   snake.unshift(tail);

//   // For each element of the array create a square
//   // using the bodySnake function we created before.

//   for(var i=0; i<snake.length; i++) {
//     bodySnake(snake[i].x, snake[i].y)
//   }

//   SnakeFood(food.x, food.y);
//   scoreText();
// })