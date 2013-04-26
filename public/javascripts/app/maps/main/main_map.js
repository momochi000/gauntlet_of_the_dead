var debug_player;
Gauntlet.Maps = {};
Gauntlet.Maps.MainMap = (function() {
  var render, 
    generateBorders,
    generateMap,
    generateEntities,
    M_WIDTH, M_HEIGHT,
    PLAYER_SPAWN_X, PLAYER_SPAWN_Y,
    player_spawner;

  M_WIDTH = 3008;
  M_HEIGHT = 3040;

  PLAYER_SPAWN_X = 400;
  PLAYER_SPAWN_Y = 27;

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

  function createPlayerSpawner() {
    return Crafty.e("2D, PlayerSpawner")
      .attr({x: PLAYER_SPAWN_X, y: PLAYER_SPAWN_Y})
  }

  render = function (){
    Crafty.e("2D, DOM, Image").image("assets/images/maps/main.png")
      .attr({w: M_WIDTH, h: M_HEIGHT});
  }

  generateMap = function () {
    render();
    generateBorders();
  };

  generateEntities = function() {
    var player, npc, spawner;
    spawner = createPlayerSpawner();
    player = spawner.spawnPlayer();
    debug_player = player;
    npc = Crafty.e("NPC").attr({x: 200, y: 200});

    return {
      playerSpawner: spawner,
      player: player,
      npc : npc
    }
  };
  
  return {
    generateMap: generateMap,
    generateEntities: generateEntities
  };
})();
