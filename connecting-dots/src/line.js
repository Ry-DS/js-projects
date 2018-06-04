class Line {

    constructor(to, from) {
        this.to = to;
        this.from = from;
        this.ticksLived = random(100, 300);


    }

    update() {
        if (this.dieing) {
            if (this.alpha)
                this.alpha -= 5;
            else if (this.alpha === undefined) this.alpha = 255;
            if (this.alpha <= 10) {
                this.dieing = false;
            }


        }

        this.ticksLived--;


    }

    render() {
        if (!this.to || !this.from)
            return;

        push();
        stroke(255, 255, 255, this.alpha ? this.alpha : (255) / this.ticksLived);
        line(this.to.pos.x, this.to.pos.y, this.from.pos.x, this.from.pos.y);
        pop();

    }

    die(particle, index) {
        particle.lines.splice(index, 1);
        this.dieing = true;
        fadingLines.push(this);

    }
}