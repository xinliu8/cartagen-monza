/**
 * Pushpin
 * @namespace 
 */
var Pushpin = {
	/**
	 * Initializes the map properties
	 */
	init: function() {
		Glop.observe('cartagen:postdraw', this.draw.bindAsEventListener(this))
	},
	/**
	 * Initializes the map properties
	 */
	add: function(x, y) {
		this.x = x
		this.y = y
	},
	/**
	 * Updates the map properties. Runs every frame.
	 */
	draw: function() {
		var line_width = Math.max(1/Map.zoom,1)
		
		$C.line_width(line_width)
		$C.stroke_style('red')

		var width = line_width*4
		var height = width
		$C.stroke_rect(this.x,
					   this.y,
					   width,
					   height)
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