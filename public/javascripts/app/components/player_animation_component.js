Crafty.c("PlayerAnimation", {
  init: function() {
    this.requires("SpriteAnimation, PlayerControls");
    this.animate("walking_down", 0, 0, 2)
      .animate("walking_left", 0, 1, 2)
      .animate("walking_right", 0, 2, 2)
      .animate("walking_up", 0, 3, 2);
  },
  playerAnimation: function() {
    this.currentlyAnimating = false;

    this.bind('EnterFrame', this._handleAnimation);
    return this;
  },
  _handleAnimation: function() {
    if(this.currentlyAnimating && !this.currentlyWalking()) {
      this.stop();
      this.currentlyAnimating = false;
    }

    if(this.currentlyWalkingUp()) {
      if(!this.isPlaying("walking_up")){
        this.stop().animate("walking_up", 20, -1);
        this.currentlyAnimating = true;
      }
    }

    if(this.currentlyWalkingDown()) {
      if(!this.isPlaying("walking_down")){
        this.stop().animate("walking_down", 20, -1);
        this.currentlyAnimating = true;
      }
    }

    if(this.currentlyWalkingLeft()) {
      if(!this.isPlaying("walking_left")){
        this.stop().animate("walking_left", 20, -1);
        this.currentlyAnimating = true;
      }
    }

    if(this.currentlyWalkingRight()) {
      if(!this.isPlaying("walking_right")){
        this.stop().animate("walking_right", 30, -1);
        this.currentlyAnimating = true;
      }
    }
  }
});
