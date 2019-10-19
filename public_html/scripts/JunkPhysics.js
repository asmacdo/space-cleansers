/* global spaceObjects */  //array of space objects
/* global ship */ //the ship, it is from where pellets are fired

function incrementObject(obj){
    obj.x = (obj.x+obj.xvelocity);
    obj.y = (obj.y+obj.yvelocity);

    var earthx = junkRenderer.getWidth() / 2;
    var earthy = junkRenderer.getHeight() / 2;

    diff_x = obj.x - earthx
    diff_y = obj.x - earthx

    radius = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2))
    console.log(radius)

    g_accel = 9.8
    g_direction = Math.atan(diff_y, diff_x)
    obj.xvelocity = obj.xvelocity - g_accel * Math.cos(g_direction)
    obj.yvelocity = obj.yvelocity - g_accel * Math.sin(g_direction)

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

