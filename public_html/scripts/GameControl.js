/* global engine, junkRenderer, ship */

function GameControl() {
    var interval;
    var intervalLength = 20;

    this.play = function () {
        interval = window.setInterval(gameLoop, intervalLength);
    };

    this.pause = function () {
        window.clearInterval(interval);
    };

    this.aimShip = function (x) {
        ship.orientation = (ship.orientation + x) % 360;
    };

    this.firePellet = function () {
        if (ship.pellets > 0) {
            engine.firePellet(degToRad(ship.orientation));
            ship.pellets--;
        }
    };


    function gameLoop() {
        //deal with any user input


        //update Physics Engine
        engine.increment(1);


        //ask renderer to draw
        junkRenderer.update();

        //update user viewable fields
        document.getElementById("totalPellets").innerHTML = ship.pellets;
        document.getElementById("shipMass").innerHTML = (ship.pellets * engine.pelletMass) + ship.mass;
    }


}

function degToRad(deg) {
    return (deg * Math.PI) / 180;
}
