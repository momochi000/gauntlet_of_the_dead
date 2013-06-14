/* Debug component.  Stick this on a debug entity to have some developer 
 * controls in game. 
 */

Crafty.c('GauntletDebug', {
  _mouseX: null,
  _mouseY: null,
  init: function (){ },
  gauntletDebug: function (cameraRef){
    var component = this;
    if(!cameraRef){ throw "No camera entity given"; }
    this.camera = cameraRef;

    $('#cr-stage').on('mouseup', function (e) {
      var click_x, click_y, stage_x, stage_y, $stage;

      $stage = $(this);
      stage_x = Math.round(e.pageX - $stage.offset().left);
      stage_y = Math.round(e.pageY - $stage.offset().top);
      click_x = (stage_x + component.camera.x);
      click_y = (stage_y + component.camera.y);

      console.log("---------Mouse button clicked-----------");
      console.log("X click pos: " + click_x + ", Y click pos: " + click_y );
      console.log("--------------------");
    });
    return this;
  }
});
