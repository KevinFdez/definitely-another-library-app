import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
	RestExplorerBindings,
	RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

/**
 * Information from package.json
 */
export interface PackageInfo {
	name: string;
	version: string;
	description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const NODE_PRODUCTION = 'production';

const pkg: PackageInfo = require('../package.json');

export class LibraryApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {

	constructor(options: ApplicationConfig = {}) {
		super(options);

		this.setUpOpenAPISpecification(options);

		// Set up the custom sequence
		this.sequence(MySequence);

		// Set up default home page for development purposes
		if (NODE_PRODUCTION !== process.env.NODE_ENV) {
			this.static('/', path.join(__dirname, '../public'));
		}

		this.setUpRestAPIBindings(options);

		this.projectRoot = __dirname;

		this.setUpBootConventions();
	}

	/**
	 * Customize @loopback/boot Booter Conventions.
	 */
	setUpBootConventions(): void {
		this.bootOptions = {
			controllers: {
				// Customize ControllerBooter Conventions here
				dirs: ['controllers'],
				extensions: ['.controller.js'],
				nested: true,
			},
		};
	}

	/**
	 * Customize @loopback/rest-explorer configuration.
	 * @param options application configuration object.
	 */
	setUpRestAPIBindings(options: ApplicationConfig): void {
		// Rest API explorer disable
		if (options.rest.apiExplorer.disabled && (options.rest.apiExplorer.disabled === 'true')) {
			return;
		}

		this.configure(RestExplorerBindings.COMPONENT).to({
			path: '/explorer',
		});

		this.component(RestExplorerComponent);
	}

	/**
	 * Customize OpenAPI configuration.
	 * @param options application configuration object.
	 */
	setUpOpenAPISpecification(options: ApplicationConfig): void {
		this.api({
			openapi: '3.0.0',
			info: {
				title: pkg.name,
				version: pkg.version,
				contact: {
					email: 'kevinfdez.at@gmail.com',
					name: 'Kevin Fernández'
				},
				license: {
					name: 'GNU General Public License v3.0'
				},
				description: 'OpenAPI specification for Library',
				termsOfService: 'termsOfUse'
			},
			paths: {},
			servers: [{url: options.rest.protocol + '://' + options.rest.host + ':' + options.rest.port}],
		});
	}
}
