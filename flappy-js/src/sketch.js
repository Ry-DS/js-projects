let birds=[];
let pipes=[];
let deadBirds=[];
const BIRD_COUNT=400;
let slider;
let speed=1;
let count=0;


function setup() {
  // put setup code here
    createCanvas(480, 300);
    console.log(height);
    newGeneration();
    slider=createSlider(1,100,1);


}

function newGeneration(){
    if(deadBirds.length===0){
    for (let i = 0; i < BIRD_COUNT; i++) {
        birds[i]=new Bird();
    }
        return;
    }
    //calculate fitness
    let sum=0;
    for(let bird of deadBirds){
        sum+=bird.score;
    }
    for(let bird of deadBirds){
        bird.fitness=bird.score/sum;
    }

    let bestBird;
    let index=deadBirds.length;
    /*let r=random(1);
    while(r>0){
        r=r-deadBirds[index].fitness;
        index++;
    }*/
    //The last bird added was the last to die so is most likely to have a good network
    bestBird=deadBirds[index-1];
    for (let i = 0; i < BIRD_COUNT; i++) {
        birds[i]=new Bird();
        if(i<BIRD_COUNT-50)//we want some birds to be completely random so the network can break out of stand stills where no one progresses
        birds[i].setBrain(bestBird.brain);//sets brain with mutations
    }
    pipes=[];
    deadBirds=[];
    count=0;
    console.log('new generation');

}
function update(){

    if(birds.length===0){
        newGeneration();
        return;
    }
    speed=slider.value();




    for (let i = pipes.length-1; i >=0; i--) {
        let pipe=pipes[i];
        pipe.update();
        for (let j = birds.length-1; j >=0 ; j--) {
            if(pipe.hits(birds[j])||Math.abs(birds[j].y-height)<5/*||birds[j].y-4<0*/)
            {
                deadBirds.push(birds.splice(j,1)[0])
            }
        }


        if(pipe.x<0-PIPE_WIDTH)
            pipes.splice(i,1);


    }
    if(count%90===0||count===0)
        pipes.push(new Pipe());
    for(let bird of birds){
        bird.think(pipes);
        bird.update();
    }
    count++;



}
function draw() {
    background(0);
    for (let i = 0; i <speed ; i++) {
        update();
    }

birds.forEach(bird=>bird.render());
    pipes.forEach(pipe=>{
        pipe.render();
    });



}




