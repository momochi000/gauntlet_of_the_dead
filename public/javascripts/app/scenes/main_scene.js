var tiledMap;
Crafty.scene('main', function (){
  var player;
  Crafty.background("black");
  tiledMap = Crafty.e("2D, BufferedCanvas, TiledMapBuilder").setMapDataSource( test_map1 )
    .createWorld(function (map){
      console.log("Done creating tiled map builder world");
    });
  player = Crafty.e("2D, DOM, chrisd0, PlayerControls, PlayerAnimation")
    .playerControls()
    .playerAnimation();

  //Crafty.viewport.follow(player, 0,0);
});
