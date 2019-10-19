function SpaceObject(name,desc,x,y,r,hue,sat,lit,mass, xvelocity, yvelocity){
    this.name = name;
    this.dexc = desc;
    this.x = x;
    this.y = y;
    this.r = r;
    this.hue = hue;
    this.sat = sat;
    this.lit = lit;
    this.xvelocity = xvelocity;
    this.yvelocity = yvelocity;
    this.mass = mass;
    this.isShip = false;

    this.theta = Math.atan2(this.y, this.x)
    //console.log("new object " + name + "at:" + x + "," + y);
}
