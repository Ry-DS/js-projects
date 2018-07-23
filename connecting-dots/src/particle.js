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

        this.lines = [];
        this.lines.hasParticle = function (particle) {
            for (let line of this) {
                if (line.to === particle || line.from === particle)
                    return true;
            }
            return false;
        };

        this.size = 15;

    }

    update() {
        /* if(this.lines.length===0){
             for (let i = 0; i <3 ; i++) {
                 this.lines.push(new Line(random(particles),this));
             }
         }*/
        for (let i = this.lines.length - 1; i >= 0; i--) {
            let line = this.lines[i];
            if (line.ticksLived < 0) {
                line.die(this, i);
                this.newLine();
            }

        }
        this.pos.add(this.vel);
        if (this.pos.x < this.size / 2 || this.pos.x > width - this.size / 2) {
            this.vel.x *= -1;
        } else if (this.pos.y < this.size / 2 || this.pos.y > height - this.size / 2) {
            this.vel.y *= -1;
        }
        this.lines.forEach(line => line.update());


    }

    newLine() {
        let bestParticle;
        let bestDist = Infinity;
        for (let particle of particles) {
            let dist = particle.pos.dist(this.pos);
            if (!bestParticle || dist < bestDist && !this.lines.hasParticle(particle)) {
                bestDist = dist;
                bestParticle = particle;
            }

        }
        this.lines.push(new Line(this, bestParticle));
    }

    /*dist(vec1,vec2){
        return Math.pow(vec1.x-vec2.x,2)+Math.pow(vec1.y-vec2.y,2);
    }*/
    render() {
        fill(this.randomColor[0], this.randomColor[1], this.randomColor[2]);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);


    }
	calculateRebound(ball){//https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling
		let delta=this.pos.copy().sub(ball.pos);
		let d=delta.mag();
	

		let mtd=delta.copy().mult(((this.radius()+ball.radius())-d)/d);
		
		let im1=random(2,3);//this ball mass is 3
		let im2=random(2,3);//other ball mass is 3
		this.pos.add(mtd.copy().mult(im1/(im1+im2)));
		ball.pos.sub(mtd.copy().mult(im2/(im1+im2)));
		let v=this.vel.copy().sub(ball.vel);
		let vn=v.copy().dot(mtd.copy().normalize());
		if(vn>0)
			return;
		let i=(-(1 + 0.5) * vn) / (im1 + im2);//0.5 is restitution
		let impulse=mtd.copy().mult(i);
		this.vel.add(impulse.copy().mult(im1));
		ball.vel.sub(impulse.copy().mult(im2));
		
		
		
	}
	collides(ball){
		let xd=this.pos.x-ball.pos.x;
		let yd=this.pos.y-ball.pos.y;
		let sumRadius=this.radius()+ball.radius();
		let sqrRadius=sumRadius*sumRadius;
		let distSqr=(xd*xd)+(yd*yd);
		return distSqr<=sqrRadius;
	}
	radius(){
		return this.size/2;
	}

}