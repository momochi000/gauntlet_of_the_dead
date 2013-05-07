/**@
* #Canvas
* @category Graphics
* @trigger Draw - when the entity is ready to be drawn to the stage - {type: "canvas", pos, co, ctx}
* @trigger NoCanvas - if the browser does not support canvas
* 
* When this component is added to an entity it will be drawn to the global canvas element. The canvas element (and hence all Canvas entities) is always rendered below any DOM entities. 
* 
* Crafty.bufferedCanvas.init() will be automatically called if it is not called already to initialize the canvas element.
*
* Create a canvas entity like this
* ~~~
* var myEntity = Crafty.e("2D, Canvas, Color").color("green")
*                                             .attr({x: 13, y: 37, w: 42, h: 42});
*~~~
*/
Crafty.c("BufferedCanvas", {
    _dirty: true,

    init: function () {
        console.log("DEBUG: Called init on BufferedCanvas component");
        if (!Crafty.bufferedCanvas.context) { Crafty.bufferedCanvas.init(); }
        if (!Crafty.canvas.context) { Crafty.canvas.init(); } //buffered canvas needs canvas

        //increment the amount of canvas objs
        Crafty.DrawManager.total2D++;
        this._dirty = true;

        this.bind("Change", function (e) {
            //if within screen, add to list
            if (this._changed === false) {
                this._changed = Crafty.DrawManager.add(e || this, this);
            } else {
                if (e) this._changed = Crafty.DrawManager.add(e, this);
            }
        });

        this.bind("Remove", function () {
            Crafty.DrawManager.total2D--;
            Crafty.DrawManager.add(this, this);
        });
    },

    /**@
    * #.draw
    * @comp Canvas
    * @sign public this .draw([[Context ctx, ]Number x, Number y, Number w, Number h])
    * @param ctx - Canvas 2D context if drawing on another canvas is required
    * @param x - X offset for drawing a segment
    * @param y - Y offset for drawing a segment
    * @param w - Width of the segment to draw
    * @param h - Height of the segment to draw
    * 
    * Method to draw the entity on the canvas element. Can pass rect values for redrawing a segment of the entity.
    */
    draw: function (ctx, x, y, w, h) {
        //console.log("DRAW called on BufferedCanvas Entity");
        //console.log("is the buffered canvas entity dirty? -> " + this._dirty);
        if (!this.ready) return;
        if (!this._dirty) return;
        if (arguments.length === 4) {
            h = w;
            w = y;
            y = x;
            x = ctx;
            ctx = Crafty.bufferedCanvas.context;
        }

        var pos = { //inlined pos() function, for speed
            _x: (this._x + (x || 0)),
            _y: (this._y + (y || 0)),
            _w: (w || this._w),
            _h: (h || this._h)
        },
            context = ctx || Crafty.bufferedCanvas.context,
            coord = this.__coord || [0, 0, 0, 0],
            co = {
            x: coord[0] + (x || 0),
            y: coord[1] + (y || 0),
            w: w || coord[2],
            h: h || coord[3]
        };

        if (this._mbr) {
            context.save();

            context.translate(this._origin.x + this._x, this._origin.y + this._y);
            pos._x = -this._origin.x;
            pos._y = -this._origin.y;

            context.rotate((this._rotation % 360) * (Math.PI / 180));
        }
        
        if(this._flipX || this._flipY) {
            context.save();
            context.scale((this._flipX ? -1 : 1), (this._flipY ? -1 : 1));
            if(this._flipX) {
                pos._x = -(pos._x + pos._w)
            }
            if(this._flipY) {
                pos._y = -(pos._y + pos._h)
            }
        }
        
        //draw with alpha
        if (this._alpha < 1.0) {
            var globalpha = context.globalAlpha;
            context.globalAlpha = this._alpha;
        }

        this.trigger("Draw", { type: "canvas", pos: pos, co: co, ctx: context });

        if (this._mbr || (this._flipX || this._flipY)) {
            context.restore();
        }
        if (globalpha) {
            context.globalAlpha = globalpha;
        }
        this._dirty = false;
        return this;
    }
});

/**@
* #Crafty.bufferedCanvas
* @category Graphics
* 
* Collection of methods to draw on canvas.
*/
Crafty.extend({
    bufferedCanvas: {
    /**@
        * #Crafty.bufferedCanvas.context
        * @comp Crafty.bufferedCanvas
        * 
        * This will return the 2D context of the main canvas element.
        * The value returned from `Crafty.bufferedCanvas._canvas.getContext('2d')`.
        */
        context: null,
        /**@
        * #Crafty.bufferedCanvas._canvas
        * @comp Crafty.bufferedCanvas
        * 
        * Main Canvas element
        */

        /**@
        * #Crafty.bufferedCanvas.init
        * @comp Crafty.bufferedCanvas
        * @sign public void Crafty.bufferedCanvas.init(void)
        * @trigger NoCanvas - triggered if `Crafty.support.canvas` is false
        * 
        * Creates a `canvas` element inside `Crafty.stage.elem`. Must be called
        * before any entities with the Canvas component can be drawn.
        *
        * This method will automatically be called if no `Crafty.bufferedCanvas.context` is
        * found.
        */
        init: function () {
            //check if canvas is supported
            console.log("DEBUG: init called on Crafty.bufferedCanvas");
            if (!Crafty.support.canvas) {
                Crafty.trigger("NoCanvas");
                Crafty.stop();
                return;
            }

            //create 3 empty canvas elements
            var c;
            c = document.createElement("canvas");
            c.width = Crafty.viewport.width;
            c.height = Crafty.viewport.height;
            c.style.position = 'absolute';
            c.style.display = 'none';
            c.style.left = "0px";
            c.style.top = "0px";

            Crafty.stage.elem.appendChild(c);
            Crafty.bufferedCanvas.context = c.getContext('2d');
            Crafty.bufferedCanvas._canvas = c;
        }
    }
});




