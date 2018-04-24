let snake;
let food;
function setup() {
    createCanvas(480, 300);
    snake=new Snake();
    newFood();
}

function update(){
snake.update();
food.update();
}


function draw() {
    background(0);
    update();
    snake.render();
    food.render();

    drawBox();

}

function drawBox() {
    noFill();
    stroke(255);
    strokeWeight(5);
    rect(0,0,width,height);
    fill(255);
    strokeWeight(1);
}
function newFood(){
    food=new Food(random(width),random(height));
}
function Food(x,y){
    this.x=x;
    this.y=y;
    this.update=()=>{

    };
    this.render=()=>{
      fill(255,0,0);
      rect(this.x,this.y,5,5);

    };
}




