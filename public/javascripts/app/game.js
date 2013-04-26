var Gauntlet = {};
Gauntlet.Game = (function (){
  var start, 
      viewportWidth = 1000, 
      viewportHeight = 900;

  start = function (){
    Crafty.init(viewportWidth, viewportHeight);
    Crafty.viewport.init(viewportWidth, viewportHeight);
    Crafty.background("blue");
    Crafty.scene('main');
  };

  return {
    start: start
  };
})();

window.onload = function (){
  Gauntlet.Game.start();
};
