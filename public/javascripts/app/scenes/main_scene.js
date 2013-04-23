var debug_player;

Crafty.scene('main', function (){
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Gauntlet.Maps.MainMap.render();
  var player = Crafty.e("2D, DOM, chrisd0, PlayerControls, PlayerAnimation, Collision")
    .attr({x: 10, y: 10, w: 32, h: 32})
    .playerControls()
    .playerAnimation()
    .onHit("Wall", function (){
      console.log("I HIT A WALL!!");
    });
  debug_player = player;

  Crafty.viewport.follow(player, 0, 0);
});
