import {Client, createStubInstance, expect, StubbedInstanceWithSinonAccessor} from '@loopback/testlab';
import sinon from 'sinon';
import {LibraryApplication} from '..';
import {AuthorController} from '../controllers/author.controller';
import {Author} from '../models';
import {AuthorRepository} from '../repositories/author.repository';
import {setupApplication} from './test-helper';

describe('Author Rest Controller', () => {
	let app: LibraryApplication;
	let client: Client;
	let authorRepository: StubbedInstanceWithSinonAccessor<AuthorRepository>;

	before('setupApplication', async () => {
		({app, client} = await setupApplication());
	});

	beforeEach(givenStubbedRepository);

	function givenStubbedRepository() {
		authorRepository = createStubInstance(AuthorRepository);
	}

	/**
	 * Este método prepara un registro de tipo Author y lo devuelve.
	 */
	function createFakeAuthor(): Author {
		const author: Author = new Author();
		author.books = [];
		author.firstName = 'Luoaerd';
		author.lastName = 'gorua';
		author.id = 88;
		return author;
	}

	after(async () => {
		await app.stop();
	});

	it('Author count method returns the default number of entries from mock data', async () => {
		const response = await client.get('/authors/count')
			.expect(200)
			.expect('Content-Type', /json/);

		expect(response.body.count).to.above(0);
	});

	it('Author get by inexistent (false) ID returns undefined', async () => {
		const controller = new AuthorController(authorRepository);
		authorRepository.stubs.findById.resolves(undefined);
		const details = await controller.findById(99);

		expect(details).to.eql(undefined);
		sinon.assert.calledWithMatch(authorRepository.stubs.findById, 99);
	});

	it('Author get by ID returns one entry', async () => {
		const controller = new AuthorController(authorRepository);
		const author: Author = createFakeAuthor();
		authorRepository.stubs.findById.resolves(author);

		const details = await controller.findById(88);

		expect(details).to.eql(author);
		sinon.assert.calledWithMatch(authorRepository.stubs.findById, 88);
	});

	it('Method do not exists', async () => {
		await client.get('/authors/mas-falso-que-judas').expect(400);
	});
});
