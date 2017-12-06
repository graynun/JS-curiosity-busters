export default class Snake {
	constructor({gameManager, initialLength, initialHeadPositionX, initialHeadPositionY}) {
		this.length = initialLength,
		this.velocity = 500,

		this.bodyPositionArray = [];

		this.gameManager = gameManager;
	
		this._initialize(initialHeadPositionX, initialHeadPositionY);
	}

	_initialize(initialHeadPositionX, initialHeadPositionY) {
		for (let i = 0; i < this.length; i++) {
			this.bodyPositionArray.push([initialHeadPositionX + i, initialHeadPositionY]);
			this.gameManager.makeGridSnake([initialHeadPositionX + i, initialHeadPositionY]);
		}
	}

	addHead(nextHead) {
		this._makeHead(nextHead);
	}

	getCurrentHead() {
		return this.bodyPositionArray[0];
	}

	getCurrentTail() {
		return this.bodyPositionArray[this.bodyPositionArray.length - 1];
	}

	_makeHead(nextHead) {
		this.gameManager.makeGridNotHead(this.getCurrentHead());
		this.gameManager.makeGridHead(nextHead);
		this.bodyPositionArray.unshift(nextHead);
	}

	removeTail(snakeTail) {
		this.bodyPositionArray = this.bodyPositionArray.filter(v => v !== snakeTail);
	}

	isGridSnake(grid) {
		return this.bodyPositionArray.some(bodyGrid => bodyGrid[0] === grid[0] && bodyGrid[1] === grid[1]);
	}
}