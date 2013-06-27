/* Debug component.  Stick this on a debug entity to have some developer 
 * controls in game. 
 */

Crafty.c('GauntletDebug', {
  _VALID_MODES_: ["Point", "Line", "Polygon"],
  _currMode: "Point",
  _points: [],

  init: function (){ },

  gauntletDebug: function (cameraRef){
    var component;

    component = this;

    if(!cameraRef){ throw "No camera entity given"; }
    this.camera = cameraRef;

    $('#cr-stage').on('mouseup', function (e) {
      if(component._currMode == "Point"){
        component.debugOutputPoint(e);
      }else if(component._currMode == "Line"){
        component.debugOutputLine(e);
      }else if(component._currMode == "Polygon"){
        click_pos = component.getClickPos(e);
        component.addPoint(click_pos);
      }else if(component._currMode == "Circle"){
        console.log("STUB -- Debug component in Circle mode -- STUB");
      }
    });

    this.bind('KeyUp', function (e){
      // We'll set up some keys to change modes.
      // Point mode: click and return x, y of the mouse
      // Line mode: click and drag to return a line object (in crafty syntax)
      // Polygon mode: press the button to start a polygon, click several
      //    points, then press the button again to output the polygon and start
      //    a new one.

      var click_pos;
      if(e.keyCode === Crafty.keys.O){ // Point mode
        component._currMode = "Point";
        console.log("==============Debug component: Point mode engaged ================");
      }
      if(e.keyCode === Crafty.keys.L){ // Line mode
        component._currMode = "Line";
        console.log("==============Debug component: Line mode engaged ================");
      }
      if(e.keyCode === Crafty.keys.P){ // Poly mode
        if(component._currMode == "Polygon"){
          component.debugOutputPolygon();
          component.clearPoints();
        }else{
          component.clearPoints();
          component._currMode = "Polygon";
        }
        console.log("==============Debug component: Polygon mode engaged ================");
      }
      if(e.keyCode === Crafty.keys.C){ // Circle mode
        component._currMode = "Circle";
        console.log("==============Debug component: Circle mode engaged ================");
      }
    });
    return this;
  },

  // private

  addPoint: function (click_pos){
    this._points.push(click_pos);
    console.log("---------A point was added-----------");
  },

  clearPoints: function () {
    this._points = [];
  },

  /* blockLine(<Array>start, <Array>end)
   * creates a wall 1 pixel wide from start to end
   * where start and end are arrays representing tile coordinates 
   * Draws a line from the upper left corner of start to the upper left corner
   * of end
   */
  blockLine: function (start, end){
    var wall, x, y, w, h, s, e, line;
    s = start;
    e = end;
    w = Math.abs(s[0] - e[0]);
    h = Math.abs(s[1] - e[1]);
    x = (s[0] <= e[0]) ? s[0] : e[0];
    y = (s[1] <= e[1]) ? s[1] : e[1];

    console.log("x: " + x + ", y: " + y + ", w: " + w + ", h: " + h);
    console.log("[0,0], " + "["+ w + "," + h + "], " + "["+ w + "," + h + "], " + "[0,0], ");

    //wall = Crafty.e("2D, Collision, Wall")
    //  .attr({x: x, y: y, w: w, h: h})
    //  .collision(new Crafty.polygon([0, 0], [w, h], [w, h], [0, 0]));
  },

  /* blockRect(rect<Array>)
   * Takes in an array of [top left tile, top right, bottom right, bottom left]
   * and creates a wall around the given rectangle
   */
  blockRect: function (rect){
    var wall, x, y, w, h, upper_left, lower_right;
    upper_left = this.tileCoordsToSceneCoords(rect[0], 'UL');
    lower_right = this.tileCoordsToSceneCoords(rect[2], 'LR');
    x = upper_left[0];
    y = upper_left[1];
    w = lower_right[0] - x;
    h = lower_right[1] - y;

    //wall = Crafty.e("2D, Collision, Wall")
    //  .attr({x: x, y: y, w: w, h: h})
    //  .collision(new Crafty.polygon(Polygon.rectangle(w, h)));
  },

  debugOutputLine: function (evt){
    var click_pos;

    click_pos = this.getClickPos(evt);

    if(this._points.length > 1){ this.clearPoints(); }
    this.addPoint(click_pos);
    if(this._points.length == 2){
      this.blockLine(this._points[0], this._points[1]);
      this.clearPoints();
    }
  },

  debugOutputPoint: function (evt){
    var click_pos;

    click_pos = this.getClickPos(evt);
    console.log("---------Point-----------");
    console.log("(" + click_pos[0] + ", " + click_pos[1] + ")");
    console.log("--------------------");
  },

  debugOutputPolygon: function (){
    var bounding_rect, poly_normalized_to_origin;
    
    console.log("---------Polygon-----------");
    this.debugPrintPoly(this._points);

    console.log("---------Bounding Rect-----------");
    bounding_rect = this.calculateBoundingRectFromPoints(this._points);
    console.log(bounding_rect);

    console.log("---------Poly after normalization-----------");
    poly_normalized_to_origin = this.translatePolyToOrigin(this._points);
    this.debugPrintPoly(poly_normalized_to_origin);

    console.log("---------Collision poly-----------");
    this.debugPrintPolyForCrafty(poly_normalized_to_origin);

    console.log("--------------------------------------------------");




  },

   /* debugPrintPoly(<Array>points)
    * print out the set of points that make up this polygon
    */
   debugPrintPoly: function (polygon){
     var itor;
     console.log("*** Polygon ***");
     for(itor=0; itor < polygon.length; itor++){
       console.log("  Point " + itor + ":  (" + polygon[itor][0] + ", "  + polygon[itor][1] + ")");
     }
     console.log("*** End Polygon ***");
   },

   debugPrintPolyForCrafty: function (polygon){
     var itor, output;
     output = "[";
     for(itor = 0; itor < polygon.length; itor++){
       output += "[";
       output += polygon[itor][0];
       output += ", ";
       output += polygon[itor][1];
       output += "]";
       if(itor+1 != polygon.length) output += ", ";
     }
     output += "]";
     console.log(output);
   },

  /* findLeftMostFromPoints(<Array>points)
   * Takes an array of points (of the form [x, y], so [[x1,y1], [x2,y2]...])
   * and finds and returns the left most point out of the array
   */
  findLeftMostFromPoints: function (points){
    var left_most, itor;
    if(points.length < 2){
      throw "ArgumentError findLeftMostFromPoints.  Less than two points given";
    }
    left_most = points[0];
    for(itor = 0; itor < points.length; itor++){
      if(points[itor][0] < left_most[0]){
        left_most = points[itor];
      }
    }
    return left_most;
  },

  findRightMostFromPoints: function (points){
    var right_most, itor;
    if(points.length < 2){
      throw "ArgumentError findLeftMostFromPoints.  Less than two points given";
    }
    right_most = points[0];
    for(itor = 0; itor < points.length; itor++){
      if(points[itor][0] > right_most[0]){
        right_most = points[itor];
      }
    }
    return right_most;
  },

  findTopMostFromPoints: function (points){
    var top_most, itor;
    if(points.length < 2) {
      throw "ArgumentError findtopMostFromPoints.  Less than two points given";
    }
    top_most = points[0];
    for(itor = 0; itor < points.length; itor++){
      if(points[itor][1] < top_most[1]){
        top_most = points[itor];
      }
    }
    return top_most;
  },

  findBottomMostFromPoints: function (points){
    var bottom_most, itor;
    if(points.length < 2) {
      throw "ArgumentError findtopMostFromPoints.  Less than two points given";
    }
    bottom_most = points[0];
    for(itor = 0; itor < points.length; itor++){
      if(points[itor][1] > bottom_most[1]){
        bottom_most = points[itor];
      }
    }
    return bottom_most;
  },

  /* calculateBoundingRectFromPoints(<Array> points)
   * Takes an array of points and returns a rectangle that contains the points.
   * The rectangle is of the form {x:_, y:_, w:_, h:_}
   */
  calculateBoundingRectFromPoints: function (points){
    var x_val, y_val, right, bottom; 
    x_val = this.findLeftMostFromPoints(points)[0];
    y_val = this.findTopMostFromPoints(points)[1];
    right = this.findRightMostFromPoints(points)[0];
    bottom = this.findBottomMostFromPoints(points)[1];

    return {
      x: x_val,
      y: y_val,
      w: (right - x_val),
      h: (bottom - y_val)
    };
  },

  getClickPos: function (evt){
    return this.getMouseCoordsOfClick(evt, $('#cr-stage'), this.camera.x, this.camera.y);
  },

  getMouseCoordsOfClick: function (evt, $stage, camera_offset_x, camera_offset_y){
    var stage_x, stage_y, click_x, click_y;
    stage_x = Math.round(evt.pageX - $stage.offset().left);
    stage_y = Math.round(evt.pageY - $stage.offset().top);
    click_x = (stage_x + camera_offset_x);
    click_y = (stage_y + camera_offset_y);
    return [click_x, click_y];
  },

  /* TO BE IMPLEMENTED
   * translatePolyToPoint(<Array> polygon, <Array> point)
   * Accepts an array of points representing a polygon and an [x, y] point
   * and returns a polygon which is translated to where [x,y] is 0,0
   * for example: if you have a square of [[10,10], [10,15], [15,15], [15,10]]
   * and you pass in a point of [5,5], the resulting polygon returned will be
   * [[5,5], [5, 10], [10, 10], [10, 5]]
   */
  //translatePolyToPoint: function (polygon, point){ },

  /* translatePolyToOrigin(<Array> polygon)
   * accepts an array of points representing a polygon.  Shifts the polygon to
   * where it's top left corner is [0,0]
   */
   translatePolyToOrigin: function (polygon){ 
     var bounding_rect, x_offset, y_offset, itor, poly_copy;

     bounding_rect = this.calculateBoundingRectFromPoints(polygon);
     poly_copy = polygon.slice(0);
     x_offset = bounding_rect.x;
     y_offset = bounding_rect.y;

     for(itor = 0; itor < poly_copy.length; itor++){
       poly_copy[itor][0] -= x_offset;
       poly_copy[itor][1] -= y_offset;
     }
     return poly_copy;
   },
});
