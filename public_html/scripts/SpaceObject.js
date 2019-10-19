function SpaceObject(name,desc,x,y,r,hue,sat,lit,mass,xvelocity,yvelocity){
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
    this.isShip = false;
    this.mass = mass;
    //console.log("new object " + name + "at:" + x + "," + y);    
}
