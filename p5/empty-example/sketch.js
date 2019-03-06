var start = false;
var doingVT = false;
var fs = false;
var targets = [];

function setup() {
	let cnv = createCanvas(displayWidth, displayHeight);
	cnv.style('display', 'block');
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
	noFill();
	textAlign(CENTER);
	stroke(0);
	if (windowWidth != displayWidth || windowHeight != displayHeight){
        background(255);
		text("Press 'Enter' to start", windowWidth/2, windowHeight/2);
	} else {
		start = true;
	}
  	if (start) {
  		visionTest();
  	}
}

function mousePressed() {
	if (doingVT) {

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
	doingVT = true;
	background(255);
  	strokeWeight(5);
    let r = int(random(16));
    print(r);
    targets[r].lightUp();
    for (let i = 0; i < 16; i++) {
        if (i !== r) {
            targets[i].display();
        }
    }
    
  	
}
