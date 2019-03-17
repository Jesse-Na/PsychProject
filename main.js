let fallingWords;
let score = 0;
function setup() {
	createCanvas(displayWidth, displayHeight);
	fallingWords = [];
}
function draw() {
	background(255);
	fill(0, 0, 0);
	textSize(50);
	text(`Score: ${score}`, displayWidth/100, displayHeight/15);

 	fallingWords.forEach((word) => {
 		word.display();
 		word.update();
  });
	if (fallingWords[0]) {
	 if (fallingWords[0].y > displayHeight) {fallingWords.shift()};
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
		fallingWords[0].g = 255;
		fallingWords[0].r = 0;
		
		if (fallingWords[0].length() == 0) {
			fallingWords.shift();
			score += 100;
		}
	} else {
		fallingWords[0].r = 255;
		fallingWords[0].g = 0;
	}
}
