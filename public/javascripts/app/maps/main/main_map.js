Gauntlet.Maps = {};
Gauntlet.Maps.MainMap = (function() {
  var render, M_WIDTH, M_HEIGHT;

  M_WIDTH = 3008;
  M_HEIGHT = 3040;

  render = function (){
    Crafty.e("2D, DOM, Image").image("assets/images/maps/main.png")
      .attr({w: M_WIDTH, h: M_HEIGHT});
  }
  
  return {
    render: render
  };
})();
