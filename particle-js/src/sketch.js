let particles=[];
let slider;
let angle=0,circleX,circleY,radius=20;
function setup() {
  // put setup code here
   let canvas= createCanvas(windowWidth, windowHeight);
   canvas.style('display','block');
   canvas.parent('sketch-holder');
    noStroke();
    //slider=createSlider(1,width);

    circleX=width/2;
    circleY=height/2


}




function update(){

    touches.forEach((touch)=>{
        drawParticles(touch.x,touch.y);
    });
    for (let i = particles.length-1; i >=0 ; i--) {
        let particle=particles[i];
        particle.update();
        if(particle.size<0)
            particles.splice(i,1);
    }
    updateInCircle();
    drawInCircle(width/4,height/2,0);

    drawInCircle(width/2+width/4,height/2,PI);

}
function draw() {
    background(100);
    update();
    particles.forEach((particle)=>{
        particle.render();
    });


}
function mouseMoved(){
    drawParticles(mouseX,mouseY);
}
function touchMoved(){
    return false;
}
function drawParticles(x,y){
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x,y));
    }
}
let grow=true;
function updateInCircle(){
    angle+=0.1;
    if(grow)
        radius+=2;
    else
        radius-=1;
    if(radius===20)
        grow=true;
    if(radius>=height/1.7) grow=false;

}
function drawInCircle(width,height,angleOffset) {

    circleX=cos(angle+angleOffset)*radius+width;
    circleY=sin(angle+angleOffset)*radius+height;

    //console.log(radius);
    drawParticles(circleX,circleY);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}




