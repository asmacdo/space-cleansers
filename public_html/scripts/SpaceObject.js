function SpaceObject(name,desc,x,y,r,hue,sat,lit,mass){
    this.name = name;
    this.dexc = desc;
    this.x = x;
    this.y = y;
    this.r = r;
    this.hue = hue;
    this.sat = sat;
    this.lit = lit;
    this.xvelocity;
    this.yvelocity;
    this.mass = mass;
    this.isShip = false;
    //console.log("new object " + name + "at:" + x + "," + y);    
}