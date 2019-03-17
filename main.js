let fallingWords;
let score = 0;
let scoreRed, scoreGreen, scoreBlue = 0;

let height, width;

function setup() {
	width = displayWidth - 100;
	height = displayHeight - 200;
	createCanvas(width, height);
	fallingWords = [];
}
function draw() {
	background(255);
	fill(scoreRed, scoreGreen, scoreBlue);
	scoreRed = 0;
	scoreGreen = 0;
	scoreBlue = 0;

	textSize(50);
	text(`Score: ${score}`, width/100, height/15);

 	fallingWords.forEach((word) => {
 		word.display();
 		word.update();
  });
	if (fallingWords[0]) {
	 if (fallingWords[0].y > height) {
		 fallingWords.shift();
		 score -= 50;
	  };
	}
	if (frameCount % 100 == 0) addWords();
	}
 function addWords() {
	 fallingWords.push(new Word(randomWord(), width));
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

		score--;
	}
}
