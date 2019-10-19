/* global spaceObjects */  //array of space objects
/* global ship */ //the ship, it is from where pellets are fired
var KONSTANT = 20000;

function JunkPhysics(){
    var self = this;
    this.pelletMass = 4;
    this.pellet_speed = 2;

    this.increment = function(t){
        //increment through all space objects and update their x and y
        for(var i = 0; i < spaceObjects.length; i++){
            incrementObject(spaceObjects[i]);
        }
        incrementObject(ship);

        //do the same for the ship


    };

    this.firePellet = function(theta){

        // console.log(ship.orientation)
        delta_v_x = self.pellet_speed * Math.cos(degToRad(ship.orientation + 90))
        delta_v_y = self.pellet_speed * Math.sin(degToRad(ship.orientation + 90))

        ship_m_x = ship.mass * ship.xvelocity
        ship_m_y = ship.mass * ship.yvelocity

        delta_m_x = self.pellet_speed * self.pelletMass * Math.cos(degToRad(ship.orientation + 90))
        delta_m_y = self.pellet_speed * self.pelletMass * Math.sin(degToRad(ship.orientation + 90))

        new_m_x = ship_m_x + delta_m_x
        new_m_y = ship_m_y + delta_m_x



        spaceObjects.push(new SpaceObject(name, "", ship.x, ship.y, 5, 100, 50, 50, 1, ship.xvelocity-delta_v_x, ship.yvelocity-delta_v_y));
        ship.xvelocity = new_m_x / ship.mass
        ship.yvelocity = new_m_y / ship.mass

    };

}

function Initialize(){
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
}


function incrementObject(obj){

    radius = Math.sqrt(Math.pow(obj.x, 2) + Math.pow(obj.y, 2))

    g_accel = KONSTANT / Math.pow(radius, 2)
    g_direction = Math.atan2(obj.y, obj.x)
    obj.xvelocity = obj.xvelocity - g_accel * Math.cos(g_direction)
    // console.log(obj.xvelocity)
    obj.yvelocity = obj.yvelocity - g_accel * Math.sin(g_direction)

    obj.x = (obj.x+obj.xvelocity);
    obj.y = (obj.y+obj.yvelocity);
    // console.log(obj.x)
}
