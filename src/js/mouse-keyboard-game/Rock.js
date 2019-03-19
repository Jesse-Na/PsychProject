class Rock {
	constructor(displayWidth, speed) {
		let r = int(random(displayWidth));
		this.x = r;
		this.y = 0;
		this.diameter = 40;
		this.speed = speed;
	}
	hitbox (xVal, yVal) {
        if (xVal >= this.x - this.diameter && xVal <= this.x + this.diameter) {
            if (yVal >= this.y - this.diameter && yVal <= this.y + this.diameter) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    fall () {
    	this.y += this.speed;
    	fill(0);
    	circle(this.x, this.y, this.diameter);
    }
    dead () {
    	if (this.y >= displayHeight) {
    		return true;
    	}
    	return false;
    }
}
