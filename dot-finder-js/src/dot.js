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
        inputs[0] = goal.x / width;
        inputs[1] = goal.y / height;
        inputs[2] = this.pos.x / width;
        inputs[3] = this.pos.y / height;
        let activated = this.brain.activate(inputs);
        this.vel.x = activated[0] * 20 - 10;//number between -10 to 10
        this.vel.y = activated[1] * 20 - 10;
    }

    isDead() {
        return this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height || this.score > 0.3 || this.moves > 400;

    }

    render() {

        push();
        strokeWeight(5);
        stroke(255);
        point(this.pos.x, this.pos.y);
        pop();
    }

}