let fallingWords;
function setup() {
	createCanvas(displayWidth, displayHeight);
	fallingWords = [];
	//fallingWords.push(new FallingWord());
}
function draw() {
	background(255);
 	fallingWords.forEach((word) => {
 		word.display();
 		word.update();
  });
	if (fallingWords[0]) {
	 if (fallingWords[0].y > displayHeight) {fallingWords.shift(); console.log('delete');};
	}
	if (frameCount % 100 == 0) addWords();
	}
 function addWords() {
	 fallingWords.push(new Word(randomWord(), displayWidth));
 }
 function randomWord() {
	 return hamletText[Math.floor(Math.random() * hamletText.length)].trim();
 }
function keyPressed() {
	if (fallingWords[0].word.charCodeAt(0) - 32 == keyCode) {
		fallingWords[0].update(true);
		if (fallingWords[0].length() == 0) fallingWords.shift();
	}
}
function mousePressed() {
	console.log(hamletText);
}
