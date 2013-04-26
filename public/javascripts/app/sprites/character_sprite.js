Gauntlet.Sprites = (function (){
  var load;
  
  load = function (){
     Crafty.sprite(32, 'assets/images/characters.png', {
      chrisd0: [0, 0],
      chrisd1: [1, 0],
      chrisd2: [2, 0],
      chrisl0: [0, 1],
      chrisl1: [1, 1],
      chrisl2: [2, 1],
      chrisr0: [0, 2],
      chrisr1: [1, 2],
      chrisr2: [2, 2],
      chrisu0: [0, 3],
      chrisu1: [1, 3],
      chrisu2: [2, 3],

      jayd0: [0, 4],
      jayd1: [1, 4],
      jayd2: [2, 4],
      jayl0: [0, 5],
      jayl1: [1, 5],
      jayl2: [2, 5],
      jayr0: [0, 6],
      jayr1: [1, 6],
      jayr2: [2, 6],
      jayu0: [0, 7],
      jayu1: [1, 7],
      jayu2: [2, 7]
    });
   
  };
  return {load: load};
})();
