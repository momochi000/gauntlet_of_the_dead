Crafty.c("PlayerControls", {
  init: function (){
    this.moveSpeed = 3;
  },
  playerControls: function (){
    var __self = this;
    this.move = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.bind('EnterFrame', this._handleInput);

    this.bind('KeyDown', function (e){
      if(e.keyCode === Crafty.keys.W) {
        __self.move.up = true;
      }
      if(e.keyCode === Crafty.keys.A) {
        __self.move.left = true;
      }
      if(e.keyCode === Crafty.keys.S) {
        __self.move.down = true;
      }
      if(e.keyCode === Crafty.keys.D) {
        __self.move.right = true;
      }
    });

    this.bind('KeyUp', function (e){
      if(e.keyCode === Crafty.keys.W) {
        __self.move.up = false;
      }
      if(e.keyCode === Crafty.keys.A) {
        __self.move.left = false;
      }
      if(e.keyCode === Crafty.keys.S) {
        __self.move.down = false;
      }
      if(e.keyCode === Crafty.keys.D) {
        __self.move.right = false;
      }
    });
    return this;
  },
  currentlyWalking: function() {
    if(this.move.up || this.move.down || this.move.left || this.move.right) {
      return true;
    } else {
      return false;
    }
  },

  // private
  _handleInput: function (){
    if(this.move.up) {
      this.y -= this.moveSpeed;
    }
    if(this.move.left) {
      this.x -= this.moveSpeed;
    }
    if(this.move.down) {
      this.y += this.moveSpeed;
    }
    if(this.move.right) {
      this.x += this.moveSpeed;
    }
  }
});
