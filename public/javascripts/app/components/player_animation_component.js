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
  },
  _handleAnimation: function() {
    if(this.currentlyAnimating && !this.currentlyWalking()) {
      this.stop();
      this.currentlyAnimating = false;
    }

    if(this.currentlyWalkingUp()) {
      this.animate("walking_up", 30, -1);
      this.currentlyAnimating = true;
    }

    if(this.currentlyWalkingDown()) {
      this.animate("walking_down", 30, -1);
      this.currentlyAnimating = true;
    }

    if(this.currentlyWalkingLeft()) {
      this.animate("walking_left", 30, -1);
      this.currentlyAnimating = true;
    }

    if(this.currentlyWalkingRight()) {
      this.animate("walking_right", 30, -1);
      this.currentlyAnimating = true;
    }
  }
});
