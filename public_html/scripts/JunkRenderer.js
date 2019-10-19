/* global spaceObjects */

function JunkRenderer(canvas) {
    var self = this;
    var ctx = canvas.getContext("2d");
    setSizes();
    
    
    //background & star variables
    var backgroundColor = "black";
    var starMinLit = 70;
    var starMaxLit = 100;
    var starMinHue = 0;
    var starMaxHue = 360;
    var starSat = 100;
    var starFrequency = .001;
    var starSize = 1;
    var stars = [];
    
    //Earth
    var earthRadius = canvas.width * .1;
    var earthColor = "hsl(220,90%,50%)";
    var earthXPos = canvas.width / 2;
    var earthYPos = canvas.height / 2;
    //console.log("Earth at " + earthXPos + "," + earthYPos);
    
    var twoPi = 2*Math.PI;
    
    makeStars();
    
    this.update = function(){
        drawBackground();
        drawEarth();
        drawSpaceObjects();
    };
    
    this.getWidth = function(){
        return canvas.width;
    };
    
    this.getHeight = function(){
        return canvas.height;
    };
    
    this.getEarthX = function(){
        return earthXPos;
    };
    
    this.getEarthY = function(){
        return earthYPos;
    };

    function setSizes() {
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        //console.log("Canvas dimensions:" + canvas.width + "," + canvas.height);
    }

    function drawBackground() {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawStars();
    }

    function makeStars() {
        var numStars = canvas.width * canvas.height * starFrequency;
        var x,y,hue,sat,lit;
        for (var i = 0; i < numStars; i++) {
            x = random(0,canvas.width);
            y = random(0,canvas.height);
            hue = random(starMinHue,starMaxHue);
            sat = starSat;
            lit = random(starMinLit,starMaxLit);
            stars.push(new Star(x,y,hue,lit));
        }
    }
    
    function drawStars(){
        for(var i = 0; i < stars.length; i++){
            ctx.fillStyle = "hsl(" + stars[i].hue + "," + starSat + "%," + stars[i].lit + "%)";
            ctx.fillRect(stars[i].x,stars[i].y,starSize,starSize);
        }
    }
    
    function drawEarth(){
        ctx.fillStyle = earthColor;
        ctx.beginPath();
        ctx.arc(earthXPos,earthYPos,earthRadius,0,twoPi);
        ctx.fill();
    }
    
    function drawSpaceObjects(){
        for(var i = 0; i < spaceObjects.length; i++){
            ctx.fillStyle = "hsl(" + spaceObjects[i].hue + "," + spaceObjects[i].sat + "%," + spaceObjects[i].lit + "%)";
            //console.log(ctx.fillStyle);
            ctx.beginPath();
            ctx.arc(spaceObjects[i].x,spaceObjects[i].y,spaceObjects[i].r,0,twoPi);
            ctx.fill();
        }
    }
    

    function Star(x, y, hue, lit) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.lit = lit;
        //console.log("Made Star:" + x +"," +y + ":" + hue + "," + starSat + "," + lit);
    }
}

//function to make calling random number easier
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }