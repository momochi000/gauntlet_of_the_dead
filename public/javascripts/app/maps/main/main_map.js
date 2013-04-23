Gauntlet.Maps = {};
Gauntlet.Maps.MainMap = (function() {
  var render, 
    generateBorders,
    M_WIDTH, M_HEIGHT;

  M_WIDTH = 3008;
  M_HEIGHT = 3040;


  function generateBorders() {
    Crafty.e("2D, DOM, Collision, Wall") // North Wall
      .attr({x: 0, y: 0, w: M_WIDTH, h: 2})
      .collision( new Crafty.polygon([[0,0],[M_WIDTH, 0],[M_WIDTH, 2],[0, 2]]));
    Crafty.e("2D, DOM, Collision, Wall") // East Wall
      .attr({x: M_WIDTH, y: 0, w: 2, h: M_HEIGHT})
      .collision( new Crafty.polygon([[0,0],[2, 0],[2, M_HEIGHT],[0, M_HEIGHT]]));
    Crafty.e("2D, DOM, Collision, Wall") // South Wall
      .attr({x: 0, y: M_HEIGHT, w: M_WIDTH, h: 2})
      .collision( new Crafty.polygon([[0,0],[M_WIDTH, 0],[M_WIDTH, 2],[0, 2]]));
    Crafty.e("2D, DOM, Collision, Wall")// West Wall
      .attr({x: 0, y: 0, w: 2, h: M_HEIGHT})
      .collision( new Crafty.polygon([[0,0],[2, 0],[2, M_HEIGHT],[0, M_HEIGHT]]));
  }

  render = function (){
    Crafty.e("2D, DOM, Image").image("assets/images/maps/main.png")
      .attr({w: M_WIDTH, h: M_HEIGHT});
    generateBorders();
  }
  
  return {
    render: render
  };
})();
