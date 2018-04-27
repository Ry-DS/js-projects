let snakes=[];
let deadSnakes=[];
const SNAKE_COUNT=100;
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
    let canvas=createCanvas(500, 500);
    canvas.style('display', 'block');
    canvas.parent('sketch-holder');

    neat=new neataptic.Neat(12,4,null,
        {
            mutation: neataptic.methods.mutation.ALL,
            popsize: SNAKE_COUNT,
            mutationRate: 0.3,
            elitism: Math.round(0.1* SNAKE_COUNT),
            network: new neataptic.architect.Random(
                12,
                6,
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
    loadBestButton = createButton("Load pre-trained bird");
    loadBestButton.position(0, height + 65);
    loadBestButton.mousePressed(() => {
        this.snake = [];
        this.snake.push(new Snake());

        //snakes[0].brain = generateTrainedBrain();
    })
}

function updateChart(score) {

}

function newGeneration(){
    if(deadSnakes.length===0){
        for (let i = 0; i < SNAKE_COUNT; i++) {
            snakes[i]=new Snake();
        }
        return;
    }
    //calculate fitness
    let sum=0;
    for(let snake of deadSnakes){
        sum+=snake.score;
    }
    for(let snake of deadSnakes){
        snake.fitness=snake.score/sum;
    }

    let bestSnake;
    let index=0;
    let r=random(1);
    while(r>0){
        r=r-deadSnakes[index].fitness;
        index++;
    }

    bestSnake=deadSnakes[index-1];
    for (let i = 0; i < SNAKE_COUNT; i++) {
        snakes[i]=new Snake();
        /*if(i<SNAKE_COUNT-50)//we want some birds to be completely random so the network can break out of stand stills where no one progresses
            snakes[i].setBrain(bestSnake.brain);//sets brain with mutations*/
    }
    generation++;

    updateChart(bestSnake.score);
    deadSnakes=[];
    count=0;
    console.log('new generation');


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
            deadSnakes.push(snakes.splice(i,1)[0]);
            continue;
        }
        snake.think();
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
        snake.render();
    })

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
    let xFruit = floor(random(10, (width - 100) / 10)) * 10;
    let yFruit = floor(random(10, (height - 100) / 10)) * 10;
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




