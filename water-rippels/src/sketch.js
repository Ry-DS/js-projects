let dampening = 0.95;
let previous=[], current=[],cols,rows;
let slider;

function setup() {
    // put setup code here
    let canvas = createCanvas(500, 500);
    slider=createSlider(0.87,0.9999,0.95,0.001);
    pixelDensity(1);
    cols = width;
    rows = height;
    for (let i = 0; i < cols; i++) {
        current[i] = [];
        previous[i] = [];
        for (let j = 0; j < rows; j++) {
            current[i][j] = 0;
            previous[i][j] = 0;
        }
    }
    previous[100][100] = 255


}

function update() {
    if(frameCount%5===0){
        current[int(random(0,cols))][int(random(0,rows))]=255;
    }
    dampening=slider.value();


}

function draw() {
    update();
    background(0);
    loadPixels();
    for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            current[i][j] =
                (previous[i - 1][j] + previous[i + 1][j] +
                    previous[i][j - 1] + previous[i][j + 1] +
                    previous[i - 1][j - 1] + previous[i - 1][j + 1] +
                    previous[i + 1][j - 1] + previous[i + 1][j + 1]
                ) / 4 - current[i][j];
            current[i][j] = current[i][j] * dampening;
            let index = (i + j * cols) * 4;
            pixels[index] = current[i][j] * 5;
            pixels[index + 1] = current[i][j] * 5;
            pixels[index + 2] = current[i][j] * 10+100;
            pixels[index + 3] = 255
        }
    }
    updatePixels();

    //swap buffers
    let temp = previous;
    previous = current;
    current = temp

}
/*
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cols = width;
    rows = height;
    for (let i = 0; i < cols; i++) {
        current[i] = [];
        previous[i] = [];
        for (let j = 0; j < rows; j++) {
            current[i][j] = 0;
            previous[i][j] = 0;
        }
    }
    previous[100][100] = 255

}*/

function mouseDragged() {
    if(mouseX<cols&&mouseY<rows)
    current[mouseX][mouseY] = 255;

}





