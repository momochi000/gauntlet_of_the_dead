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
  currentlyWalkingUp: function() {
    return this.move.up;
  },
  currentlyWalkingDown: function() {
    return this.move.down;
  },
  currentlyWalkingLeft: function() {
    return this.move.left;
  },
  currentlyWalkingRight: function() {
    return this.move.right;
  },

  // private
  _handleInput: function (){
    this.storePosition();

    if(this.move.up) {
      this.y -= this.moveSpeed;
      this.collideY();
    }
    if(this.move.left) {
      this.x -= this.moveSpeed;
      this.collideX();
    }
    if(this.move.down) {
      this.y += this.moveSpeed;
      this.collideY();
    }
    if(this.move.right) {
      this.x += this.moveSpeed;
      this.collideX();
    }
  },

  storePosition: function() {
    this.prevX = this.x;
    this.prevY = this.y;
  },

  resetPosition: function() {
    this.x = this.prevX;
    this.y = this.prevY;
  },

  resetX: function() {
    this.x = this.prevX;
  },

  resetY: function() {
    this.y = this.prevY;
  },

  collideY: function() {
    if(this.hit("Wall")) {
      this.resetY();
    }
  },

  collideX: function() {
    if(this.hit("Wall")) {
      this.resetX();
    }
  }
});
