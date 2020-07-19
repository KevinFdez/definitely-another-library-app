import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {InternalDataSource} from '../datasources';
import {Author, Book, BookRelations} from '../models';
import {AuthorRepository} from './author.repository';

export class BookRepository extends DefaultCrudRepository<Book, typeof Book.prototype.id, BookRelations> {

	public readonly author: BelongsToAccessor<Author, typeof Book.prototype.id>;

	constructor(
		@inject('datasources.internal') dataSource: InternalDataSource,
		@repository.getter('AuthorRepository') protected authorRepositoryGetter: Getter<AuthorRepository>,
	) {
		super(Book, dataSource);
		this.author = this.createBelongsToAccessorFor('author', authorRepositoryGetter,);
		this.registerInclusionResolver('author', this.author.inclusionResolver);
	}
}
