let DIFF=10;//how the screen is divided into squares

class Snake{


    constructor() {
        this.x=[];
        this.y=[];
        this.numSegments=4;//start off with 4 length
        this.score=0;
        this.fitness=0;
        this.moves=500;
        this.food=newFood();
        this.color=[random(255),random(255),random(255)];
        frameRate(15);
        this.direction=RIGHT_ARROW;
        for (let i = 0; i < this.numSegments; i++) {
            this.x.push(30 + (i * DIFF));//0 is where snake starts on x
            this.y.push(250);//250 is where snake starts on y
        }

        //neural network
        this.brain = neataptic.architect.Perceptron(12, 6, 4);

    }
    setBrain(brain){

        this.brain=neataptic.Network.fromJSON(brain.toJSON());
        this.brain.mutate(neataptic.methods.mutation.MOD_BIAS);
        this.brain.mutate(neataptic.methods.mutation.MOD_WEIGHT);
    }

    update() {
        this.moves--;
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
        this.food.update();
        if(this.food.hasBeenEaten(this)){
            this.score++;
            this.addLength();
            this.food=newFood();
            this.moves=500;
        }


    }




    render(){
        push();
        fill(255);
        stroke(this.color[0],this.color[1],this.color[2],100);
        strokeWeight(10);
        for (let i = 0; i < this.numSegments - 1; i++) {
            if(i===this.numSegments-2)//TODO remove
                stroke(255,0,0);
            line(this.x[i], this.y[i], this.x[i + 1], this.y[i + 1]);
        }
        pop();
        this.food.render(this.color);

    }
    think(){
        let inputs=[];
        //right 0,1,2 are food, wall, itself
        //left 3,4,5 are food, wall, itself
        //up 6,7,8 are food, wall, itself
        //down 9,10,11 are food, wall, itself
        for (let i = 0; i < 12; i++) {
            inputs[i]=1;

        }
        let results=[rayCast(this.getHead().x,this.getHead().y,RIGHT_ARROW,this),
        rayCast(this.getHead().x,this.getHead().y,LEFT_ARROW,this),
        rayCast(this.getHead().x,this.getHead().y,UP_ARROW,this),
        rayCast(this.getHead().x,this.getHead().y,DOWN_ARROW,this)];
        for (let i = 0; i <=9; i+=3) {
            if(results[i/3].result==='food')
                inputs[i]=map(results[i/3].distance,20,Math.max(width,height),0,1);

        }
        for (let i = 1; i <=10 ; i+=3) {
            if(results[(i-1)/3].result==='wall')
                inputs[i]=map(results[(i-1)/3].distance,10,Math.max(width,height),0,1)

        }
        for (let i = 2; i <=11 ; i+=3) {
            if(results[(i-2)/3].result==='itself')
                inputs[i]=map(results[(i-2)/3].distance,10,Math.max(width,height),0,1)

        }
       // console.log(inputs);

        let activated=this.brain.activate(inputs);

        if (activated[0] > 0.5)
            this.direction=UP_ARROW;
        if (activated[1] > 0.5)
            this.direction=DOWN_ARROW;
        if (activated[2] > 0.5)
            this.direction=LEFT_ARROW;
        if (activated[3] > 0.5)
            this.direction=RIGHT_ARROW;
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
/*function keyPressed(){
if (keyCode === LEFT_ARROW&&snakes[0].direction!==RIGHT_ARROW) {
    snakes[0].direction=LEFT_ARROW;

} else if (keyCode === RIGHT_ARROW&&snakes[0].direction!==LEFT_ARROW) {
    snakes[0].direction=RIGHT_ARROW;
}
else if (keyCode === UP_ARROW&&snakes[0].direction!==DOWN_ARROW) {
    snakes[0].direction=UP_ARROW;
}
else if (keyCode === DOWN_ARROW&&snakes[0].direction!==UP_ARROW) {
    snakes[0].direction=DOWN_ARROW;
}



}
function touchMoved(){
    if(mouseX>width/2){
        if(mouseY<height/2&&snakes[0].direction!==DOWN_ARROW)
            snakes[0].direction=UP_ARROW;
        else if(snakes[0].direction!==LEFT_ARROW) snakes[0].direction=RIGHT_ARROW;
    }
    else{
        if(mouseY<height/2&&snakes[0].direction!==RIGHT_ARROW)
            snakes[0].direction=LEFT_ARROW;
        else if(snakes[0].direction!==UP_ARROW) snakes[0].direction=DOWN_ARROW;
    }

}
function touchStarted(){
    touchMoved();
}*/
function rayCast(x,y,direction,snake){
    let currentPos=createVector(x,y);
    let tries=0;
    let findItem=(snake)=>{
        if(currentPos.x>=width-10||currentPos.y>=height-10||currentPos.x<=-10||currentPos.y<=-10)
            return 'wall';
        if(currentPos.x===snake.food.x&&currentPos.y===snake.food.y)
            return 'food';

        for (let i = 0; i < snake.numSegments-1; i++) {

                let segPos=createVector(snake.x[i],snake.y[i]);
                if(segPos.equals(currentPos)&&tries!==0){
                    return 'itself';


            }
        }
        return -1;
    };
    let result=-1;
    switch(direction){
        case UP_ARROW:

            while(result===-1&&tries<5000){
                result = findItem(snake);
                currentPos.add(0,-DIFF);
                tries++;
            }
            return {result: result, distance: y-currentPos.y};
        case DOWN_ARROW:
            while(result===-1&&tries<5000){
                result = findItem(snake);
                currentPos.add(0,DIFF);
                tries++;
            }
            return {result: result, distance: currentPos.y-y};
        case LEFT_ARROW:
            while(result===-1&&tries<5000){
                result = findItem(snake);
                currentPos.add(-DIFF,0);
                tries++;
            }
            return {result: result, distance: x-currentPos.x};
        case RIGHT_ARROW:
            while(result===-1&&tries<5000){
                result = findItem(snake);
                currentPos.add(DIFF,0);
                tries++;
            }

            return {result: result, distance: currentPos.x-x};



    }

}

