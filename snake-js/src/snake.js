let DIFF=10;//how the screen is divided into squares

class Snake{


    constructor() {
        this.x=[];
        this.y=[];
        this.numSegments=4;//start off with 4 length
        this.score=0;
        frameRate(15);
        this.direction=RIGHT_ARROW;
        for (let i = 0; i < this.numSegments; i++) {
            this.x.push(30 + (i * DIFF));//0 is where snake starts on x
            this.y.push(250);//250 is where snake starts on y
        }

    }
    update() {

        for (let i = 0; i < this.numSegments - 1; i++) {
            this.x[i] = this.x[i + 1];
            this.y[i] = this.y[i + 1];
        }
        switch (this.direction) {
            case RIGHT_ARROW:
                this.x[this.numSegments - 1] = this.x[this.numSegments - 2] + DIFF;
                this.y[this.numSegments - 1] = this.y[this.numSegments - 2];
                break;
            case UP_ARROW:
                this.x[this.numSegments - 1] = this.x[this.numSegments - 2];
                this.y[this.numSegments - 1] = this.y[this.numSegments - 2] - DIFF;
                break;
            case LEFT_ARROW:
                this.x[this.numSegments - 1] = this.x[this.numSegments - 2] - DIFF;
                this.y[this.numSegments - 1] = this.y[this.numSegments - 2];
                break;
            case DOWN_ARROW:
                this.x[this.numSegments - 1] = this.x[this.numSegments - 2];
                this.y[this.numSegments - 1] = this.y[this.numSegments - 2] + DIFF;
                break;
        }


    }




    render(){
        push();
        fill(255);
        stroke(255);
        strokeWeight(10);
        for (let i = 0; i < this.numSegments - 1; i++) {
            line(this.x[i], this.y[i], this.x[i + 1], this.y[i + 1]);
        }
        pop();

    }
    hitItself(){
        let head=this.getHead();
        for (let i = 0; i < this.x.length-1; i++) {//ignore last part as thats head.
            if(this.x[i]===head.x&&this.y[i]===head.y)
                return true;

        }
        return false;

    }
    getHead(){
        return {x: this.x[this.x.length-1], y: this.y[this.y.length-1]};
    }
    addLength(){
        this.x.unshift(this.x[0]);//adds an element to the start of an array
        this.y.unshift(this.y[0]);
        this.numSegments++;
    }


}
function keyPressed(){
if (keyCode === LEFT_ARROW&&snake.direction!==RIGHT_ARROW) {
    snake.direction=LEFT_ARROW;

} else if (keyCode === RIGHT_ARROW&&snake.direction!==LEFT_ARROW) {
    snake.direction=RIGHT_ARROW;
}
else if (keyCode === UP_ARROW&&snake.direction!==DOWN_ARROW) {
    snake.direction=UP_ARROW;
}
else if (keyCode === DOWN_ARROW&&snake.direction!==UP_ARROW) {
    snake.direction=DOWN_ARROW;
}



}
function touchMoved(){
    if(mouseX>width/2){
        if(mouseY<height/2&&snake.direction!==DOWN_ARROW)
            snake.direction=UP_ARROW;
        else if(snake.direction!==LEFT_ARROW) snake.direction=RIGHT_ARROW;
    }
    else{
        if(mouseY<height/2&&snake.direction!==RIGHT_ARROW)
            snake.direction=LEFT_ARROW;
        else if(snake.direction!==UP_ARROW) snake.direction=DOWN_ARROW;
    }

}
function touchStarted(){
    touchMoved();
}

