let snake;
let food;
function setup() {
    createCanvas(500, 500);
    snake=new Snake();
    newFood();
}

function update(){
snake.update();
food.update();
let head=snake.getHead();
if(snake.hitItself()||head.x>width-20||head.y>height-20||head.x<20||head.y<20){//if snake died
    snake=new Snake();//make new snake and food
    newFood();
}
if(food.hasBeenEaten(snake)){
    snake.score++;
    snake.addLength();
    newFood();
}


}


function draw() {
    background(0);
    update();
    snake.render();
    food.render();

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
    food=new Food(xFruit,yFruit);
}
function Food(x,y){
    this.x=x;
    this.y=y;
    this.update=()=>{

    };
    this.render=()=>{
      fill(255,0,0);
      stroke(255,0,0);
      strokeWeight(10);
      point(this.x,this.y);

    };
    this.hasBeenEaten=(snake)=>{
        return snake.getHead().x === this.x && snake.getHead().y === this.y;

    }
}




