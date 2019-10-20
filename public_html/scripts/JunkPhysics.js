/* global spaceObjects */  //array of space objects
/* global ship, junkRenderer, game */ //the ship, it is from where pellets are fired
var KONSTANT = 20000;

function JunkPhysics() {
    var self = this;
    this.pelletMass = 4;
    this.pellet_max_speed = 2;
    var tooFar = 2000;


    this.increment = function (t) {
        //increment through all space objects and update their x and y
        for (var i = 0; i < spaceObjects.length; i++) {
            var collidesWithEarth = collides(junkRenderer.getEarthX(),junkRenderer.getEarthY(),junkRenderer.getEarthRadius(),
                                             spaceObjects[i].x,spaceObjects[i].y,spaceObjects[i].r,true);
            if(collidesWithEarth){
                spaceObjects.splice(i,1);
            }else{
                incrementObject(spaceObjects[i]);
            }
        }
        var shipCollidesWithEarth = collides(junkRenderer.getEarthX(),junkRenderer.getEarthY(),junkRenderer.getEarthRadius(),
                                             ship.x,ship.y,ship.r,false);
        if(shipCollidesWithEarth){
            console.log("ship collided with earth");
            game.pause();
            ship.hue = 0;
            junkRenderer.update();
        }else if(tooFarFromEarth(ship)){
            console.log("ship out of communications range");
            game.pause();
        }else{
            //see if ship collides with other things....
            for(var i = 0; i < spaceObjects.length; i++){
                if(collides(ship.x,ship.y,ship.r,spaceObjects[i].x,spaceObjects[i].y,spaceObjects[i].r,false) && spaceObjects[i].existedFor > 30){
                    ship.pellets += spaceObjects[i].mass / self.pelletMass;
                    spaceObjects.splice(i,1);
                }
            }
            incrementObject(ship);
        }

    };

    this.firePellet = function (theta) {
        delta_v_x = (ship.pelletPower / 100) * self.pellet_max_speed * Math.cos(degToRad(ship.orientation + 90));
        delta_v_y = (ship.pelletPower / 100) * self.pellet_max_speed * Math.sin(degToRad(ship.orientation + 90));

        delta_m_x = (ship.pelletPower / 100) * self.pellet_max_speed * self.pelletMass * Math.cos(degToRad(ship.orientation + 90));
        delta_m_y = (ship.pelletPower / 100) * self.pellet_max_speed * self.pelletMass * Math.sin(degToRad(ship.orientation + 90));

        ship_m_x = ship.mass * ship.xvelocity;
        ship_m_y = ship.mass * ship.yvelocity;

        new_m_x = ship_m_x + delta_m_x;
        new_m_y = ship_m_y + delta_m_x;

        spaceObjects.push(new SpaceObject(name, "", ship.x, ship.y, 5, 100, 50, 50, 10, ship.xvelocity - delta_v_x, ship.yvelocity - delta_v_y));
        ship.xvelocity = new_m_x / ship.mass;
        ship.yvelocity = new_m_y / ship.mass;
    };

    function incrementObject(obj) {
        radius = Math.sqrt(Math.pow(obj.x, 2) + Math.pow(obj.y, 2));

        g_accel = KONSTANT / Math.pow(radius, 2);
        g_direction = Math.atan2(obj.y, obj.x);
        obj.xvelocity = obj.xvelocity - g_accel * Math.cos(g_direction);
        obj.yvelocity = obj.yvelocity - g_accel * Math.sin(g_direction);

        obj.x = (obj.x + obj.xvelocity);
        obj.y = (obj.y + obj.yvelocity);

        obj.existedFor++;
    }

    /**
     * checks for collision between two points by testing their distance and
     * comparing that to the radius
     * @param {number} x1 x coordinate of point 1
     * @param {number} y1 y coordinate of point 1
     * @param {number} r1 raidus of object 1
     * @param {number} x2 x coordinate of point 2
     * @param {number} y2 y coordinate of point 2
     * @param {number} r2 radius of object 2
     * @return {boolean} true if it the objects collide, or if the object is too far from earth and collideAtDistance is true
     */
    function collides(x1, y1, r1, x2, y2, r2, collideAtDistance) {
        //console.log("checking for collision between " + x1 + "," + y1 + " and " + x2 + "," + y2);
        var distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
        if(collideAtDistance && distance > tooFar){
            console.log("object too far from earth");
            return true;
        }
        //console.log("distance is "+ distance);
        var radiusSize = r1 + r2;
        if (distance <= radiusSize) {
            return true;
        } else {
            return false;
        }
    }

    function tooFarFromEarth(obj){
        //earth is at 0,0, so this is assumed for now
        var distance = Math.sqrt(((obj.x)) * (obj.x) + ((obj.y) * (obj.y)));
        if(distance >= tooFar){
            return true;
        }
        return false;
    }
}

function Initialize() {
    var name = "ISS";
    var x = 200;
    var y = 0;
    var r = 10;
    var hue = 100;
    var lit = 50;
    var sat = 50;
    var xvelocity = 0;
    var yvelocity = 10;
    spaceObjects.push(new SpaceObject(name, "", x, y, r, hue, sat, lit, 1, xvelocity, yvelocity));
    for(var i = 0; i < 1000; i++){
        x = random(50,300);
        // y += random(-100,100);
        r = random(3,12);
        hue = random(0,360);
        //xvelocity = random(0,10);
        //yvelocity = random(0,10);
        spaceObjects.push(new SpaceObject(name, "", x, y, r, hue, sat, lit, 1, xvelocity, yvelocity+random(-5,5)));
    }
}

