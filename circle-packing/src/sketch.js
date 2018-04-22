let circles=[];
let img=[];
let imgNum=-1;
let slider;
function preload(){
    for (let i = 1; i <= 6; i++) {
        img[i-1]=loadImage("assets/img"+i+".jpg");
    }
    console.log(img.length+" images")

}

function setup() {

    createCanvas(img.width, img.height);
    slider=createSlider(1,6);




}


function update(){
    if(slider.value()-1!==imgNum){
        console.log("changing img");
        circles=[];
        imgNum=slider.value()-1;

       resizeCanvas(img[imgNum].width,img[imgNum].height);
    }



    circles.forEach((circle)=>{
        circle.update();
        if(!circle.growing)
            return;
        if(circle.touchingEdges()){
            circle.growing=false;
            return;
        }
        circles.forEach(other=>{

            if(circle!==other&&circle.touching(other))
                circle.growing=false;

        })
    });
    for (let i = 0; i < 10; i++) {


        let contains = false;
        let x = random(width), y = random(height);
        for (let i = 0; i < circles.length; i++) {
            if (circles[i].contains(x, y))
                contains = true;

        }
        if (!contains)
            circles.push(new Circle(x, y, img[imgNum].get(x, y)));
    }

}
function draw() {
    update();
    background(0);

    circles.forEach((circle)=>circle.draw());





}
function distSq(x,y,x2,y2){
    return (x2-x)*(x2-x)+(y2-y)*(y2-y);
}
/*function mouseMoved(){
    let touching;
    let tries=0;
    for (let i = 0; i <3&&tries<20 ;) {
        let circle=new Circle(random(mouseX-20,mouseX+20),random(mouseY-20,mouseY+20));
        for (let j = 0; j <circles.length ; j++) {
            if(circles[j].contains(circle.x,circle.y)||circles[j].touching(circle))
                touching=true;
        }
        if(!touching){
            circles.push(circle);
            i++;
        }else tries++;
    }
}*/




