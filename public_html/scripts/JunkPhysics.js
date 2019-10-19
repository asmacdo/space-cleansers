/* global spaceObjects */  //array of space objects
/* global ship */ //the ship, it is from where pellets are fired

function incrementObject(obj){

    // var earthx = junkRenderer.getWidth() / 2;
    // var earthy = junkRenderer.getHeight() / 2;
    //
    // diff_x = obj.x - earthx
    // diff_y = obj.x - earthx
    //
    radius = Math.sqrt(Math.pow(obj.x, 2) + Math.pow(obj.y, 2))

    // console.log(radius)
    //
    var KONSTANT = 100000
    g_accel = KONSTANT / Math.pow(radius, 2)
    g_direction = Math.atan2(obj.y, obj.x)
    obj.xvelocity = obj.xvelocity - g_accel * Math.cos(g_direction)
    obj.yvelocity = obj.yvelocity - g_accel * Math.sin(g_direction)

    obj.x = (obj.x+obj.xvelocity);
    obj.y = (obj.y+obj.yvelocity);

    // console.log(diff_x)
    // console.log(diff_y)

}
function JunkPhysics(){
    this.increment = function(t){
        //increment through all space objects and update their x and y
        for(var i = 0; i < spaceObjects.length; i++){
            incrementObject(spaceObjects[i]);
        }




        //do the same for the ship


    };

    this.firePellet = function(theta){




    };

}

