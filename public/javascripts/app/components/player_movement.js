Crafty.c("PlayerMovement", {
  init: function(){ },

  playerMovement: function (){
    this.facing = {
      up: false,
      down: false,
      left: false,
      right: false
    }

    this.move = {
      up: false,
      down: false,
      left: false,
      right: false
    },

    this.bind('EnterFrame', this._handleInput);
    return this;
  },

  facing: {},

  move: {},

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

  currentlyFacingUp: function() {
    return this.facing.up;
  },

  currentlyFacingDown: function() {
    return this.facing.down;
  },

  currentlyFacingLeft: function() {
    return this.facing.left;
  },

  currentlyFacingRight: function() {
    return this.facing.right;
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

  faceUp: function (){ 
    this.facing.up = true;
    this.facing.down = this.facing.left = this.facing.right = false;
  },
  faceDown: function (){ 
    this.facing.down = true;
    this.facing.up = this.facing.left = this.facing.right = false;
  },
  faceLeft: function (){ 
    this.facing.left = true;
    this.facing.down = this.facing.up = this.facing.right = false;
  },
  faceRight: function (){ 
    this.facing.right = true;
    this.facing.down = this.facing.left = this.facing.up = false;
  },

  // private
  _handleInput: function (){
    if(this.move.up) {
      this.y -= this.moveSpeed;
      this.faceUp();
      this._collideY();
    }
    if(this.move.left) {
      this.x -= this.moveSpeed;
      this.faceLeft();
      this.collideX();
    }
    if(this.move.down) {
      this.y += this.moveSpeed;
      this.faceDown();
      this._collideY();
    }
    if(this.move.right) {
      this.x += this.moveSpeed;
      this.faceRight();
      this.collideX();
    }
  },

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
