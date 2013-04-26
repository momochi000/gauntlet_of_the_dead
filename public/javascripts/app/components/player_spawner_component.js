Crafty.c("PlayerSpawner", {
  init: function (){ },
  playerSpawner: function (){ },
  spawnPlayer: function (){
    return Crafty.e("2D, DOM, chrisd0, PlayerMovement, PlayerControls, PlayerAnimation, Collision")
      .attr({x: this.x, y: this.y, w: 32, h: 32})
      .playerMovement()
      .playerControls()
      .playerAnimation();
  }
});
