Crafty.c("PlayerMovement", {
  init: function(){
  },

  playerMovement: function (){
    this.bind('EnterFrame', this._handleInput);
    return this;
  },

  move: {
    up: false,
    down: false,
    left: false,
    right: false
  },

  moveUp: function(){
    this.move.up = true;
  },

  moveDown: function(){
    this.move.down = true;
  },

  moveRight: function(){
    this.move.right = true;
  },

  moveLeft: function(){
    this.move.left = true;
  },

  stopMoveUp: function(){
    this.move.up = false;
  },

  stopMoveDown: function(){
    this.move.down = false;
  },

  stopMoveRight: function(){
    this.move.right = false;
  },

  stopMoveLeft: function(){
    this.move.left = false;
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
    //this.storePosition();

    if(this.move.up) {
      this.y -= this.moveSpeed;
      this._collideY();
    }
    if(this.move.left) {
      this.x -= this.moveSpeed;
      this.collideX();
    }
    if(this.move.down) {
      this.y += this.moveSpeed;
      this._collideY();
    }
    if(this.move.right) {
      this.x += this.moveSpeed;
      this.collideX();
    }
  },

  /*
  _storePosition: function() {
    this.prevX = this.x;
    this.prevY = this.y;
  },

  _resetPosition: function() {
    this.x = this.prevX;
    this.y = this.prevY;
  },
 */

  _resetX: function() {
    this.x = this.prevX;
  },

  _resetY: function() {
    this.y = this.prevY;
  },

  _collideY: function() {
    if(this.hit("Wall")) {
      this._resetY();
    }
  },

  collideX: function() {
    if(this.hit("Wall")) {
      this._resetX();
    }
  }


});
