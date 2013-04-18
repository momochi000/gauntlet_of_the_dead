var Gauntlet = {};
Gauntlet.Game = (function (){
  var start;

  start = function (){
    Crafty.init();
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
