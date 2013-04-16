var Gauntlet = (function (){
  var start;

  start = function (){
    Crafty.init();
    Crafty.background("blue");
  };

  return {
    start: start
  };
})();

window.onload = function (){
  Gauntlet.start();
};
