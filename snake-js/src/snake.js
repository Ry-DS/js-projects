let SPEED=1.5;
class Snake{


    constructor() {
        this.tail=[];
        this.tail.push(new Tail(width/2,height/2));
        this.tail.push(new Tail(width/2+20,height/2));
        this.tail.push(new Tail(width/2+40,height/2));
        this.score=0;
        this.xVel=0;
        this.yVel=0;

    }
    update() {

        if (dist(this.x, this.y, food.x, food.y) < 2) {
            this.score++;
            newFood();
            this.tail.push(new Tail(this.tail[0].x, this.tail[0].y));
        }
        if(this.tail.length===0)
            return;
        let lastpart=this.tail.pop();
        let firstpart=this.tail.shift();
        let saveX=lastpart.x;
        let saveY=lastpart.y;
        lastpart.x=firstpart.x;
        lastpart.y=firstpart.y;
        lastpart.x+=this.xVel;
        lastpart.y+=this.yVel;

        firstpart.x=saveX;
        firstpart.y=saveY;
        firstpart.x+=this.xVel;
        firstpart.y+=this.yVel;
        this.tail.splice(this.tail.length-2,0,firstpart);
        this.tail.unshift(lastpart);


    }




    render(){
        fill(255);
        for(let t of this.tail){
            rect(t.x,t.y,10,10);
        }

    }


}
function keyPressed(){
if (keyCode === LEFT_ARROW) {
    snake.xVel=-SPEED;
    snake.yVel=0;

} else if (keyCode === RIGHT_ARROW) {
    snake.xVel=SPEED;
    snake.yVel=0;
}
else if (keyCode === UP_ARROW) {
    snake.yVel=-SPEED;
    snake.xVel=0;
}
else if (keyCode === DOWN_ARROW) {
    snake.yVel=SPEED;
    snake.xVel=0;
}



}
function Tail(x,y){
    this.x=x;
    this.y=y;

}
