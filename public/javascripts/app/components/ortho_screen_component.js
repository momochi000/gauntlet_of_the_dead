/* Ortho Screen component
 * depends on 2D, jQuery
 * 
 * Screen 'controller'
 * This component manages the viewport around an orthogaonal top-down game.
 * It keeps track of the dimensions of the viewport and handles resizing and
 * scaling of the viewport.
 *
 * When the viewport is scaled in Crafty, it's dimensions are altered. In order
 * to have a zoom effect within a game, the viewport must scale but the 
 * dimensions should not change.
 */

(function ($, Crafty){
  Crafty.c('OrthoScreen', {
    _zoom: 1,
    WindowInfo: null,

    init: function (){},
    orthoScreen: function () {
      this.WindowInfo = {
        height: this._getStageHeight(),
        width: this._getStageWidth()
      };
      return this;
    },

    resetViewport: function (){
      Crafty.viewport.scale(0);
      Crafty.viewport.scroll('x', 0);
      Crafty.viewport.scroll('y', 0);
      this.setWindow();
    },

    scaleViewport: function (scale){
      Crafty.viewport.scale(0);
      if(scale == 0) {
        this._zoom = 1;
      }else{
        Crafty.viewport.scale(scale);
        this._zoom = scale;
      }
      this.setWindow();
    },

    setWindow: function (newWidth, newHeight) {
      var $stage;
      if(!(typeof(newWidth) === 'undefined')){ this.WindowInfo.width = newWidth; }
      if(!(typeof(newHeight) === 'undefined')){ this.WindowInfo.height = newHeight; }
      $stage = $('#cr-stage');
      $stage.width(this.WindowInfo.width);
      $stage.height(this.WindowInfo.height);
      $stage = null;
    },

    /* toWorldCoords([x, y]) => [x,y]
     * take screen coords and return world coords.
     */
    toWorldCoords: function (screen_coords){
      return [((screen_coords[0] + this._x)/this._zoom), 
              ((screen_coords[1] + this._y)/this._zoom)];
    },

    // private
    _getStage: function (){
      return Crafty.stage;
    },
    _getStageHeight: function (){
      return this._getStage().elem.offsetHeight;
    },
    _getStageWidth: function (){
      return this._getStage().elem.offsetWidth;
    },
  });
})(jQuery, Crafty);
