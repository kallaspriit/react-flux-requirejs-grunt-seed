var Api = require('./Api'),
	Service = require('./Service'),
	api = new Api(),
	service = new Service(),
	config = {
		api: {
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'changelog'
		},
		service: {
			host: 'localhost',
			port: 8082
		}
	};

api.init(config.api);

service.init(config.service);
service.addApi(api);
service.start();