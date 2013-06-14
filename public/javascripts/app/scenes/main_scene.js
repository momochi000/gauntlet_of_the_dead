Crafty.scene('main', function (){
  var camera, entities, debug;
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Gauntlet.Maps.MainMap.generateMap();
  entities = Gauntlet.Maps.MainMap.generateEntities();
  camera = Gauntlet.Maps.MainMap.generateCamera();
  debug = Gauntlet.Entities.Debug.create(camera);
  camera.followTarget(entities['player']);
});
