import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
	name: 'internal',
	connector: 'memory',
	localStorage: '',
	file: './data/mock-data.json' // Ubicado en la raíz de proyecto, emula una DB en local
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class InternalDataSource extends juggler.DataSource
	implements LifeCycleObserver {
	static dataSourceName = 'internal';
	static readonly defaultConfig = config;

	constructor(
		@inject('datasources.config.internal', {optional: true})
		dsConfig: object = config,
	) {
		super(dsConfig);
	}
}
