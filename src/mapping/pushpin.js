/**
 * Pushpin
 * @namespace 
 */
var Pushpin = Class.create({
	
	/**
	 * Initializes the map properties
	 */
	initialize: function(radius) {
		this.radius = radius;
		
		this.canvas = $('pin')
		this.ctx = this.canvas.getContext("2d")
		this.draw()
	},
	
	draw: function() {
		var ctx = this.ctx
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI*2, true)
		ctx.closePath();
		ctx.fill();
	},
	/**
	 * Updates the map properties. Runs every frame.
	 */
	move: function(x, y) {
		
		var posToDraw = {x: x, y: y}
		if( Config.draw3d) {
			var point2d = Perspective.convert3d(posToDraw);
			posToDraw = point2d;
		}
		
		// moving canvas doesn't work somehow
		//this.canvas.style.left = posToDraw.x + "px"
		//this.canvas.style.top = posToDraw.y + "px"
		
		$C.save()
		$C.line_width(1)
		$C.stroke_style('yellow')
		$C.fill_style('red')
		$C.begin_path()
		$C.translate(posToDraw.x, posToDraw.y)
		$C.arc(0, 0, this.radius, 0, Math.PI*2, true)
		$C.fill()
		$C.stroke()
		$C.restore()
	}
})