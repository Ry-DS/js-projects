const THICKNESS=1;
const RANDOM_COLOR=[[255,0,0],[0,255,0],[0,0,255],[40,50,20]];
class Circle{

    constructor(x,y,color) {

        this.radius=0;
        this.x=x;
        this.y = y;
        this.growing=true;
        //this.color=random(RANDOM_COLOR);
        this.color=color;

    }
    contains(x,y){
        return distSq(x,y,this.x,this.y)<this.radius*this.radius+1;

    }
    touching(circle){
        //console.log(dist(circle.x,circle.y,this.x,this.y));
        return distSq(circle.x,circle.y,this.x,this.y)<(circle.radius+this.radius)*(circle.radius+this.radius)+1;
    }
    touchingEdges(){
        return this.x+this.radius+1>width||this.x-this.radius-1<0
            ||this.y+this.radius+1>height||this.y-this.radius-1<0;
    }
    update(){
        if(this.growing)
            this.radius+=0.08;
    }
    draw(){
        noStroke();
        //strokeWeight(THICKNESS);
        fill(this.color[0],this.color[1],this.color[2]);
        ellipse(this.x,this.y,this.radius*2,this.radius*2);


    }
}