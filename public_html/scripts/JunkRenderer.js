/* global spaceObjects, ship */

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
    var earthRadius = canvas.width * .08;
    var earthColor = "hsl(220,90%,50%)";
    var earthXPos = 0;
    var earthYPos = 0;
    var earthBlobs = [];
    var numBlobs = earthRadius * 0.3;
    //console.log("Earth at " + earthXPos + "," + earthYPos);
    
    var twoPi = 2*Math.PI;
    
    makeStars();
    makeEarthBlobs();
    
    this.update = function(){
        drawBackground();
        drawEarth();
        drawSpaceObjects();
        //drawShip();
        drawTriangleShip();
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
    
    this.getEarthRadius = function(){
        return earthRadius;
    };

    function setSizes() {
        canvas.width = canvas.getBoundingClientRect().width;
        canvas.height = canvas.getBoundingClientRect().height;
        ctx.translate(canvas.width/2,canvas.height/2);
        //console.log("Canvas dimensions:" + canvas.width + "," + canvas.height);
    }

    function drawBackground() {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(canvas.width/-2, canvas.height/-2, canvas.width, canvas.height);
        drawStars();
    }

    function makeStars() {
        var numStars = canvas.width * canvas.height * starFrequency;
        var x,y,hue,sat,lit;
        for (var i = 0; i < numStars; i++) {
            x = random(canvas.width/-2,canvas.width/2);
            y = random(canvas.height/-2,canvas.height/2);
            hue = random(starMinHue,starMaxHue);
            sat = starSat;
            lit = random(starMinLit,starMaxLit);
            stars.push(new Star(x,y,hue,lit));
        }
    }
    
    function makeEarthBlobs(){
        for(var i = 0; i < numBlobs; i++){
            var x = random(earthXPos - earthRadius/2,earthXPos + earthRadius/2);
            var y = random(earthYPos - earthRadius/2,earthYPos + earthRadius/2);
            earthBlobs.push(new EarthBlob(x,y,random(3,15)));
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
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(earthXPos,earthYPos,earthRadius,degToRad(70),degToRad(110));
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(earthXPos,earthYPos,earthRadius,degToRad(250),degToRad(290));
        ctx.fill();
        
        ctx.fillStyle="green";
        for(var i = 0; i < earthBlobs.length; i++){
            ctx.beginPath();
            ctx.arc(earthBlobs[i].x,earthBlobs[i].y,earthBlobs[i].r,0,twoPi);
            ctx.fill();
        }
        
        
        
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
    
    function drawShip(){
        ctx.fillStyle = "hsl(" + ship.hue + "," + ship.sat + "%," + ship.lit + "%)";
        var theta = degToRad(ship.orientation);
        var p1 = rotatePoint(ship.x - ship.r,ship.y - ship.r*2,theta,ship.x,ship.y);
        var p2 = rotatePoint(ship.x + ship.r,ship.y - ship.r*2,theta,ship.x,ship.y);
        var p3 = rotatePoint(ship.x + ship.r,ship.y + ship.r*2,theta,ship.x,ship.y);
        var p4 = rotatePoint(ship.x - ship.r,ship.y + ship.r*2,theta,ship.x,ship.y);
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1]);//console.log("Moving to " + p1[0] + "," + p1[1]);        
        ctx.lineTo(p2[0],p2[1]);//console.log("Line to " + p2[0] + "," + p2[1]);
        ctx.lineTo(p3[0],p3[1]);//console.log("Line to " + p3[0] + "," + p3[1]);
        ctx.lineTo(p4[0],p4[1]);//console.log("Line to " + p4[0] + "," + p4[1]);
        ctx.lineTo(p1[0],p1[1]);//console.log("Line to " + p1[0] + "," + p1[1]);
        ctx.fill();
    }
    
    function drawTriangleShip(){
        ctx.fillStyle = "hsl(" + ship.hue + "," + ship.sat + "%," + ship.lit + "%)";
        var theta = degToRad(ship.orientation);
        var p1 = rotatePoint(ship.x,ship.y - ship.r*2,theta,ship.x,ship.y);
        var p2 = rotatePoint(ship.x + ship.r,ship.y + ship.r*2,theta,ship.x,ship.y);
        var p3 = rotatePoint(ship.x - ship.r,ship.y + ship.r*2,theta,ship.x,ship.y);
        ctx.beginPath();
        ctx.moveTo(p1[0],p1[1]);//console.log("Moving to " + p1[0] + "," + p1[1]);        
        ctx.lineTo(p2[0],p2[1]);//console.log("Line to " + p2[0] + "," + p2[1]);
        ctx.lineTo(p3[0],p3[1]);//console.log("Line to " + p3[0] + "," + p3[1]);
        ctx.lineTo(p1[0],p1[1]);//console.log("Line to " + p1[0] + "," + p1[1]);
        ctx.fill();
    }
    
    function rotatePoint(x,y,theta,cx,cy){
        var tempx = x - cx;
        var tempy = y - cy;
        var rx = tempx * Math.cos(theta) - tempy * Math.sin(theta);
        var ry = tempx * Math.sin(theta) + tempy * Math.cos(theta);
        return [rx + cx,ry + cy];
    }
    

    function Star(x, y, hue, lit) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.lit = lit;
        //console.log("Made Star:" + x +"," +y + ":" + hue + "," + starSat + "," + lit);
    }
    
    function EarthBlob(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        //console.log("EarthBlob " + x + "," + y + " " + r);
    }
}

//function to make calling random number easier
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }