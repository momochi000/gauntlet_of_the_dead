var Gauntlet = {};
Gauntlet.Game = (function (){
  var start, 
      viewportWidth = 640, 
      viewportHeight = 480;

  start = function (){
    Crafty.init(viewportWidth, viewportHeight);
    Crafty.background("blue");
    Crafty.viewport.init(viewportWidth, viewportHeight);
    Crafty.scene('main');
  };

  return {
    start: start
  };
})();

window.onload = function (){
  Gauntlet.Game.start();
};
