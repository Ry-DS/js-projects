const PIPE_WIDTH=40;
let pipeSpeed = 3;

class Pipe{

    constructor() {
        this.pipeSize = random(70, 100);
        this.x=width;
        this.top = random(50, height - this.pipeSize - 50);
        this.bottom = height - this.top - this.pipeSize;
        this.highlight=false;
        this.passedBird = false;


    }
    update(){

        this.x-=pipeSpeed;



    }
    render(){
        if(this.highlight){
            fill(255,0,0);
        }
        rect(this.x,0,40,this.top);
        rect(this.x,height-this.bottom,PIPE_WIDTH,this.bottom);
        fill(255);


    }
    hits(bird){

        return this.x<BIRD_X_POS+BIRD_SIZE/2&&this.x+PIPE_WIDTH>BIRD_X_POS-BIRD_SIZE/2&&(//x check
        bird.y-BIRD_SIZE/2<this.top||//top half check
        bird.y+BIRD_SIZE/2>height-this.bottom);//bottom half check

    }
}