let squareSize = 400; // Size of the square
let squareX, squareY; // Position of the square's top-left corner
let redPointX, redPointY; // Position of the red point
let bluePointX, bluePointY; // Position of the blue point
let isDragging = false; // Flag to track dragging state

let stepSize = 2
let greenPointCount = 1000
let huntPointCount = 10

let stepSlider;
let greenPointCountSlider;
let huntPointSlider;

function distSq(x,y,x2,y2){
    return (x2-x)*(x2-x)+(y2-y)*(y2-y);
}
function setup() {
    createCanvas(800, 800);
    squareX = width / 2 - squareSize / 2;
    squareY = height / 2 - squareSize / 2;
    redPointX = squareX + squareSize / 2;
    redPointY = squareY + squareSize / 2;
    bluePointX = redPointX; // Initialize blue point at red point
    bluePointY = redPointY;
    
    stepSlider = createSlider(1,10,2)
    greenPointCountSlider = createSlider(0,5000,1000)
    huntPointSlider = createSlider(5,1000,10)
}

function draw() {
    stepSize = stepSlider.value()
    greenPointCount = greenPointCountSlider.value()
    huntPointCount = huntPointSlider.value()
    
    background(220);
    stroke(2)
    // Draw the square
    fill(200);
    rect(squareX, squareY, squareSize, squareSize);

    // Calculate distance between red and blue points
    let d = dist(redPointX, redPointY, bluePointX, bluePointY);

    // Draw the circle between red and blue points
    noFill();
    stroke(0);
    const circleMidX = (redPointX + bluePointX) / 2
    const circleMidY = (redPointY + bluePointY) / 2
    ellipse(circleMidX, circleMidY, d);

    // Draw the red point
    fill(255, 0, 0);
    ellipse(redPointX, redPointY, 10);

    // Draw the blue point at the cursor
    fill(0, 0, 255);
    ellipse(mouseX, mouseY, 10);
    bluePointX = mouseX
    bluePointY = mouseY

    // Check if the mouse is over the red point
    let redDist = dist(mouseX, mouseY, redPointX, redPointY);
    if (redDist < 5) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }

    // If dragging, update red point position
    if (isDragging) {
        redPointX = mouseX;
        redPointY = mouseY;
    }
    noStroke();
    
    // color in the circle by dumping random points in the square and checking if they are in the circle
    let numPoints = greenPointCount;
    for (let i = 0; i < numPoints; i++) {
        let randomAngle = random(0, 2 * PI);
        let randomRadius = random(0, d/2); 
        
        let x = circleMidX+ randomRadius * cos(randomAngle);
        let y = circleMidY + randomRadius * sin(randomAngle);
        // if point is outside the square, draw it
        if (x < squareX || x > squareX + squareSize || y < squareY || y > squareY + squareSize) {
            // no outline
            fill(0, 255, 0, );
            ellipse(x, y, 20);
        }
    }
    
    // draw random positions of the blue point which could exist where no dots above are drawn
    let step =stepSize
    for (let newBX = squareX; newBX < squareX + squareSize; newBX+=step) {
        for (let newBY = squareY; newBY < squareY + squareSize; newBY+=step) {
            let numPoints = huntPointCount;
            let foundPoint = false;
            for (let i = 0; i < numPoints; i++) {
                const newCircleMidX = (redPointX + newBX) / 2
                const newCircleMidY = (redPointY + newBY) / 2
                let randomAngle = random(0, 2 * PI); 
                let randomRadius = random(0, dist(redPointX, redPointY, newBX, newBY)/2);
                
                let x = newCircleMidX+ randomRadius * cos(randomAngle);
                let y = newCircleMidY + randomRadius * sin(randomAngle);
                // if point is outside the square, draw it
                if (x < squareX || x > squareX + squareSize || y < squareY || y > squareY + squareSize) {
                   foundPoint = true
                    break
                }
            }
            if (foundPoint) { 
                fill(0, 0, 255, );
                ellipse(newBX, newBY, 5);
            }
        }
    }
    
    fill(0);
    textSize(20);
    text("Mouse X: " + mouseX, 10, 30);
    text("Mouse Y: " + mouseY, 10, 60);
    // add sliders for points
    
    
}

function mousePressed() {
    // If the mouse is over the red point, start dragging
    let redDist = dist(mouseX, mouseY, redPointX, redPointY);
    if (redDist < 5) {
        isDragging = true;
    }
}

function mouseReleased() {
    // Stop dragging
    isDragging = false;
    redPointX = constrain(redPointX, squareX, squareX + squareSize);
    redPointY = constrain(redPointY, squareY, squareY + squareSize);
}
