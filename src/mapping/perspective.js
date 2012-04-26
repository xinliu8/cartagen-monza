/**
 * @namespace 
 */
 
var Perspective = {
	/**
	 * 
	 */
	 
	convert3d_norotate: function (point) { 
		var bbox = Map.bbox;
        var height = Projection.lat_to_y(bbox[1]) - Projection.lat_to_y(Map.bbox[3]);
        var width = Projection.lon_to_x(bbox[2]) - Projection.lon_to_x(bbox[0]);
        var center = {x: Map.x, y: Map.y - height};
		var y = height;
		var zoom = height*2;
		var point3d = {x: point.x - Map.x, y: y, z: - point.y + Map.y + height*2};
		
		var scale = zoom/point3d.z; 
		var x2d = (point3d.x * scale) + center.x; 
		var y2d = (point3d.y * scale) + center.y;
		return {x: x2d, y:y2d};
	},
	
	convert3d: function (point) { 
		var cos = Math.cos
		var sin = Math.sin
		var tan = Math.tan
		
		var d = {}
		
		var alpha = - Map.rotate;
		
		// adjust these to choose a suitable zoom level
		var height = Glop.height/2;
		
		var r = Glop.height/2;
		var screenDistRatio = 1.5;
		
		// screen position
		var s = {x:  0, y: 0, z: -r*screenDistRatio}; // relative to c
		
		// use camera as the center, first change origin
		x1 = point.x-(Map.x - r*sin(alpha))
		y1 = point.y-(Map.y+r*cos(alpha))
		
		// then rotate, different from usual x,y 
		d.x = cos(alpha)*x1 + sin(alpha) *y1
		d.z = cos(alpha)*y1 - sin(alpha)*x1
		
		d.y = -height
		
		var point2d = {}
		
		point2d.x = (d.x - s.x) * (s.z/d.z);
		point2d.y = (d.y - s.y) * (s.z/d.z); 
		
		// in this coordinate system, y is up, opposite to the canvas 
		// we want bbox center to be mapped to canvas center
		var canvasCenter = { x: Glop.width/2, y: 0};
		point2d.x = point2d.x + canvasCenter.x; 
		point2d.y = - point2d.y + canvasCenter.y; 

		return point2d;
	},
	
	convert3d_general: function (point) { 
		var height = Projection.lat_to_y(Map.bbox[1]) - Projection.lat_to_y(Map.bbox[3]);
        var center = {x: Map.x, y: Map.y - height};
		
		// http://en.wikipedia.org/wiki/3D_projection#Perspective_projection
		
		var d = {}
		var o = {x:Map.rotate, y:0, z:0}
		var p = {x: point.x, y: height, z: - point.y + height*2};
		var c = {x: Map.x, y: 0, z: - Map.y};
		var s = {x:  0, y: 0, z: height*2};
		var cos = Math.cos
		var sin = Math.sin
		d.x = cos(o.y) * (sin(o.z)*(p.y-c.y) + cos(o.z)*(p.x-c.x)) - sin(o.y) *(p.z-c.z)
		d.y = sin(o.x) * (cos(o.y)*(p.z-c.z) + sin(o.y)*(sin(o.z)*(p.y-c.y) + cos(o.z)*(p.x-c.x))) + cos(o.x)*(cos(o.z)*(p.y-c.y) - sin(o.z)*(p.x-c.x))
		d.z = cos(o.x) * ( cos(o.y)*(p.z-c.z) + sin(o.y)*(sin(o.z)*(p.y-c.y) + cos(o.z)*(p.x-c.x))) -sin(o.x)*(cos(o.z)*(p.y-c.y) - sin(o.z)*(p.x-c.x))
		
		var point2d = {}
		point2d.x = (d.x - s.x) * (s.z/d.z) + center.x; 
		point2d.y = (d.y - s.y) * (s.z/d.z) + center.y;
		
		return point2d;
	}
}
