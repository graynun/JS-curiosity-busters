export default class Snake {
	constructor({gameManager, initialLength, initialHeadPositionX, initialHeadPositionY}) {
		this.length = initialLength,
		this.velocity = 500,
		this.direction = 'left';

		this.bodyPositionArray = [];

		this.gameManager = gameManager;
	
		this._initialize(initialHeadPositionX, initialHeadPositionY);
	}

	_initialize(initialHeadPositionX, initialHeadPositionY) {
		for (let i = 0; i < this.length; i++) {
			this.bodyPositionArray.push([initialHeadPositionX + i, initialHeadPositionY]);
			this.gameManager.makeGridSnake(initialHeadPositionX + i, initialHeadPositionY);
		}
	}

	setDirection(direction) {
		if (!['up', 'down', 'left', 'right'].includes(direction)) throw new Error('not allowed direction');
		this.direction = direction;
	}

	isPossibleToMove() {
		let nextHead = this._calculateNextHead();
		if (this.gameManager.checkIfNextGridIsAvailable(nextHead[0], nextHead[1])) {
			return true;
		} else {
			return false;
		}
	}

	moveForward() {
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
		case 'right':
			return [headPosition[0] + 1, headPosition[1]];
		case 'up':
			return [headPosition[0], headPosition[1] - 1];
		case 'down':
			return [headPosition[0], headPosition[1] + 1];
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