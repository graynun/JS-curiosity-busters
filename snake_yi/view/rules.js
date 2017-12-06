import GridDomManager from './gridDomManager.js';
import Snake from './snake.js';
import Apple from './apple.js';

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
		this.apple;

		this.snakeDirection = 'left';

		this.snakeMovedSinceChangeDirection = true;
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
		this._makeAppleGrid();
	}

	_addKeyboardEventListener() {
		window.addEventListener('keydown', e => {
			if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
				if (this.snakeMovedSinceChangeDirection) {
					this._changeSnakeDirection(e.key.slice(5).toLowerCase());	
				}
			}
		});
	}

	_changeSnakeDirection(direction) {
		if (this._isDirectionApplicable(direction)) {
			this.snakeDirection = direction;
			this.snakeMovedSinceChangeDirection = false;
			// this._moveSnakeForward();
		}
	}

	_isDirectionApplicable(direction) {
		return directionMap[this.snakeDirection].includes(direction);
	}

	_calculateSnakeNextHead(currentSnakeHead) {
		const headPosition = currentSnakeHead;

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
		const currentSnakeHeadPosition = this.snake.getCurrentHead();
		const nextHead = this._calculateSnakeNextHead(currentSnakeHeadPosition);

		return this.isNextGridIsAvailable(nextHead);
	}

	_moveSnakeForward() {
		const currentSnakeHeadPosition = this.snake.getCurrentHead();
		const nextHead = this._calculateSnakeNextHead(currentSnakeHeadPosition);

		const snakeTail = this.snake.getCurrentTail();

		this.snake.addHead(nextHead);
		this.makeGridSnake(nextHead);
		this.snake.removeTail(snakeTail);
		this.makeGridNotSnake(snakeTail);

		this.snakeMovedSinceChangeDirection = true;
	}

	endGame() {
		let endPopup = document.createElement('div');
		endPopup.classList.add('endPopup');
		endPopup.innerText = 'Game Over';
		document.querySelector('body').append(endPopup);
		this.stopSnakeMove();
	}

	_makeAppleGrid() {
		const pickedGrid = this._pickRandomGrid();
		if (this._checkGridAvailable(pickedGrid)) {
			this.makeGridApple(this._pickRandomGrid());
		} else {
			this._makeAppleGrid();
		}
	}

	_checkGridAvailable(grid) {
		if (this.apple) {
			return !this.apple.isGridApple(grid) && !this.snake.isGridSnake(grid);
		} else {
			return !this.snake.isGridSnake(grid);
		}	
	}

	_pickRandomGrid() {
		const randomWidth = Math.floor(Math.random() * this.width),
			randomHeight = Math.floor(Math.random() * this.height);
		return [randomWidth, randomHeight];
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

	makeGridHead(nextHead) {
		this.gridDomManager.makeGridHead(nextHead[0], nextHead[1]);
	}

	makeGridNotHead(nextHead) {
		this.gridDomManager.makeGridNotHead(nextHead[0], nextHead[1]);
	}	

	makeGridApple(grid) {
		this.gridDomManager.makeGridApple(grid[0], grid[1]);
		if (!this.apple)
			this.apple = new Apple(grid);
		else
			this.apple.setGridApple(grid);
	}

	makeGridNotApple(x, y) {
		this.gridDomManager.makeGridNotApple(x, y);
	}

	isNextGridIsAvailable(nextHead) {
		// console.log("currentHead?");
		// console.log(this.snake.getCurrentHead());

		// console.log('nextHead?');
		// console.log(nextHead);
		if (nextHead[0] < 0) return false;
		if (nextHead[0] >= this.width) return false;
		if (nextHead[1] < 0) return false;
		if (nextHead[1] >= this.height) return false;

		const isNextGridSnakeBody = this.snake.bodyPositionArray.some((grid) => {
			return grid[0] === nextHead[0] && grid[1] === nextHead[1];
		});

		return !isNextGridSnakeBody;
	}
}