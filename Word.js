class Word {
	constructor(word) {
		this.word = word;
		this.wordSize = 20 + Math.random() * 50;

		this.speedX = 0;
		this.speedY = 2;

		this.x = 200 + Math.random() * ((new p5).displayWidth - 300);
		this.y = 0;
	}
	get firstLetter() {
		return this.word.charAt(0);
	}

	display() {
		textSize(this.wordSize);
		text(this.word, this.x, this.y);
	}

	update(keyPressed) {
		this.x += this.speedX;
		this.y += this.speedY;
		if (keyPressed) this.word = this.word.slice(1);
	}
}
