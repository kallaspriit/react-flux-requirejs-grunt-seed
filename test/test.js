var tests = [];

for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

// load test fixture
window.loadFixture = function(filename) {
	'use strict';

	var fixtureWrap = $('#fixture-wrap');

	// remove existing if exists
	if (fixtureWrap.length > 0) {
		fixtureWrap.remove();
	}

	fixtureWrap = $('<div></div>', {
		id: 'fixture-wrap'
	}).appendTo(document.body);

	if (typeof window.__html__[filename] !== 'string') {
		throw new Error(
			'Invalid fixture "' + filename + '" requested, expected one of: ' + Object.keys(window.__html__).join(', ')
		);
	}

	fixtureWrap.html(window.__html__[filename]);
};

// This is the equivalent of the old waitsFor/runs syntax
// which was removed from Jasmine 2
// https://gist.github.com/abreckner/110e28897d42126a3bb9
window.waitsForAndRuns = function (escapeFunction, runFunction, escapeTime) {
	'use strict';
	// check the escapeFunction every millisecond so as soon as it is met we can escape the function
	var interval = setInterval(function () {
		if (escapeFunction()) {
			clearMe();
			runFunction();
		}
	}, 1);

	// in case we never reach the escapeFunction, we will time out
	// at the escapeTime
	if (typeof escapeTime === 'number') {
		var timeOut = setTimeout(function () {
			clearMe();
			runFunction();
		}, escapeTime);
	}

	// clear the interval and the timeout
	function clearMe() {
		clearInterval(interval);
		clearTimeout(timeOut);
	}
};

require.config({

	// base url for application scripts requested without a prefix
	baseUrl: '/base/app',

	// TODO extract from app.js
	// paths configuration of source directories and components
	paths: {
		// main directories
		src: 'src',
		lib: 'lib',
		components: 'components-build',

		// library directories
		logviking: 'lib/logviking',

		// specific components
		jquery: 'lib/jquery/jquery-2.1.1.min',
		React: 'lib/react/react-with-addons',
		EventEmitter: 'lib/eventemitter/EventEmitter',
		Director: 'lib/director/director',
		AbstractActivity: 'lib/reactor/AbstractActivity',

		// shortcuts to singletons
		logger: 'lib/logviking/Logger',
		intent: 'lib/reactor/Intent',
		router: 'lib/reactor/Router',
		navi: 'lib/reactor/Navi',
		dispatcher: 'lib/reactor/Dispatcher',
		util: 'src/Util',
		config: 'config/config',
		environment: 'config/environment',
		routes: 'config/routes'
	},

	// configuration of exports and dependencies
	shim: {
		jquery: {
			exports: '$'
		},
		Director: {
			exports: 'Router'
		}
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});