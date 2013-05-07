var Gauntlet = {};
Gauntlet.Game = (function (){
  var start;

  start = function (){
    Crafty.init(640, 480);
    Crafty.viewport.init(640, 480);
    Crafty.background("blue");
    Crafty.load(
      [
        'assets/images/characters.png', 
        'assets/maps/tilesets/test_tilemap_tileset.png'
      ], function (){}
    );
    Gauntlet.Sprites.load();
    Crafty.scene('main');
  };

  return {
    start: start
  };
})();

window.onload = function (){
  Gauntlet.Game.start();
};
