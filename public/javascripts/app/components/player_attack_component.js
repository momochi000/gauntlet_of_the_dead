Crafty.c("PlayerAttack", {
  init: function (){},
  playerAttack: function (){
    this._attack_hitbox = Crafty.e("2D, Collision, WiredHitBox")
      .attr({w: 64,h: 64})
      .collision();
    return this;
  },
  attack: function (){
    console.log('ATTACK: is this being called??');
    this._resetAttackHitboxLocation();
    this._checkForHit();
  },

  //private

  _attack_hitbox: null,
  _resetAttackHitboxLocation: function (){
    this._attack_hitbox.x = (this.x - this._attack_hitbox.w/2);
    this._attack_hitbox.y = (this.y - this._attack_hitbox.h/2);
    /*
    if(this.currentlyFacingUp()){
      this._attack_hitbox.y -= (this.h/2);
      this._attack_hitbox.x -= (this._attack_hitbox.w/4);
    }else if(this.currentlyFacingDown()){
      this._attack_hitbox.x -= (this.h/4);
    }else if(this.currentlyFacingLeft()){
      this._attack_hitbox.y -= (this.h/2);
      this._attack_hitbox.x -= (this.w);
    }else if(this.currentlyFacingRight()){
      this._attack_hitbox.y -= (this.h/2);
      this._attack_hitbox.x += (this.w/2);
    }
   */

      },
  _checkForHit: function (){
    console.log('CHECK FOR HIT: is this being called??');
    if(this._attack_hitbox.hit("NPC")){
      console.log("You hit the npc!!!");
    }
  }
});
