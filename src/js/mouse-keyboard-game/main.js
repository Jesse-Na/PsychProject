var startMG = true;//start mouse game

//Mouse Game
var score = 0;
var lives = 3;
var rocks = [];
var totalRocks = 5;

let width, height;

let fallingWords;
let typingScore = 0;
let scoreRed, scoreGreen, scoreBlue = 0;

let mistakes = 3;

let typingHeight, typingWidth;

let screen = 0;

let gameTime = 60;
let previousTime;

function setup() {
  width = displayWidth - 100;
  height = displayHeight - 300;
  let cnv = createCanvas(width, height);
  //cnv.style('display', 'block');

  typingWidth = displayWidth/2/2 - 50;
  typingHeight = displayHeight - 300;
  //createCanvas(typingWidth, typingHeight);
  fallingWords = [];
}
function draw() {
  background(255);
  switch (screen) {
    case 0:
      informationScreen();
      break;
    case 1:
      game();
      mouseGame();
      break;
    case 2:
      endScreen();
      break;
  }
}
function keyPressed() {
    if (!startMG) {
        startMG = true;
    }
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
          typingScore += 1000;
        }
      } else {
        fallingWords[0].r = 255;
        fallingWords[0].g = 0;

        typingScore--;
      }
    }
}
function mouseGame() {
  //background(255);
  fill(0);
  if (lives < 0) {
    screen++;
  } else {
	  if (rocks.length < totalRocks) {
	    append(rocks, new Rock(width, map(gameTime, 60, 0, 10, 30)));
	  }
	  for (let i = 0; i < rocks.length; i++) {
	    rocks[i].fall();
	    if (rocks[i].dead()) {
				rocks[i] = new Rock(width, map(gameTime, 60, 0, 10, 30));
	    }
	    if (rocks[i].hitbox(mouseX, mouseY)) {
	      lives -= 1;
	    }
	  }
	  score+= 1;
	  circle(mouseX, mouseY, 10);
	}
}
function gameOver() {
  background(255);
  fill(0);
  strokeWeight(1);
  textSize(20);

  text("Game Over", width/2, height/3);
  text("Score: " + score, width/2, 2*height/3);
  textSize(10);
  text("Press 'Enter' to reset", width/2, 3*height/4);
  rocks = [];
  lives = 3;
  score = 0;
  startMG = false;
}
function informationScreen() {
	background(255);
	textSize(30);
	textAlign(CENTER);
	text(`
				Hey, welcome to the combined typing and mouse game!

				The objective of the game is to avoid the rocks, WHILE typing the words
				before they fall off the screen.

				You are scored based on how long you avoid the rocks, and the accuracy of your typing.

				Try to survive as long as possible. Good luck!

				Press any key to continue.
				`, width/2, typingHeight/6);
}
function endScreen() {
	background(255);
	textSize(30);
	textAlign(CENTER);
	text(`
				You scored a total of ${typingScore+score} points across both games!

				Click the screen to play again.`, width/2, typingHeight/6);
}
function game() {
	textAlign(LEFT);
	//background(255);
	fill(scoreRed, scoreGreen, scoreBlue);
	scoreRed = 0;
	scoreGreen = 0;
	scoreBlue = 0;

	if (previousTime != second()) {
		gameTime--;
		previousTime = second();
	}
	textSize(30);
	text(`Score: ${typingScore + score}`, typingWidth/100, typingHeight/15);
	text(`Time: ${gameTime}`, typingWidth/100, 2.2*typingHeight/15);
	text(`Mistakes: ${mistakes}`, typingWidth/100, 3.4*typingHeight/15);
	if (gameTime < 1 || mistakes <= 0) {
		screen++;
	}
	//console.log(currentTime);

	fallingWords.forEach((word) => {
		word.display();
		word.update();
	});
	if (fallingWords[0]) {
	 if (fallingWords[0].y > typingHeight) {
		 fallingWords.shift();
		 typingScore -= 50;
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
 function mousePressed() {
 	if (screen == 2) {
 		screen--;
 		gameTime = 60;
 		typingScore = 0;
    score = 0;
 		mistakes = 3;
 		fallingWords = []

    startMG = true;
    lives = 3;
    rocks = [];
 	}
 }
