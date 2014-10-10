define([
	'jquery',
	'logger'
], function($, logger) {
	'use strict';
	
	var log = logger.get('TodoItemModel');

	var TodoItemModel = function(info) {
		this.text = '';
		this.isDone = false;

		$.extend(this, info);
	};
	
	TodoItemModel.prototype.toggleIsDone = function() {
		log.info('toggling done');

		this.isDone = !this.isDone;
	};

    return TodoItemModel;
});