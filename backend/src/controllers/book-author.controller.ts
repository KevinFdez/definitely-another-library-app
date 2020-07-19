import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Author, Book} from '../models';
import {BookRepository} from '../repositories';

export class BookAuthorController {
	constructor(
		@repository(BookRepository) public bookRepository: BookRepository,
	) {}

	@get('/books/{id}/author', {
		responses: {
			'200': {
				description: 'Author belonging to Book',
				content: {
					'application/json': {
						schema: {type: 'array', items: getModelSchemaRef(Author)},
					},
				},
			},
		},
	})
	async getAuthor(
		@param.path.number('id') id: typeof Book.prototype.id,
	): Promise<Author> {
		return this.bookRepository.author(id);
	}
}
