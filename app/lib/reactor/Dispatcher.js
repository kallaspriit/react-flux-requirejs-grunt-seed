define([
	'AbstractActivity',
	'React',
	'jquery',
	'logger',
	'util'
], function(
	AbstractActivity,
	React,
	$,
	logger,
	util
) {
	'use strict';
	
	var log = logger.get('Dispatcher');

	var Dispatcher = function() {
		this._activities = {};
		this._active = {
			routeName: null,
			routeInfo: null,
			routeParameters: null,
			activityInstance: null
		};
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
			existingActivityExists = this._active.routeInfo !== null,
			matchedExistingActivity = false,
			updatedExistingActivity = false,
			activityInstance,
			viewComponent;

		parameters = util.normalizeType(parameters);

		if (activityClass === null) {
			throw new Error('Activity called "' + activityName + '" was not found, check activities.js');
		}

		if (existingActivityExists) {
			if (this._active.routeInfo.activity === routeInfo.activity) {
				log.info('already active activity requested');

				matchedExistingActivity = true;

				if (typeof this._active.activityInstance.onUpdate === 'function') {
					this._active.activityInstance.onUpdate.apply(this._active.activityInstance, parameters);

					updatedExistingActivity = true;
				}
			}
		}

		if (updatedExistingActivity) {
			activityInstance = this._active.activityInstance;
		} else {
			if (existingActivityExists && !matchedExistingActivity) {
				this._active.activityInstance.onDestroy.apply(
					this._active.activityInstance,
					[routeName, routeInfo, parameters]
				);
			}

			activityInstance = new [activityClass][0]();

			if (!(activityInstance instanceof AbstractActivity)) {
				throw new Error('Activity "' + activityName + '" is expected to extend the AbstractActivity class');
			}

			activityInstance.onCreate.apply(activityInstance, parameters);
		}

		this._active = {
			routeName: routeName,
			routeInfo: routeInfo,
			routeParameters: parameters,
			activityInstance: activityInstance
		};

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