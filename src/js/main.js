let fallingWords;
let score = 0;
let scoreRed, scoreGreen, scoreBlue = 0;

let mistakes = 3;

let height, width;

let screen = 0;

let gameTime = 60;
let previousTime;

function setup() {
	width = displayWidth - 100;
	height = displayHeight - 300;
	createCanvas(width, height);
	fallingWords = [];
}
function draw() {
	switch (screen) {
		case 0:
			informationScreen();
			break;
		case 1:
			game();
			break;
		case 2:
			endScreen();
			break;
	}
}
function informationScreen() {
	background(255);
	textSize(30);
	textAlign(CENTER);
	text(`
				Hey, welcome to the typing game!

				The objective of the game is to type the words
				before they fall off the screen.

				You are scored based on the accuracy of your typing.

				You have 60 seconds and are allowed 3 missed words. Good luck!

				Press any key to continue.
				`, width/2, height/6);
}
function endScreen() {
	background(255);
	textSize(30);
	textAlign(CENTER);
	text(`
				You scored a total of ${score} points!

				Click the screen to play again.`, width/2, height/6);
}
function game() {
	console.log(second());
	textAlign(LEFT);
	background(255);
	fill(scoreRed, scoreGreen, scoreBlue);
	scoreRed = 0;
	scoreGreen = 0;
	scoreBlue = 0;

	if (previousTime != second()) {
		gameTime--;
		previousTime = second();
	}
	textSize(30);
	text(`Score: ${score}`, width/100, height/15);
	text(`Time: ${gameTime}`, width/100, 2.2*height/15);
	text(`Mistakes: ${mistakes}`, width/100, 3.4*height/15);
	if (gameTime < 1 || mistakes <= 0) {
		screen++;
	}
	//console.log(currentTime);

	fallingWords.forEach((word) => {
		word.display();
		word.update();
	});
	if (fallingWords[0]) {
	 if (fallingWords[0].y > height) {
		 fallingWords.shift();
		 score -= 50;
		 mistakes--;
		};
	}
	if (frameCount % 100 == 0) addWords();
}
 function addWords() {
	 fallingWords.push(new Word(randomWord(), width, map(gameTime, 60, 0, 0.5, 2)));
 }
 function randomWord() {
	 return hamletText[Math.floor(Math.random() * hamletText.length)].trim();
 }
function keyPressed() {
	if (screen == 0) {
		screen++;
		previousTime = second();
	} else if (screen == 1) {
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
}
function mousePressed() {
	if (screen == 2) {
		screen--;
		gameTime = 60;
		score = 0;
		mistakes = 3;
		fallingWords = []
	}
}
