let size=10;
let bounce = false;
let bounceSize=100;
function setup() {
  // put setup code here
    createCanvas(920, 480);
}



function draw() {
    //clear();
   // print('hi');
    /*if(keyIsPressed)
    size++;*/
    if(keyIsDown(RIGHT_ARROW))
        size+=10;
    else if(keyIsDown(LEFT_ARROW))
        size-=10;

    if(keyIsDown(UP_ARROW))
        bounceSize+=1;
    else if (keyIsDown(DOWN_ARROW)&&bounceSize>0)
        bounceSize-=1;


    if(!bounce)
        size-=random(5);
    else size+=random(5);
    if(size>bounceSize)
        bounce=false;
    if(size<-bounceSize)
        bounce=true;
    ellipse(size+width/2-size,size+height/2-size,size,size);


}
function print(message){
    console.log(message);
}
/*
function keyPressed(key){
if(key.key==='w'){
    size++;
}
else if(key.key==='s')
    size--;
}*/
