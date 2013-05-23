/* Camera component
 * depends on 2D, OrthoScreen
 *
 * Camera 'controller'
 * It observes the game field and size of the canvas keeping the player or
 * whatever action is to be displayed in view by moving the viewport
 * This is a wrapper for Crafty's viewport since viewport is
 * somewhat broken at the moment.  It apparently cannot handle scaling up 
 * and scrolling/panning is broken once the viewport is scaled
 */
Crafty.c('Camera', {
  _target: null,
  _target_offset: {x: 0, y: 0},

  init: function (){ 
    this.requires("OrthoScreen");
  },

  // initialize with an optional target for the camera to follow or track
  camera: function (){
    this.resetViewport();
    return this;
  },

  // Center the camera on the given entity
  centerAt: function (entity){
    var window_width, window_height, scroll_to_x, scroll_to_y, scale_factor;

    window_width = this.WindowInfo.width;
    window_height = this.WindowInfo.height;

    scroll_to_x = (window_width/2) - (entity._x + (entity._w/2)) * this._zoom;
    scroll_to_y = (window_height/2) - (entity._y + (entity._h/2)) * this._zoom;
    Crafty.viewport.scroll('x', scroll_to_x);
    Crafty.viewport.scroll('y', scroll_to_y);

    this.x = -scroll_to_x;
    this.y = -scroll_to_y;

    window_width, window_height, scroll_to_y, scroll_to_x = null, null, null, null; // DEALLOCATE
  },

  followTarget: function (target_entity){
    var component = this;
    
    this.unbind('EnterFrame');
    if( typeof(target_entity) === 'undefined' && !(typeof(this._target) === 'undefined') ){
      throw "Camera, attempting to follow a target_entity with no target entity defined";
    }else{
      this._target = target_entity;
    }
    this.bind('EnterFrame', function (){
      component.centerAt(component._target);
    });
  }

});
