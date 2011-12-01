/**
 * Pushpin
 * @namespace 
 */
var Pushpin = {
	
	enable: false,
	/**
	 * Initializes the map properties
	 */
	init: function() {
		Glop.observe('cartagen:postdraw', this.draw.bindAsEventListener(this))
		this.radius = 5;
	},
	/**
	 * Initializes the map properties
	 */
	add: function(x, y) {
		this.x = x
		this.y = y
		this.enable = true
	},
	/**
	 * Updates the map properties. Runs every frame.
	 */
	draw: function() {
		if(this.enable == false)
			return
			
		var line_width = Math.max(1/Map.zoom,1)
		
		$C.line_width(line_width)
		/*$C.stroke_style('red')

		var width = line_width*4
		var height = width
		$C.stroke_rect(this.x,
					   this.y,
					   width,
					   height)*/
		
		var pointToDraw = {x: this.x, y: this.y}
		if( Config.draw3d) {
			var point2d = Perspective.convert3d(pointToDraw);
			pointToDraw = point2d;
		}
		
		$C.save()
		$C.fill_style('red')
		$C.begin_path()
		$C.translate(pointToDraw.x, pointToDraw.y-this.radius)
		$C.arc(0, this.radius, this.radius, 0, Math.PI*2, true)
		$C.fill()
		$C.stroke()
		$C.restore()
	},
	
	/**
	 * X-coordinate of map's center. Set this to move the map.
	 * @type Number
	 */
	x: 0,
	/**
	 * X-coordinate of map's center. Set this to move the map.
	 * @type Number
	 */
	y: 0
}
document.observe('cartagen:init', Pushpin.init.bindAsEventListener(Pushpin))