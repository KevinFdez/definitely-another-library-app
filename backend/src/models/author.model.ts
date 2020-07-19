import {Entity, hasMany, model, property} from '@loopback/repository';
import {Book} from './book.model';

@model()
export class Author extends Entity {
	@property({
		type: 'number',
		id: true,
		generated: true,
		description: 'Identificador único del registro',
	})
	id?: number;

	@property({
		type: 'string',
		required: true,
		description: 'Nombre del autor',
	})
	firstName: string;

	@property({
		type: 'string',
		required: true,
		description: 'Apelldios del autor',
	})
	lastName: string;

	@hasMany(() => Book)
	books: Book[];

	constructor(data?: Partial<Author>) {
		super(data);
	}
}

export interface AuthorRelations {
	// describe navigational properties here
}

export type AuthorWithRelations = Author & AuthorRelations;
