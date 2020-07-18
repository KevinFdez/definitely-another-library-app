import {ApplicationConfig, LibraryApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
	const app = new LibraryApplication(options);
	await app.boot();
	await app.start();

	const url = app.restServer.url;
	console.log(`Server is running at ${url}`);

	return app;
}

if (require.main === module) {
	// Run the application
	const config = {
		rest: {
			port: +(process.env.PORT ?? 3000),
			host: process.env.HOST,
			protocol: (process.env.PROTOCOL ?? 'http'),
			gracePeriodForClose: 5000, // 5 seconds
			openApiSpec: {
				setServersFromRequest: true,
			},
			apiExplorer: {
				disabled: (process.env.DISABLE_EXPLORER ?? false),
			},
			cors: {
				origin: '*',
				methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
				preflightContinue: false,
				optionsSuccessStatus: 204,
				maxAge: 86400,
				credentials: true,
			},
			expressSettings: {
				'x-powered-by': false,
				env: (process.env.NODE_ENV ?? 'development'),
			},
		},
	};
	main(config).catch(err => {
		console.error('Cannot start the application.', err);
		process.exit(1);
	});
}
