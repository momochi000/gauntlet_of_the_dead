Crafty.scene('main', function (){
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Gauntlet.Maps.MainMap.generateMap();
  var entities = Gauntlet.Maps.MainMap.generateEntities();

  Crafty.viewport.follow(entities.player, 0, 0);
});
