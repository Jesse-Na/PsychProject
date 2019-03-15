var startVT = false;//start vision test
var startMG = false;//start mouse game
var beginning = true;
var fs = false; //controls fullscreen

//Vision Test
var targets = [];
var time1; //overall game timer
var time2; //reaction timer
var initTime; //start time
var prevTime; //game time of the previous frame
var tbc = []; //time between circles
var r;

//Mouse Game
var score = 0;
var lives = 3;
var rocks = [];
var totalRocks = 10;

function setup() {
	let cnv = createCanvas(displayWidth, displayHeight);
	cnv.style('display', 'block');
  prevTime = millis();
  for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 3; j++) {
          targets[i] = new Target(displayWidth/3+j*(displayWidth/6), displayHeight/5);
          i++;
		}
		for (let j = 0; j < 5; j++) {
			targets[i] = new Target(displayWidth/6+j*(displayWidth/6), 2*displayHeight/5);
          i++;
		}
		for (let j = 0; j < 5; j++) {
			targets[i] = new Target(displayWidth/6+j*(displayWidth/6), 3*displayHeight/5);
          i++;
		}
		for (let j = 0; j < 3; j++) {
			targets[i] = new Target(displayWidth/3+j*(displayWidth/6), 4*displayHeight/5);
          i++;
		}
	}
}

function draw() {
  stroke(0);
  textAlign(CENTER);
  if (!fs) {
  	startScreen();
	}
	if (startVT) {
        time1 = millis() - initTime;
        displayTime(time1);
        time2 = millis()  - prevTime;
        if (beginning) {
            visionTest(time2);
        }
    } else if (startMG) {
        mouseGame();
            
    }
}

function mousePressed() {
	if (startVT) {
    for (let i = 0; i < 16; i++) {
        if (targets[r].hitbox(mouseX, mouseY)) {
            visionTest();
            append(tbc, time2);         
        }        
    }
	}
  if (startMG) {
  }
}

function keyPressed() {
    if (beginning) {
        if (keyCode === ENTER) {          
            fullscreen(1);
            initTime = millis();
            fs = true;
            startVT = true;      
        }
    } else if (!beginning) {
        if (keyCode === ENTER) {
            fullscreen(0);
            tbc = [];
            fs = false;
            startScreen();   
        }
    }
    if (key === "b") {
        fullscreen(1);
        fs = true;
        startMG = true;
    }
}

function visionTest() {
  beginning = false;
  prevTime = millis();
  background(255);
  strokeWeight(5);
  noFill();
  r = int(random(16));
  for (let i = 0; i < 16; i++) {
      if (i !== r) {
          targets[i].display();
      }
  }
  targets[r].lightUp();
}

function mouseGame() {
  background(255);
  fill(0);
  if (lives === 0) {
    mgOver();
  }
  if (rocks.length < totalRocks) {
    append(rocks, new Rock());
  }
  for (let i = 0; i < rocks.length; i++) {
    rocks[i].fall();
    if (rocks[i].dead()) {
      rocks.splice(i, 1);
    }
    if (rocks[i].hitbox(mouseX, mouseY)) {
      lives -= 1;
    }
  }
  score++;
  circle(mouseX, mouseY, 10);
}

function startScreen() {
    fill(0);
    background(255);
    strokeWeight(1);
    textSize(20);
    text("Press 'Enter' to start", windowWidth/2, windowHeight/2);
    startVT = false;
    startMG = false;
    beginning = true;
}

function displayTime(t) {
  let time = t;
  if (time >= 10000) {
    vtOver();
  } else {
    fill(255);
    noStroke();
    rect(windowWidth-150, 0, 150, 100);
    textSize(30);
    stroke(0);
    strokeWeight(1);
    fill(0);
    text("Time: " + (10-Math.floor(time/1000)), windowWidth-75, 50);
  }
}

function vtOver() {
  var avgTime;
  var total = 0;
  for (let i = 0; i < tbc.length; i++) {
  total = total + tbc[i];
  avgTime = total/tbc.length;
  }
  background(255);
  fill(0);
  strokeWeight(1);
  textSize(20);
  text(int(Math.floor(avgTime)) + "ms", windowWidth/2, windowHeight/3);
  text("Press 'b' to continue", windowWidth/2, 2*windowHeight/3);
  startVT = false;
}

function mgOver() {
  background(255);
  fill(0);
  strokeWeight(1);
  textSize(20);

  text("Game Over", windowWidth/2, windowHeight/3);
  text("Score: " + score, windowWidth/2, 2*windowHeight/3);
  textSize(10);
  text("Press 'Enter' to reset", windowWidth/2, 3*windowHeight/4);
  rocks = [];
  lives = 3;
  score = 0;
  startMG = false;
}
