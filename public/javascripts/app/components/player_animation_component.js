Crafty.c("PlayerAnimation", {
  init: function() {
    this.requires("SpriteAnimation, PlayerControls");
    this.animate("walking", 0, 0, 2);
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

    if(!this.currentlyAnimating && this.currentlyWalking()) {
      this.animate("walking", 30, -1);
      this.currentlyAnimating = true;
    }
  }
});
