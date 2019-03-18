var startMG = true;//start mouse game

//Mouse Game
var score = 0;
var lives = 3;
var rocks = [];
var totalRocks = 10;

let width, height;

function setup() {
	width = displayWidth - 100;
	height = displayHeight - 300;
	let cnv = createCanvas(width, height);
	//cnv.style('display', 'block');
}

function draw() {
	if (startMG) {
		mouseGame();
	}
}
function keyPressed() {
    if (!startMG) {
        if (keyCode === ENTER) {
            startMG = true;
        }
    }
}
function mouseGame() {
  background(255);
  fill(0);
  if (lives < 0) {
    mgOver();
  } else {
	  if (rocks.length < totalRocks) {
	    append(rocks, new Rock());
	  }
	  for (let i = 0; i < rocks.length; i++) {
	    rocks[i].fall();
	    if (rocks[i].dead()) {
	      //rocks.splice(i, 1);
				rocks[i] = new Rock();
	    }
	    if (rocks[i].hitbox(mouseX, mouseY)) {
	      lives -= 1;
	    }
	  }
	  score++;
	  circle(mouseX, mouseY, 10);
	}
}
function mgOver() {
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
