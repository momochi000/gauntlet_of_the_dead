Crafty.scene('main', function (){
  Gauntlet.Sprites.load();
  Crafty.background("black");
  Crafty.e("2D, DOM, chrisd0, PlayerControls").
    playerControls();
});
