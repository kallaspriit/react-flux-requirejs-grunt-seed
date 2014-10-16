var Api = require('./Api'),
	Service = require('./Service'),
	api = new Api(),
	service = new Service(),
	config = {
		service: {
			host: 'localhost',
			port: 8082
		}
	};


service.init(config.service);
service.addApi(api);
service.start();