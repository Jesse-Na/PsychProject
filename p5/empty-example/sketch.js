var start = false;
var beginning = true;
var fs = false; //controls fullscreen
var targets = [];
var time; //game time
var initTime; //game time of previous frame
var tbc = []; //time between circles
var r;

function setup() {
	let cnv = createCanvas(displayWidth, displayHeight);
	cnv.style('display', 'block');
    //initTime = millis();
    //time = millis();
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
	if (windowWidth != displayWidth || windowHeight != displayHeight){
	    noFill();
	    textAlign(CENTER);
	    stroke(0);
        background(255);
		text("Press 'Enter' to start", windowWidth/2, windowHeight/2);
        start = false;
	} else {
		start = true;
	}
  	if (start) {
//        time = millis() - initTime;
        if (beginning) {
            visionTest();
            beginning = false;
        }
  	}
}

function mousePressed() {
	if (start) {
        for (let i = 0; i < 16; i++) {
            if (targets[r].hitbox(mouseX, mouseY)) {
                visionTest();
                //initTime = millis();
                //append(tbc, time);         
            }        
        }
	}
}

function keyPressed() {
    if (!fs) {
        if (keyCode === ENTER) {
            fullscreen(1);
            fs = true;        
        }  
    } else if (fs) {
        if (keyCode === ENTER) {
            fullscreen(0);
            fs = false;        
        }
    }
}

function visionTest() {
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
