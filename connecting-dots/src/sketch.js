let particles = [];
let slider;
let fadingLines = [];

function setup() {
    Array.prototype.contains = function (obj) {
        let i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    };
    // put setup code here
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    canvas.parent('sketch-holder');
    noStroke();
    //slider=createSlider(1,width);
    for (let i = 0; i < 20; i++) {
        drawParticles(random(width), random(height));
    }

    for (let i = 0; i < 100; i++) {
            let particle = random(particles);
            particle.newLine();


    }


}


function update() {

    touches.forEach((touch) => {
        drawParticles(touch.x, touch.y);
    });
    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.update();
		for(let j=particles.length-1;j>=0;j--){
			if(i!==j&&particle.collides(particles[j]))
				particle.calculateRebound(particles[j]);
		}
        if (particle.size < 0)
            particles.splice(i, 1);
    }
    for (let i = fadingLines.length - 1; i >= 0; i--) {
        if (!fadingLines[i].dieing)
            fadingLines.splice(i, 1);
        else fadingLines[i].update();
    }

}

function draw() {

    background(50);

    update();
    let lineCount = 1000;
    particles.forEach(particle => {
        /*for (let otherParticle of particles) {
            if (lineCount > 0 &&
                particle.lineCount < 5 && otherParticle.lineCount < 5 &&
                dist(particle.pos.x, particle.pos.y, otherParticle.pos.x, otherParticle.pos.y) < 100) {
                push();
                stroke(255);
                line(otherParticle.pos.x, otherParticle.pos.y, particle.pos.x, particle.pos.y);
                pop();
                lineCount--;
                otherParticle.lineCount++;
                particle.lineCount++;
            }
        }*/
        particle.lines.forEach(line => line.render());
    });
    fadingLines.forEach(line => line.render());
    particles.forEach((particle) => {

        particle.render();
        particle.lineCount = 0;
    });


}

/*function mouseMoved(){
    drawParticles(mouseX,mouseY);
}*/
function touchMoved() {
    return false;
}

function drawParticles(x, y) {
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(x, y));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




