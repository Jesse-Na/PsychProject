function Word(word, displayWidth) {
	this.word = word.toLowerCase();
	this.wordSize = 20 + Math.random() * 50;

	this.speedX = 0;
	this.speedY = 2;

	this.x = 200 + Math.random() * (displayWidth - 300) || 200;
	this.y = 0;

	this.length = function() {
		return this.word.length;
	}

	this.firstLetter = function() {
		return this.word.charAt(0);
	}

	this.display = function() {
		textSize(this.wordSize);
		text(this.word, this.x, this.y);
	}

	this.update = function(keyPressed) {
		this.x += this.speedX;
		this.y += this.speedY;
		if (keyPressed) this.word = this.word.slice(1);
	}
}
