//Variables
pi = Math.PI;
halfWidth = 0;
halfHeight = 0;
//main

 window.onload = function () {
    
    //set up the canvas
	canvas = document.getElementById('theCanvas');
    canvasContext = canvas.getContext('2d');
    
    // TODO maybe subtracted 10 from both values to create a empty border around the plot
    halfWidth = (canvas.width / 2);
    halfHeight = (canvas.height / 2);
    
    drawAxes();
        
    drawSIN();
    //drawCOS();

    //drawTAN();
		
}

//Draw our axes in the middle of the canvas
//TODO add axis labeles
function drawAxes () {
    
    //draw the x axis
    colourLine(10, halfHeight, canvas.width - 10, halfHeight, 'black', false);

    for(i = 0; i < 9; i++){
        var tempX = (((canvas.width - 20) / 8 ) * i)  + 10;

        colourLine(tempX, halfHeight - 4, tempX, halfHeight + 4, 'black', false);

        //we need units on the axis
        if (i == 2) {
            colourText ("π", tempX, halfHeight + 20);
        }
    }

    //draw the y axis
    colourLine(halfWidth, 10, halfWidth, canvas.height - 10, 'black', false);

    for(i = 0; i < 3; i++){
        var tempY = (((canvas.height - 20) / 2 ) * i)  + 10;

        colourLine(halfWidth - 4, tempY, halfWidth + 4, tempY, 'black', false);
    }
}

//TODO create some variables to make the maths cleaner
//The x axes should go from -2pi to +2pi and the y axes from -1 to 1
//which is why this looks complex
function drawSIN () {

    console.log("SIN button clicked");

    //Clear the canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //xScaleFactor used to adjust the x axis extents
    //In this case we want the graph to run from -2pi to +2pi
    var xScaleFactor = (1/(halfWidth - 10)) * (2*pi);
    //yScaleFactor used to adjust the y axis extents
    //In this case we want the graph to run from -1 to +1
    var yScaleFactor = (halfHeight - 10);

    drawAxes();

    //Plot the SIN wave

    for(x = -halfWidth  + 10; x < halfWidth - 10; x++)
    {
        colourLine(x, (Math.sin(x * xScaleFactor)) * yScaleFactor, 
        x + 1, (Math.sin((x + 1) * xScaleFactor)) * yScaleFactor, 'cyan', true);
    }

    //disable the SIN button
    document.getElementById("buttonSIN").disabled = true;
    //enable the COS button
    document.getElementById("buttonCOS").disabled = false;
    document.getElementById("buttonTAN").disabled = false;

}

//TODO create some variables to make the maths cleaner
//The x axes should go from -2pi to +2pi and the y axes from -1 to 1
//which is why this looks complex
function drawCOS () {
    console.log("COS button clicked");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //xScaleFactor used to adjust the x axis extents
    //In this case we want the graph to run from -2pi to +2pi
    var xScaleFactor = (1/(halfWidth - 10)) * (2*pi);
    //yScaleFactor used to adjust the y axis extents
    //In this case we want the graph to run from -1 to +1
    var yScaleFactor = (halfHeight - 10);

    drawAxes();

    for(x = -halfWidth + 10; x < halfWidth - 10; x++)
    {
        colourLine(x, (Math.cos(x * xScaleFactor)) * yScaleFactor, 
        x + 1, (Math.cos((x + 1) * xScaleFactor)) * yScaleFactor, 'red', true);
    }

    //disable the COS button
    document.getElementById("buttonCOS").disabled = true;
    document.getElementById("buttonSIN").disabled = false;
    document.getElementById("buttonTAN").disabled = false;

}

//TODO create some variables to make the maths cleaner
//The x axes should go from -2pi to +2pi and the y axes from -1 to 1
//which is why this looks complex
function drawTAN () {

    console.log("TAN button clicked");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    //xScaleFactor used to adjust the x axis extents
    //In this case we want the graph to run from -2pi to +2pi
    var xScaleFactor = (1/(halfWidth - 10)) * (2*pi);
    //yScaleFactor used to adjust the y axis extents
    //In this case we want the graph to run from -2 to +2
    var yScaleFactor = (halfHeight - 10)/2;

    drawAxes();

    for(x = -halfWidth + 10; x < halfWidth - 10; x++)
    {
        if((Math.tan(x * xScaleFactor) < halfHeight -10) && (Math.tan(x * xScaleFactor) > -halfHeight + 10)) {
            colourLine(x, (Math.tan(x * xScaleFactor)) * yScaleFactor, 
            x + 1, (Math.tan((x + 1) * xScaleFactor)) * yScaleFactor, 'red', true);
        }
        
    }

    //disable the COS button
    document.getElementById("buttonTAN").disabled = true;
    document.getElementById("buttonSIN").disabled = false;
    document.getElementById("buttonCOS").disabled = false;
}



//drawing helpers

//Draw a coloured line, 
//if origin is true transform the coordinates as if the origin was in the centre of the canvas
//if origin is false don;t transform the coordinates
function colourLine (startX, startY, endX, endY, drawColour, origin) {
	
    canvasContext.beginPath();
    
    if(origin) {
        canvasContext.moveTo(startX + canvas.width/2, startY + canvas.height/2);
        canvasContext.lineTo(endX + canvas.width/2, endY + canvas.height/2);
    } else {
        canvasContext.moveTo(startX, startY);
        canvasContext.lineTo(endX, endY);
    }
    
    canvasContext.strokeStyle = drawColour;
    canvasContext.stroke();
}

//Draw Text

function colourText (text, x, y) {
    canvasContext.font = "20px Arial";
    canvasContext.textAlign = "center";
    canvasContext.fillText (text, x, y);
}

//Draw a circle
//TODO is this required
function colourCircle (centreX, centreY, radius, drawColour) {
	canvasContext.fillStyle = drawColour;
	canvasContext.beginPath();
	canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}