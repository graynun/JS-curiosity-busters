class GridManager {
	constructor(width, height, dom) {
		this.width = width,
		this.height = height,
		this.dom = dom;

		this.gridArr = [];

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

	makeGridSnake(x, y) {
		let selectedGrid = this.dom.querySelector('.r' + y).querySelector('.c' + x);
		selectedGrid.classList.add('snake');	
	}

	makeGridNotSnake(x, y) {
		let selectedGrid = this.dom.querySelector('.r' + y).querySelector('.c' + x);
		selectedGrid.classList.remove('snake');	
	}

}




class Snake {
	constructor(gridManager, initialLength, initialHeadPositionX, initialHeadPositionY) {
		this.length = initialLength,
		this.velocity = 500,
		this.direction = 'left';

		this.bodyPositionArray = [];

		this.gridManager = gridManager;
	
		this._initialize(initialHeadPositionX, initialHeadPositionY);
	}


	_initialize(initialHeadPositionX, initialHeadPositionY) {
		for (let i = 0; i < this.length; i++) {
			this.bodyPositionArray.push([initialHeadPositionX + i, initialHeadPositionY]);
			this.gridManager.makeGridSnake(initialHeadPositionX + i, initialHeadPositionY);
		}

		this._startMoving();
	}

	_startMoving() {
		setTimeout(() => {
			this._moveForward();
			this._startMoving();
		}, this.velocity);
	}

	_moveForward() {
		this._addHead();
		this._removeTail();
	}

	_addHead() {
		let head = this.bodyPositionArray[0];
		let nextHead = this._calculateNextHead(head),
		nextHeadX = nextHead[0],
		nextHeadY = nextHead[1];

		this.bodyPositionArray.unshift(nextHead);
		this.gridManager.makeGridSnake(nextHeadX, nextHeadY);
	}

	_calculateNextHead(headPosition) {
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

	_removeTail() {
		let tail = this.bodyPositionArray.pop(),
		tailX = tail[0],
		tailY = tail[1];

		this.gridManager.makeGridNotSnake(tailX, tailY);
	}
}