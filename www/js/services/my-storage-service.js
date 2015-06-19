
app.factory('MyStorage', function($window) {
	// TIPS: $window.localStorage
	return {
		set : function(key, value) {
			$window.localStorage.setItem(key, value);
		},

		get : function(key, default_value) {
			return ($window.localStorage.getItem(key) || default_value);
		},

		setObject : function(key, data) {
			$window.localStorage.setItem(key, JSON.stringify(data));
		},

		getObject : function(key) {
			return JSON.parse($window.localStorage.getItem(key) || '{}');
		},

		remove : function(key) {
			$window.localStorage.removeItem(key);
		},

		clear : function() {
			$window.localStorage.clear();
		}
	};
});