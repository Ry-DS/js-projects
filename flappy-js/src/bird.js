const BIRD_SIZE=20;
let BIRD_X_POS;
class Bird{

    constructor() {
        this.yVel=-0.1;
        this.y=height/2;
        BIRD_X_POS=width/10;
        this.score=0;

        this.brain = neataptic.architect.Perceptron(5, 4, 1);
        //this.brain=generateTrainedBrain();
        this.brain.mutate(neataptic.methods.mutation.MOD_BIAS);
        this.brain.mutate(neataptic.methods.mutation.MOD_WEIGHT);



    }
    setBrain(brain){

        this.brain=neataptic.Network.fromJSON(brain.toJSON());
        this.brain.mutate(neataptic.methods.mutation.MOD_BIAS);
        this.brain.mutate(neataptic.methods.mutation.MOD_WEIGHT);
    }
    update(){
        if(this.yVel>-10)
        this.yVel-=0.2;

        if(this.y>height&&this.yVel<0||this.y<0&&this.yVel>0)
            this.yVel=0;
        else
            this.y-=this.yVel;





    }
    render(){
        fill(255,255,255,100);
        ellipse(BIRD_X_POS,this.y,BIRD_SIZE,BIRD_SIZE);
        fill(255,255,255);


    }
    think(pipes){
        if(pipes.length===0){
            if(this.brain.activate([this.y,0,0])[0]>0.5)
                this.jump();
            return;

        }
        let closestPipe=pipes[pipes.length-1];
        for(let pipe of pipes){



            pipe.highlight=false;
            if(pipe.x<closestPipe.x&&pipe.x>BIRD_X_POS-PIPE_WIDTH){
                closestPipe=pipe;
            }

        }
        closestPipe.highlight=true;
        let inputs=[];
        inputs[0]=this.y/height;
        inputs[1] = map(closestPipe.top, 50, height - closestPipe.pipeSize - 50, 0, 1);
        inputs[2]=closestPipe.x/width;
        inputs[3] = map(this.yVel, -10, 4, 0, 1);
        inputs[4] = map(closestPipe.pipeSize, 70, 100, 0, 1);
        let activated=this.brain.activate(inputs);
        if (activated[0] > 0.5)
            this.jump();


    }
    jump(){
        this.yVel=4;
    }

}

/*function keyPressed(key){
    if(key.key===' '){
        bird.jump();
    }


}*/
