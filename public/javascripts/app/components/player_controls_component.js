Crafty.c("PlayerControls", {
  init: function (){
    this.requires("Collision, PlayerMovementControls");
    this.moveSpeed = 3;
  },

  playerControls: function (){
    var __self = this;

    this.bind('KeyDown', function (e){
      if(e.keyCode === Crafty.keys.W || e.keyCode === Crafty.keys.UP_ARROW){
        __self.moveUp();
      }
      if(e.keyCode === Crafty.keys.A || e.keyCode === Crafty.keys.LEFT_ARROW){
        __self.moveLeft();
      }
      if(e.keyCode === Crafty.keys.S || e.keyCode === Crafty.keys.DOWN_ARROW){
        __self.moveDown();
      }
      if(e.keyCode === Crafty.keys.D || e.keyCode === Crafty.keys.RIGHT_ARROW){
        __self.moveRight();
      }
    });

    this.bind('KeyUp', function (e){
     if(e.keyCode === Crafty.keys.W || e.keyCode === Crafty.keys.UP_ARROW){
        __self.stopMoveUp();
      }
      if(e.keyCode === Crafty.keys.A || e.keyCode === Crafty.keys.LEFT_ARROW){
        __self.stopMoveLeft();
      }
      if(e.keyCode === Crafty.keys.S || e.keyCode === Crafty.keys.DOWN_ARROW){
        __self.stopMoveDown();
      }
      if(e.keyCode === Crafty.keys.D || e.keyCode === Crafty.keys.RIGHT_ARROW){
        __self.stopMoveRight();
      }

    });
    return this;
  }

});
