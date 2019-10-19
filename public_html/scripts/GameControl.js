/* global engine, junkRenderer */

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