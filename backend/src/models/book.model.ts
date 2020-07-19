import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Author} from './author.model';

@model()
export class Book extends Entity {
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
		description: 'Título del libro',
	})
	name: string;

	@property({
		type: 'string',
		required: true,
		description: 'Código único del libro (International Standard Book Number)',
	})
	isbn: string;

	@belongsTo(() => Author)
	authorId: number;

	constructor(data?: Partial<Book>) {
		super(data);
	}
}

export interface BookRelations {
	// describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
