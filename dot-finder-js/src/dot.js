class Dot {

    constructor(brain) {
        this.pos = createVector(width / 2, height - 50);
        this.vel = createVector(0, 0);
        this.score = 0;
        this.brain = brain;
        this.moves = 0;

    }

    update() {
        this.pos.add(this.vel);
        this.score = 1 / this.pos.dist(goal);
        this.moves++;

    }

    think() {
        this.brain.score = this.score;
        let inputs = [];
        inputs[0]=this.score;
        let activated = this.brain.activate(inputs);
        this.vel.x = activated[0] * 40 - 20;//number between -10 to 10
        this.vel.y = activated[1] * 40 - 20;
    }

    isDead() {
        return this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height || this.score > 0.3 || this.moves > 5000||
            //wall
            this.pos.x>width/2-100&&(this.pos.y<height/2&&this.pos.y>height/2-30)
            ;

    }

    render() {

        push();
        strokeWeight(5);
        stroke(255);
        point(this.pos.x, this.pos.y);
        pop();
    }

}