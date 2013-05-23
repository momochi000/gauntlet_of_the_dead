Crafty.scene('main', function (){
  var camera, entities;
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Gauntlet.Maps.MainMap.generateMap();
  entities = Gauntlet.Maps.MainMap.generateEntities();
  camera = Gauntlet.Maps.MainMap.generateCamera();

  camera.followTarget(entities['player']);
});
