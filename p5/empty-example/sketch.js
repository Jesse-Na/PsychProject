var start = false;
var doingVT = false;
var circles = [[]];

function setup() {
	let cnv = createCanvas(displayWidth, displayHeight);
	cnv.style('display', 'block');
}

function draw() {
	background(255);
	noFill();
	textAlign(CENTER);
	stroke(0);
	if (windowWidth != displayWidth || windowHeight != displayHeight){
		text('Press F11 to begin', windowWidth/2, windowHeight/2);
	} else {
		start = true;
	}
  	if (start) {
  		visionTest(windowWidth, windowHeight);
  	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	if (doingVT) {

	}
}

function keyPressed() {
    if (!start) {
        if (keyCode === ENTER) {
            fullscreen(1);        
        }  
    }
}

function visionTest(windowWidth, windowHeight) {
	let width = windowWidth;
	let height = windowHeight;
	doingVT = true;
	background(255);
  	strokeWeight(5);
  	for (let i = 0; i < 16; i++) {
  		for (let j = 0; j < 3; j++) {
  			//append(windowWidth/3+j*(windowWidth/6), windowHeight/5);
  			circle(windowWidth/3+j*(windowWidth/6), windowHeight/5, 50);
  		}
  		for (let j = 0; j < 5; j++) {
  			//append(windowWidth/6+j*(windowWidth/6), 2*windowHeight/5);
  			circle(windowWidth/6+j*(windowWidth/6), 2*windowHeight/5, 50);
  		}
  		for (let j = 0; j < 5; j++) {
  			//append()
  			circle(windowWidth/6+j*(windowWidth/6), 3*windowHeight/5, 50);
  		}
  		for (let j = 0; j < 3; j++) {
  			circle(windowWidth/3+j*(windowWidth/6), 4*windowHeight/5, 50);
  		}
  	}
  	
}
