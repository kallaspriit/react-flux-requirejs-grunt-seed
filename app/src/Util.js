define([
], function(
) {
	'use strict';
	
	return {
		/**
		 * Normalizes object value types from generic string to int/float/boolean if possible.
		 *
		 * @method normalizeType
		 * @param {*} param Variable to normalize
		 * @return {*}
		 */
		normalizeType: function(param) {
			if (typeof param === 'string') {
				if (parseInt(param, 10) == param) {
					return parseInt(param, 10);
				} else if (parseFloat(param) == param) {
					return parseFloat(param);
				} else if (param.toLowerCase(param) === 'true') {
					return true;
				} else if (param.toLowerCase(param) === 'false') {
					return false;
				} else if (param.toLowerCase(param) === 'null') {
					return null;
				} else {
					return param;
				}
			} else if (typeof param === 'object' && param !== null) {
				for (var key in param) {
					if (!param.hasOwnProperty(key)) {
						continue;
					}

					param[key] = this.normalizeType(param[key]);
				}

				return param;
			} else if (param instanceof Array) {
				for (var i = 0; i < param.length; i++) {
					param[i] = this.normalizeType(param[i]);
				}

				return param;
			} else {
				return param;
			}
		}
	};
});