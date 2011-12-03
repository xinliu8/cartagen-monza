/**
 * @namespace $D is the debuggin namespace - it has a collection of tools to debug
 *            Cartagen, and can be enabled/disabled. By default, debug mode is
 *            only enabled if "debug" is passed as true to Cartagen.setup.
 *            All $D methods have been tested in firebug and safari 4, and most work
 *            in Chrome.
 */
$D = {
	/**
	 * Controls whether $D is enabled. If disabled, none of the $D methods
	 * will do anything. Defaults to true if "console" is defined, else false.
	 * Do not set directly; use enable() and disable().
	 * @type Boolean
	 */
	enabled: false,
	
	log: Prototype.emptyFunction,
	set: function(input_debugger) {
		$D.log = input_debugger.log
		$l = $D.log
	},
	
	/**
	 * Enables $D's methods

	enable: function() {
		$D.enabled = true
		var methods = ['log', 'warn', 'error', 'info']
		
		for(var i=0; i< methods.length;i++) {
			var m = methods[i];
			$D[m] = function(mesg) { 
				var curDate = new Date().toUTCString()
				$('log').insert( '<p> ' + m + ': ' + curDate + ' mesg: ' + mesg + '</p>', { position: 'top' })
			};
		}
		
		$l = $D.log
	},

	disable: function() {
		$D.enabled = false
		
		(['log', 'warn', 'error', 'info']).each(function(m) {
			$D[m] = Prototype.emptyFunction
		})
	},*/

	object_count: function() {
		return $D.node_count() + $D.way_count() + $D.relation_count()
	},
	
	way_count: function() {
		return Geohash.objects.findAll(function(o){return o.get_type() == 'Way'}).length
	},
	
	relation_count: function() {
		return Geohash.objects.findAll(function(o){return o.get_type() == 'Relation'}).length
	},
	
	node_count: function() {
		var c = 0
		Geohash.objects.each(function(o) {
			c += o.nodes.length
		})
		return c
	}
}

/**
 * Alias for $D.log
 */
$l = $D.log
