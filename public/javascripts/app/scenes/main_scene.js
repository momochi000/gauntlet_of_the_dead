Crafty.scene('main', function (){
  Gauntlet.Sprites.load();
  Crafty.background("black");


  //DRAW THE MAP!
  Crafty.e("2D, DOM, TiledMapBuilder").setMapDataSource( Gauntlet.mapOne )
    .createView(0, 0, 30, 30, function() {});
    //.createWorld( function( map ){
    //  console.log("done");
    //});

  var player = Crafty.e("2D, DOM, chrisd0, PlayerControls, PlayerAnimation")
    .playerControls()
    .playerAnimation();

  Crafty.viewport.follow(player, 0, 0);
});
