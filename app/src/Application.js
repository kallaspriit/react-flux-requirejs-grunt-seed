define([
	'logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'stores',
	'routes',
	'React',
	'reactor/Router',
	'components/RootComponent'
], function(logger, ConsoleLog, SocketLog, stores, routes, React, router, RootComponent) {
	'use strict';
	
	var log = logger.get('Application');

	var Application = function() {
		this._router = null;
	};
	
	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrap');

		this._setupDummyData();
		this._setupRouter();
		this._setupRootComponent();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		logger.addReporter(new SocketLog('localhost', 2222));
	};

	Application.prototype._setupDummyData = function() {
		stores.todo.addTodoItem({ text: 'first item ', isDone: true });
		stores.todo.addTodoItem({ text: 'second item ' });
		stores.todo.addTodoItem({ text: 'third item ' });
	};

	Application.prototype._setupRouter = function() {
		this._router = router;
		this._router.init(routes, this._handleRouteMatch.bind(this));
	};

	Application.prototype._setupRootComponent = function() {
		React.renderComponent(
			new RootComponent(null),
			document.getElementById('application-wrap')
		);
	};

	Application.prototype._handleRouteMatch = function(routeName, routeInfo, parameters) {
		log.info('handle route match', routeName, routeInfo, parameters);
	};

    return Application;
});