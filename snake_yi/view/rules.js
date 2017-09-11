class GameManager {
	constructor(width, height, dom) {
		this.width = width,
		this.height = height;

		this.gridDomManager = new GridDomManager(this.width, this.height, dom);

	}

	startGame() {
		this.snake = new Snake({
			gameManager: this,
			initialLength: 3,
			initialHeadPositionX: this.width - 3,
			initialHeadPositionY: this.height - 1
		});
	}

	endGame() {
		let endPopup = document.createElement('div');
		endPopup.classList.add('endPopup');
		endPopup.innerText = "Game Over";
		document.querySelector('body').append(endPopup);
		this.snake.stopMoving()
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

class GridDomManager{
	constructor(width, height, dom) {
		this.width = width,
		this.height = height;
		this.dom = dom;

		this._initialize();
	}

	_initialize() {
		this._generateGrid(this.width, this.height);
	}

	_generateGrid(width, height) {
		for(let y = 0; y < height; y++) {
			let tableRow = document.createElement('tr');
			tableRow.classList.add('r' + y);
			for (let x = 0; x < width; x++) {
				let gridDom = document.createElement('td');
				gridDom.classList.add('c' + x);
				tableRow.appendChild(gridDom);
			}
			this.dom.appendChild(tableRow);
		}
	}

	_findGridDom(x, y) {
		return this.dom.querySelector('.r' + y).querySelector('.c' + x);
	}

	makeGridSnake(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.add('snake');	
	}

	makeGridNotSnake(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.remove('snake');	
	}

	makeGridApple(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.add('apple');
	}

	makeGridNotApple(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.remove('apple');
	}
}




class Snake {
	constructor({gameManager, initialLength, initialHeadPositionX, initialHeadPositionY}) {
		this.length = initialLength,
		this.velocity = 500,
		this.direction = 'left';

		this.moveTimeOut;

		this.bodyPositionArray = [];

		this.gameManager = gameManager;
	
		this._initialize(initialHeadPositionX, initialHeadPositionY);
	}


	_initialize(initialHeadPositionX, initialHeadPositionY) {
		for (let i = 0; i < this.length; i++) {
			this.bodyPositionArray.push([initialHeadPositionX + i, initialHeadPositionY]);
			this.gameManager.makeGridSnake(initialHeadPositionX + i, initialHeadPositionY);
		}

		this._startMoving();
	}

	_startMoving() {
		// 이 부분을 뜯어서 gameManager로 옮겨야만 한다.....
		// setInterval 부르는 부분 자체를 gameManager로 옮겨야 할듯
		this.timeoutId = setInterval(() => {
			let nextHead = this._calculateNextHead();
			if (this.gameManager.checkIfNextGridIsAvailable(nextHead[0], nextHead[1])) {
				this._moveForward();
			} else {
				this.gameManager.endGame();
			}
		}, this.velocity);
	}

	stopMoving() {
		clearInterval(this.timeoutId);
	}

	_moveForward() {
		this._addHead();
		this._removeTail();
	}

	_addHead() {
		let head = this.bodyPositionArray[0];
		let nextHead = this._calculateNextHead(head);

		this._makeNextHead(nextHead);
	}

	_calculateNextHead() {
		let headPosition = this.bodyPositionArray[0];
		
		switch (this.direction) {
			case 'left':
				return [headPosition[0] - 1, headPosition[1]];
				break;
			case 'right':
				return [headPosition[0] + 1, headPosition[1]];
				break;
			case 'up':
				return [headPosition[0], headPosition[1] - 1];
				break;
			case 'down':
				return [headPosition[0], headPosition[1] + 1];
				break;
		}
	}

	_makeNextHead(nextHead) {
		this.bodyPositionArray.unshift(nextHead);
		this.gameManager.makeGridSnake(nextHead[0], nextHead[1]);
	}

	_removeTail() {
		let tail = this.bodyPositionArray.pop(),
		tailX = tail[0],
		tailY = tail[1];

		this.gameManager.makeGridNotSnake(tailX, tailY);
	}
}
