define([
	'logviking/Logger',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'React',
	'components/AppRoot'
], function(logger, ConsoleLog, SocketLog, React, AppRoot) {
	'use strict';
	
	var log = logger.get('Application');

	var Application = function() {
	
	};
	
	Application.prototype.bootstrap = function() {
		this._setupLogger();

		log.info('bootstrap');

		this._setupAppRoot();
	};

	Application.prototype._setupLogger = function() {
		logger.addReporter(new ConsoleLog());
		logger.addReporter(new SocketLog('localhost', 2222));
	};

	Application.prototype._setupAppRoot = function() {
		React.renderComponent(
			new AppRoot(null),
			document.getElementById('application-wrap')
		);
	};

    return Application;
});