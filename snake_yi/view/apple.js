export default class Apple {
	constructor(grid) {
		this.x = grid[0],
		this.y = grid[1];
	}

	currentPosition() {
		return [this.x, this.y];
	}

	setGridApple(grid) {
		this.x = grid[0];
		this.y = grid[1];
	}

	isGridApple(grid) {
		return this.x === grid[0] && this.y === grid[1];
	}
}
