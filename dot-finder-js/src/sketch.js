let dots = [];
const DOT_COUNT = 100;
let neat;
let slider;
let speed = 1;
let count = 0;
let highestScore = 0;
let generation = 1;

let highScoreText;
let scoreText;

let goal;


function setup() {
    let canvas = createCanvas(500, 500);
    canvas.style('display', 'block');
    canvas.parent('sketch-holder');

    neat = new neataptic.Neat(24, 4, (g) => {
            return 1;
        },
        {
            mutation: neataptic.methods.mutation.ALL,
            popsize: DOT_COUNT,
            mutationRate: 0.3,
            elitism: Math.round(0.1 * DOT_COUNT),
            network: new neataptic.architect.Perceptron(
                4,
                4,
                2
            )
        });


    newGeneration();
    //ui stuff
    slider = createSlider(1, 2000, 1);

    highScoreText = createElement("p", "");
    highScoreText.position(0, height + 10);
    scoreText = createElement("p", "");
    scoreText.position(0, height + 30);

    goal = createVector(width / 2 - 50, 150);
}

function updateChart(score) {

}

function newGeneration() {
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());
    generation++;
    neat.sort();
    var newPopulation = [];

    // Elitism
    for (var i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    // Breed the next individuals
    for (var i = 0; i < neat.popsize - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();

    neat.generation++;

    dots = [];
    for (let genome in neat.population) {
        genome = neat.population[genome];
        dots.push(new Dot(genome))
    }

    count = 0;


}

function allAreDead() {
    let allDead = true;
    for (let dot of dots) {
        if (!dot.isDead())
            allDead = false;
    }
    return allDead;
}

function findBestScore() {
    let highest = -1;
    for (let dot of dots) {
        if (dot.score > highest) {
            highest = dot.score;
        }
    }
    return highest;
}

function update() {
    if (frameCount % 10 === 0)
        highScoreText.html("Highest Score: " + highestScore);
    if (dots.length === 0 || allAreDead()) {
        newGeneration();
        // goal=createVector(random(width),random(height));
        return;
    }
    if (frameCount % 10 === 0) {
        scoreText.html("Current Score: " + findBestScore());
    }
    if (frameCount % 60 === 0)
        updateChart(dots[0].score);
    if (speed <= 2000)
        speed = slider.value();
    for (let i = dots.length - 1; i >= 0; i--) {
        let dot = dots[i];
        if (dot.isDead()) {
            // dots.splice(i, 1);
            continue;
        }

        let inputs = dot.think();

        dot.update();
        if (dot.score > highestScore)
            highestScore = dot.score;

    }


}


function draw() {
    background(0);
    for (let i = 0; i < speed; i++) {
        update();
    }
    dots.forEach((dot) => {

        dot.render();
    });
    push();
    strokeWeight(7);
    stroke(255, 0, 0);
    point(goal.x, goal.y);
    pop();
    drawBox();

}

function drawBox() {
    push();
    noFill();
    stroke(255);
    strokeWeight(3);
    rect(10, 10, width - 20, height - 20);
    pop();
}






