if(typeof(Gauntlet.Entities) == 'undefined'){ Gauntlet.Entities = {}; }

Gauntlet.Entities.Debug = (function (){
  var create;

  create = function (cameraRef){
    return Crafty.e("2D, GauntletDebug").gauntletDebug(cameraRef);
  };

  return { create: create };
})()
