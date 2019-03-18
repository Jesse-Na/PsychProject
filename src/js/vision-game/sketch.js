var startVT = false;//start vision test
var beginning = true;

//Vision Test
var targets = [];
var time1; //overall game timer
var time2; //reaction timer
var initTime; //start time
var prevTime; //game time of the previous frame
var tbc = []; //time between circles
var r;

let width, height;
let endScreen = false;

function setup() {
  width = displayWidth-100;
  height = displayHeight-200;
	let cnv = createCanvas(width, height);
  prevTime = millis();
  for (let i = 0; i < 16; i++) {
		for (let j = 0; j < 3; j++) {
          targets[i] = new Target(width/3+j*(width/6), height/5);
          i++;
		}
		for (let j = 0; j < 5; j++) {
			targets[i] = new Target(width/6+j*(width/6), 2*height/5);
          i++;
		}
		for (let j = 0; j < 5; j++) {
			targets[i] = new Target(width/6+j*(width/6), 3*height/5);
          i++;
		}
		for (let j = 0; j < 3; j++) {
			targets[i] = new Target(width/3+j*(width/6), 4*height/5);
          i++;
		}
	}
}

function draw() {
  stroke(0);
  textAlign(CENTER);

  if (!startVT) startScreen();


	if (startVT) {
      time1 = millis() - initTime;
      displayTime(time1);
      time2 = millis()  - prevTime;
      if (beginning) {
          visionTest(time2);
      }
  } else if (endScreen) {
      vtOver();}
  // } else {
  //   startScreen();
  // }
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
}

function keyPressed() {
    if (beginning) {
        if (keyCode === ENTER) {
            initTime = millis();
            startVT = true;
        }
    } else if (!beginning) {
        if (keyCode === ENTER) {
            tbc = [];
            beginning = true;
        }
    }
    if (keyCode === ENTER) {
        startVT = true;
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
    endScreen = true;
    startVT = false;
    beginning = false;
  } else {
    fill(255);
    noStroke();
    rect(width-150, 0, 150, 100);
    textSize(30);
    stroke(0);
    strokeWeight(1);
    fill(0);
    text("Time: " + (10-Math.floor(time/1000)), width-75, 50);
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
  text(`Your reaction time was ${int(Math.floor(avgTime))} ms`, width/2, height/3);
  text("Press 'Enter' to reset", width/2, 2*height/3);
  startVT = false;
}
