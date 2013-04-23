Crafty.scene('main', function (){
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Gauntlet.Maps.MainMap.render();
  var player = Crafty.e("2D, DOM, chrisd0, PlayerControls, PlayerAnimation")
    .playerControls()
    .playerAnimation();

  Crafty.viewport.follow(player, 0, 0);
});
