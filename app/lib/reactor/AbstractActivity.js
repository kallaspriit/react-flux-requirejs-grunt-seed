define([
], function(
) {
	'use strict';

	var AbstractActivity = function() {
		this._viewComponent = null;
	};
	
	AbstractActivity.prototype.onCreate = function() {
		throw new Error('Please override onCreate() in your activity class');
	};

	AbstractActivity.prototype.onUpdate = null;

	AbstractActivity.prototype.onDestroy = function() {
		// do nothing by default
	};

	AbstractActivity.prototype.setView = function(componentInstance) {
		/*if (this._viewComponent !== null) {
			throw new Error('View to render is already set, you should not set it multiple times');
		}*/

		this._viewComponent = componentInstance;
	};

	AbstractActivity.prototype.getView = function() {
		return this._viewComponent;
	};

    return AbstractActivity;
});