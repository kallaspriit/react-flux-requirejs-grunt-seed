define([
	'AbstractActivity',
	'React',
	'jquery',
	'logger'
], function(
	AbstractActivity,
	React,
	$,
	logger
) {
	'use strict';
	
	var log = logger.get('Dispatcher');

	var Dispatcher = function() {
		this._activities = {};
	};
	
	Dispatcher.prototype.init = function(activities, container) {
		log.info('init');

		this._activities = activities;
		this._container = $(container)[0];
	};

	Dispatcher.prototype.dispatch = function(routeName, routeInfo, parameters) {
		log.info('dispatching "' + routeName + '"', routeInfo, parameters);

		var activityName = routeInfo.activity,
			activityClass = this.getActivityClassByName(activityName),
			activityInstance,
			viewComponent;

		if (activityClass === null) {
			throw new Error('Activity called "' + activityName + '" was not found, check activities.js');
		}

		activityInstance = new [activityClass][0]();

		if (!(activityInstance instanceof AbstractActivity)) {
			throw new Error('Activity "' + activityName + '" is expected to extend the AbstractActivity class');
		}

		activityInstance.onCreate();

		viewComponent = activityInstance.getView();

		if (viewComponent !== null) {
			React.renderComponent(
				viewComponent,
				this._container
			);
		} else {
			$(this._container).empty();
		}
	};

	Dispatcher.prototype.getActivityClassByName = function(name) {
		return this._activities[name] || null;
	};

    return new Dispatcher();
});