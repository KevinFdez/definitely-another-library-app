import {Client, expect} from '@loopback/testlab';
import {LibraryApplication} from '../';
import {setupApplication} from './test-helper';

describe('Book Rest Controller', () => {
	let app: LibraryApplication;
	let client: Client;

	before('setupApplication', async () => {
		({app, client} = await setupApplication());
	});

	after(async () => {
		await app.stop();
	});

	it('Book count method returns the default mock data', async () => {
		const response = await client.get('/books/count')
			.expect(200)
			.expect('Content-Type', /json/);

		expect(response.body.count).to.above(0);
	});
});
