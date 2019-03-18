class Target {
    constructor(xVal, yVal) {
        this.x = xVal;
        this.y = yVal;
        this.diameter = 50;
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
    lightUp () {
        fill(255, 0, 0);
        circle(this.x, this.y, this.diameter);
    }
    
    display() {
        noFill();
        circle(this.x, this.y, this.diameter);    
    }
}
