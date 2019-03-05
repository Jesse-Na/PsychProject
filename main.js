let fallingWords = [];
function setup() {
	createCanvas(displayWidth, displayHeight);

}
function draw() {
	background(255);
	fallingWords.forEach((word) => {
		word.display();
	//	word.update();
});
addWords(fallingWords);
}
function mousePressed() {
	n.update(true);
}
function keyPressed() {
	console.log(n.firstLetter.charCodeAt(0));
	if (n.firstLetter.charCodeAt(0) - 32 == keyCode) {
		n.update(true);
	}
}
function addWords(wordsArray) {
	wordsArray.push(new Word("jesse"));
}
