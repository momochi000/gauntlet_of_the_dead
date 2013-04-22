var Gauntlet = {};
Gauntlet.Game = (function (){
  var start;

  start = function (){
    Crafty.init(480, 480);
    Crafty.viewport.init(480, 480);
    Crafty.viewport.clampToEntities = false;
    Crafty.background("blue");
    Crafty.load([
      "assets/images/characters.png",
      "assets/images/maps/map2.png",
      "assets/images/test_tilemap1.png"
    ], function() {
      Crafty.scene('main');
    });
  };

  return {
    start: start
  };
})();

window.onload = function (){
  Gauntlet.Game.start();
};
