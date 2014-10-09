define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'stores',
	'React',
	'components/AppRoot'
], function(logger, ConsoleLog, SocketLog, stores, React, AppRoot) {
	'use strict';
	
	var log = logger.get('Application');

	var Application = function() {
		this.stores = {};
	};
	
	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrap');

		this._setupStores();
		this._setupAppRoot();
		this._setupDummyData();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		logger.addReporter(new SocketLog('localhost', 2222));
	};

	Application.prototype._setupStores = function() {
		this.stores = stores;
	};


	Application.prototype._setupDummyData = function() {
		this.stores.todo.addTodoItem({ text: 'first item ', isDone: true });
		this.stores.todo.addTodoItem({ text: 'second item ' });
		this.stores.todo.addTodoItem({ text: 'third item ' });
	};

	Application.prototype._setupAppRoot = function() {
		React.renderComponent(
			new AppRoot(null),
			document.getElementById('application-wrap')
		);
	};

    return Application;
});