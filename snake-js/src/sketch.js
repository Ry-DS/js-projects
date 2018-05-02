let snakes=[];
const SNAKE_COUNT = 100;
let neat;
let slider;
let speed=1;
let count=0;
let highestScore=0;
let generation=1;

let highScoreText;
let scoreText;
let loadBestButton;

let chartFitnesses=[];
let chartLabels=[];


function setup() {
    let canvas = createCanvas(300, 300);
    canvas.style('display', 'block');
    canvas.parent('sketch-holder');

    neat = new neataptic.Neat(24, 4, (g) => {
            return 1;
        },
        {
            mutation: neataptic.methods.mutation.ALL,
            popsize: SNAKE_COUNT,
            mutationRate: 0.3,
            elitism: Math.round(0.1* SNAKE_COUNT),
            network: new neataptic.architect.Random(
                24,
                18,
                4
            )
        });


    newGeneration();
    //ui stuff
    slider = createSlider(1, 2000, 1);

    highScoreText = createElement("p", "");
    highScoreText.position(0, height + 10);
    scoreText = createElement("p", "");
    scoreText.position(0, height + 30);
    /* loadBestButton = createButton("Load pre-trained bird");
     loadBestButton.position(0, height + 65);
     loadBestButton.mousePressed(() => {
         this.snake = [];
         this.snake.push(new Snake());

         //snakes[0].brain = generateTrainedBrain();
     })*/
}

function updateChart(score) {

}

function newGeneration(){
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

    snakes = [];
    for (let genome in neat.population) {
        genome = neat.population[genome];
        snakes.push(new Snake(genome));
    }

    count=0;


}

function update(){
    if (frameCount % 10 === 0)
        highScoreText.html("Highest Score: " + highestScore);
    if(snakes.length===0){
        newGeneration();
        return;
    }
    if (frameCount % 10 === 0) {
        scoreText.html("Current Score: " + snakes[0].score);
    }
    if (frameCount % 60 === 0)
        updateChart(snakes[0].score);
    if (speed <= 2000)
        speed=slider.value();
    for(let i=snakes.length-1;i>=0;i--){
        let snake=snakes[i];
        let head=snake.getHead();
        if(snake.hitItself()||head.x>width-20||head.y>height-20||head.x<20||head.y<20||snake.moves<0){//if snake died
            snakes.splice(i, 1);
            continue;
        }

        let inputs = snake.think();

        snake.update();
        if (snake.score > highestScore)
            highestScore = snake.score;

    }







}


function draw() {
    background(0);
    for (let i = 0; i <speed ; i++) {
        update();
    }
    snakes.forEach((snake)=>{
       // strokeWeight(1);
       /* let inputs = snake.think();
        inputs.forEach(input=>{
            if(input.distFood!==-1)
                stroke(255,0,0);
            else if(input.distItself!==-1)
                stroke(0,0,255);
            else stroke(0,255,0);
           line(snake.getHead().x,snake.getHead().y,input.finalPos.x-10,input.finalPos.y-10);
        });*///Drawing collision lines for debugging
        snake.render();
    });

    drawBox();

}

function drawBox() {
    push();
    noFill();
    stroke(255);
    strokeWeight(3);
    rect(10,10,width-20,height-20);
    pop();
}
function newFood(){
    let xFruit = floor(random(5, (width - 50) / 10)) * 10;
    let yFruit = floor(random(5, (height - 50) / 10)) * 10;
    return new Food(xFruit,yFruit);
}
function Food(x,y){
    this.x=x;
    this.y=y;
    this.update=()=>{

    };
    this.render=(color)=>{
      fill(255,0,0);
      stroke(color[0],color[1],color[2]);
      strokeWeight(10);
      point(this.x,this.y);

    };
    this.hasBeenEaten=(snake)=>{
        return snake.getHead().x === this.x && snake.getHead().y === this.y;

    }
}




