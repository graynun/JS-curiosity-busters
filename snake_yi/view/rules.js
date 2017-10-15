import GridDomManager from './gridDomManager.js';
import Snake from './snake.js';

const directionMap = {
	'up': ['left', 'right'],
	'down': ['left', 'right'],
	'left': ['up', 'down'],
	'right': ['up', 'down']
};

export default class GameManager {
	constructor(width, height, dom) {
		this.width = width,
		this.height = height;

		this.gridDomManager = new GridDomManager(this.width, this.height, dom);
		this.snake;

		this.snakeDirection = 'left';
	}

	startGame() {
		this.snake = new Snake({
			gameManager: this,
			initialLength: 3,
			initialHeadPositionX: this.width - 3,
			initialHeadPositionY: this.height - 1
		});

		this._addKeyboardEventListener();
		this._startSnakeMove();
	}

	_addKeyboardEventListener() {
		window.addEventListener('keydown', e => {
			if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
				// console.log(e.key);
				this._changeSnakeDirection(e.key.slice(5).toLowerCase());
			}
		});
	}

	_changeSnakeDirection(direction) {
		if (this._isDirectionApplicable(direction)) {
			this.snakeDirection = direction;
		}
	}

	_isDirectionApplicable(direction) {
		return directionMap[this.snakeDirection].includes(direction);
	}

	_calculateSnakeNextHead(currentSnakeHead) {
		let headPosition = currentSnakeHead;

		switch (this.snakeDirection) {
		case 'left':
			return [headPosition[0] - 1, headPosition[1]];
		case 'right':
			return [headPosition[0] + 1, headPosition[1]];
		case 'up':
			return [headPosition[0], headPosition[1] - 1];
		case 'down':
			return [headPosition[0], headPosition[1] + 1];
		}
	}

	_isSnakePossibleToMove() {
		let currentSnakeHeadPosition = this.snake.getCurrentHead();
		let nextHead = this._calculateSnakeNextHead(currentSnakeHeadPosition);

		return this.isNextGridIsAvailable(nextHead);
	}

	_moveSnakeForward() {
		let currentSnakeHeadPosition = this.snake.getCurrentHead();
		let nextHead = this._calculateSnakeNextHead(currentSnakeHeadPosition);

		let snakeTail = this.snake.getCurrentTail();

		this.snake.addHead(nextHead);
		this.makeGridSnake(nextHead);
		this.snake.removeTail(snakeTail);
		this.makeGridNotSnake(snakeTail);
	}

	endGame() {
		let endPopup = document.createElement('div');
		endPopup.classList.add('endPopup');
		endPopup.innerText = 'Game Over';
		document.querySelector('body').append(endPopup);
		this.stopSnakeMove();
	}

	_startSnakeMove() {
		this.timeoutId = setInterval(() => {
			// if (this.snake.isPossibleToMove()) {
			if (this._isSnakePossibleToMove()) {
				// this.snake.moveForward();
				this._moveSnakeForward();
			} else {
				this.endGame();
			}
		}, this.snake.velocity);
	}

	stopSnakeMove() {
		clearInterval(this.timeoutId);	
	}

	makeGridSnake(gridPosition) {
		this.gridDomManager.makeGridSnake(gridPosition[0], gridPosition[1]);
	}

	makeGridNotSnake(gridPosition) {
		this.gridDomManager.makeGridNotSnake(gridPosition[0], gridPosition[1]);
	}

	makeGridApple(x, y) {
		this.gridDomManager.makeGridApple(x, y);
	}

	makeGridNotApple(x, y) {
		this.gridDomManager.makeGridNotApple(x, y);
	}

	isNextGridIsAvailable(nextHead) {
		if (nextHead[0] < 0) return false;
		if (nextHead[0] >= this.width) return false;
		if (nextHead[1] < 0) return false;
		if (nextHead[1] >= this.height) return false;

		let isNextGridSnakeBody = this.snake.bodyPositionArray.some((grid) => {
			return grid[0] === nextHead[0] && grid[1] === nextHead[1];
		});

		return isNextGridSnakeBody;
	}
}