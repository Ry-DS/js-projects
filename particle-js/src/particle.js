const RANDOM_SETS=[[2,2,100],[2,5,2],[100,2,1],[1,4,3]];
class Particle{

    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.velX=random(-3,3);
        this.velY=random(-3,3);
        this.r=255;
        this.g=255;
        this.b=255;
        this.randomColor=random(RANDOM_SETS);
        this.shrinkSpeed=random(0.5,3);

        this.size=40;

    }
    update(){
        this.size-=this.shrinkSpeed;
        this.velY+=random(-.5,.5);
        this.velX+=random(-.5,.5);

        this.r-=random(1,this.randomColor[0]);
        this.g-=random(1,this.randomColor[1]);
        this.b-=random(1,this.randomColor[2]);
        this.x+=this.velX;
        this.y+=this.velY;

    }
    render(){
        fill(this.r,this.g,this.b);
        ellipse(this.x,this.y,this.size,this.size);

    }

}