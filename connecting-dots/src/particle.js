const RANDOM_SETS = [[255, 200, 100], [100, 200, 200], [102, 200, 122], [100, 20, 200]];

class Particle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.lineCount = 0;
        this.randomColor = random(RANDOM_SETS);

        this.size = 15;

    }

    update() {
        // this.size-=this.shrinkSpeed;
        //this.velY+=random(-.5,.5);
        //this.velX+=random(-.5,.5);
        this.pos.add(this.vel);
        if (this.pos.x < this.size / 2 || this.pos.x > width - this.size / 2) {
            this.vel.x *= -1;
        } else if (this.pos.y < this.size / 2 || this.pos.y > height - this.size / 2) {
            this.vel.y *= -1;
        }

    }

    render() {
        fill(this.randomColor[0], this.randomColor[1], this.randomColor[2]);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);

    }

}