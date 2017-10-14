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

		this._addKeyboardEventListener();
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
			this.snake.setDirection(direction);
		}
	}

	// 뱀의 방향을 게임매니져만 들게 하는 것이 나을까? 이렇게 할거라면 _calculateNextHead도 게임매니져가 들고 있어야만 한다
	_isDirectionApplicable(direction) {
		return directionMap[this.snake.direction].includes(direction);
	}

	startGame() {
		this.snake = new Snake({
			gameManager: this,
			initialLength: 3,
			initialHeadPositionX: this.width - 3,
			initialHeadPositionY: this.height - 1
		});

		this.startSnakeMove();
	}

	endGame() {
		let endPopup = document.createElement('div');
		endPopup.classList.add('endPopup');
		endPopup.innerText = 'Game Over';
		document.querySelector('body').append(endPopup);
		this.stopSnakeMove();
	}

	startSnakeMove() {
		this.timeoutId = setInterval(() => {
			if (this.snake.isPossibleToMove()) {
				this.snake.moveForward();
			} else {
				this.endGame();
			}
		}, this.snake.velocity);
	}

	stopSnakeMove() {
		clearInterval(this.timeoutId);	
	}

	makeGridSnake(x, y) {
		this.gridDomManager.makeGridSnake(x, y);
	}

	makeGridNotSnake(x, y) {
		this.gridDomManager.makeGridNotSnake(x, y);
	}

	makeGridApple(x, y) {
		this.gridDomManager.makeGridApple(x, y);
	}

	makeGridNotApple(x, y) {
		this.gridDomManager.makeGridNotApple(x, y);
	}

	checkIfNextGridIsAvailable(x, y) {
		return (x >= 0 && x < this.width && y >= 0 && y < this.height);
	}
}