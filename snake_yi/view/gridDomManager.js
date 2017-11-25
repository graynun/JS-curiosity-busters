export default class GridDomManager {
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
		for (let y = 0; y < height; y++) {
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

	makeGridHead(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.add('head');		
	}

	makeGridNotHead(x, y) {
		let selectedGrid = this._findGridDom(x, y);
		selectedGrid.classList.remove('head');		
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
