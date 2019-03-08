var start = false;
var beginning = true;
var fs = false; //controls fullscreen
var targets = [];
var time1; //overall game timer
var time2; //reaction timer
var initTime; //start time
var prevTime; //game time of the previous frame
var tbc = []; //time between circles
var r;

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
	if (windowWidth != displayWidth || windowHeight != displayHeight){
    reset();
	} else {
		start = true;
	}
	if (start) {
    time1 = millis() - initTime;
    displayTime(time1);
    time2 = millis()  - prevTime;
    if (beginning) {
        visionTest(time2);
    }
	} 
}

function mousePressed() {
	if (start) {
        for (let i = 0; i < 16; i++) {
            if (targets[r].hitbox(mouseX, mouseY)) {
                visionTest();
                append(tbc, time2);         
            }        
        }
	}
}

function keyPressed() {
  if (!fs) {
      if (keyCode === ENTER) {
          fullscreen(1);
          initTime = millis();
          fs = true;        
      }  
  } else if (fs) {
      if (keyCode === ENTER) {
          fullscreen(0);
          tbc = [];
          fs = false;     
      }
  }
}

function visionTest() {
  beginning = false;
  prevTime = millis();
  background(255);
  strokeWeight(5);
  r = int(random(16));
  for (let i = 0; i < 16; i++) {
      if (i !== r) {
          targets[i].display();
      }
  }
  targets[r].lightUp();
}

function reset() {
  noFill();
  background(255);
  strokeWeight(1);
  textSize(10);
  text("Press 'Enter' to start", windowWidth/2, windowHeight/2);
  start = false;
  beginning = true;
}

function displayTime(t) {
  let time = t;
  if (time >= 10000) {
    gameOver();
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

function gameOver() {
  var avgTime;
  var total = 0;
  for (let i = 0; i < tbc.length; i++) {
    total = total + tbc[i];
    avgTime = total/tbc.length;
  }
  background(255);
  fill(0);
  strokeWeight(1);
  textSize(10);
  text(int(Math.floor(avgTime)) + "ms", windowWidth/2, windowHeight/2);
}