/* global engine, junkRenderer */
function Initialize(){
    var name = "ISS";
    var x = junkRenderer.getWidth() / 4;
    var y = 10;
    var r = 10;
    var hue = 100;
    var lit = 50;
    var sat = 50;
    spaceObjects.push(new SpaceObject(name, "", x, y, r, hue, sat, lit, 1));
}

function GameControl(){
    var interval;
    var intervalLength = 30;

    this.play = function(){
        interval = window.setInterval(gameLoop,intervalLength);
    };

    this.pause = function(){
        window.clearInterval(interval);
    };


    function gameLoop(){
        //deal with any user input


        //update Physics Engine
        engine.increment(1);


        //ask renderer to draw
        junkRenderer.update();
    }
}
