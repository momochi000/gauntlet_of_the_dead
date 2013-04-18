Gauntlet.Sprites = (function (){
  var load;
  
  load = function (){
     Crafty.sprite(32, 'assets/images/characters.png', {
      chrisd0: [0, 0],
      chrisd1: [1, 0],
      chrisd2: [2, 0]
    });
   
  };
  return {load: load};
})();
