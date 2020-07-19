import {
	Client, createRestAppClient,
	givenHttpServerConfig
} from '@loopback/testlab';
import {LibraryApplication} from '../';

export async function setupApplication(): Promise<AppWithClient> {
	const restConfig = givenHttpServerConfig({
		// Customize the server configuration here.
		// Empty values (undefined, '') will be ignored by the helper.
		//
		// host: process.env.HOST,
		// port: +process.env.PORT,
	});

	// Configuración adicional de la App no contemplada en configuración REST
	Object.assign(
		restConfig,
		{
			apiExplorer: {
				disabled: false
			}
		}
	);

	const app = new LibraryApplication({
		rest: restConfig,
	});

	await app.boot();
	await app.start();

	const client = createRestAppClient(app);

	return {app, client};
}

export interface AppWithClient {
	app: LibraryApplication;
	client: Client;
}
