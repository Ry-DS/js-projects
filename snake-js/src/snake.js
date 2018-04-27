let DIFF=10;//how the screen is divided into squares

class Snake{


    constructor(brain) {
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

        this.brain = brain;

    }
    setBrain(brain){

        this.brain = brain;
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
            this.addLength();
            this.score++;
            this.food=newFood();
            this.moves = 200;
        }
        this.fitness += this.numSegments;
        this.brain.score = this.fitness;


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
        // food 0,1,2,3,4,5,6,7 right, left up down
        // wall 8,9,10,11,12,13,14,15 right, left up down
        // itself 16,17,18,19,20,21,22,23 right, left up down
        for (let i = 0; i < 24; i++) {
            inputs[i] = 0;

        }
        let results = [rayCast(this.getHead(), createVector(0, DIFF), this),//right
            rayCast(this.getHead(), createVector(0, -DIFF), this),//left
            rayCast(this.getHead(), createVector(-DIFF, 0), this),//up
            rayCast(this.getHead(), createVector(DIFF, 0), this),//down
            rayCast(this.getHead(), createVector(-DIFF, DIFF), this),//up right
            rayCast(this.getHead(), createVector(-DIFF, -DIFF), this),// up left
            rayCast(this.getHead(), createVector(DIFF, DIFF), this),// down right
            rayCast(this.getHead(), createVector(DIFF, -DIFF), this)// down left
        ];

        for (let i = 0; i <= 7; i++) {
            if (results[i].distFood !== -1)
                inputs[i] = map(results[i].distFood, 10, Math.max(width, height), 0, 1);
        }
        for (let i = 8; i <= 15; i++) {
            inputs[i] = map(results[i - 8].distWall, 10, Math.max(width, height), 0, 1);

        }
        for (let i = 16; i <= 23; i++) {
            if (results[i - 16].distItself !== -1)
                inputs[i] = map(results[i - 16].distItself, 10, Math.max(width, height), 0, 1);

        }


        let activated=this.brain.activate(inputs);

        if (activated[0] > 0.5)
            this.direction=UP_ARROW;
        if (activated[1] > 0.5)
            this.direction=DOWN_ARROW;
        if (activated[2] > 0.5)
            this.direction=LEFT_ARROW;
        if (activated[3] > 0.5)
            this.direction=RIGHT_ARROW;
        return inputs;
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

        return createVector(this.x[this.x.length - 1], this.y[this.y.length - 1]);
    }
    addLength(){
        this.x.unshift(this.x[0]);//adds an element to the start of an array
        this.y.unshift(this.y[0]);
        this.numSegments++;
    }


}


function rayCast(pos, direction, snake) {
    let currentPos = pos.copy();
    let findItem = (snake) => {
        if (currentPos.x >= width - 10 || currentPos.y >= height - 10 || currentPos.x <= -10 || currentPos.y <= -10)
            return 'wall';
        if (currentPos.x === snake.food.x && currentPos.y === snake.food.y) {
            return 'food';
        }

        for (let i = 0; i < snake.numSegments - 1; i++) {

                let segPos=createVector(snake.x[i],snake.y[i]);
            if (segPos.equals(currentPos)) {
                    return 'itself';


            }
        }
        return -1;
    };

    let foundThings = new Map();
    while (!foundThings.has('wall')) {
        let result = findItem(snake);
        if (result !== -1)
            foundThings.set(result, currentPos.dist(pos));
        currentPos.add(direction);


    }
    let finalResult = {distFood: -1, distItself: -1, distWall: foundThings.get('wall')};
    if (foundThings.has('food'))
        finalResult.distFood = foundThings.get('food');
    if (foundThings.has('itself'))
        finalResult.distItself = foundThings.get('itself');
    return finalResult;





}

