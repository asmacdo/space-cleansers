/* global engine, junkRenderer */
function Initialize(){
    var name = "ISS";
    var x = 200;
    var y = 0;
    var r = 10;
    var hue = 100;
    var lit = 50;
    var sat = 50;
    var xvelocity = 0;
    var yvelocity = 20;
    spaceObjects.push(new SpaceObject(name, "", x, y, r, hue, sat, lit, 1, xvelocity, yvelocity));

}

/* global engine, junkRenderer, ship */

function GameControl(){
    var interval;
    var intervalLength = 30;

    this.play = function(){
        interval = window.setInterval(gameLoop,intervalLength);
    };

    this.pause = function(){
        window.clearInterval(interval);
    };

    this.aimShip = function(x){
        ship.orientation = (ship.orientation + x)%360;
    };

    this.firePellet = function(){
        engine.firePellet(ship.orientation);
    };


    function gameLoop(){
        //deal with any user input


        //update Physics Engine
        engine.increment(1);


        //ask renderer to draw
        junkRenderer.update();
    }

    function degToRad(deg){
        return (deg * Math.PI)/180;
    }
}
