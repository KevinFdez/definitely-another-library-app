import { Injectable } from '@angular/core';

import { HttpModule } from './http.module';
import { AppHttpService } from './app-http-client.service';
import { Observable, Subject } from 'rxjs';
import { Book } from 'src/app/shared/models/book.model';

/**
 * Este servicio gestiona las llamadas de la entidad de libro.
 */
@Injectable({
	providedIn: HttpModule
})
export class BookService {
	private ENTITY_PATH = 'books';


	constructor(private appHttpService: AppHttpService) {
		// empty
	}

	/**
	 * Este método lanza la petición de obtener de la API los datos de la tabla de libros.
	 *
	 * @returns Devuelve un observable que se resuelve con un listado de entidades de tipo libro.
	 */
	getAllBooks(): Observable<Book[]> {
		const interfaceBridge: Subject<Book[]> = new Subject<Book[]>();

		this.appHttpService.getRequest(this.ENTITY_PATH).subscribe(
			(data: any) => {
				interfaceBridge.next(data);
				interfaceBridge.complete();
			},
			(error: any) => {
				interfaceBridge.error(error);
			}
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método lanza la petición de obtener una entidad de tipo libro dado un identificador
	 * único de libro.
	 *
	 * @param idBook identificador único de libro.
	 * @returns Devuelve un observable que se resuelve con una entidad de tipo libro.
	 */
	getBook(idBook: number): Observable<Book> {
		const interfaceBridge: Subject<Book> = new Subject<Book>();

		this.appHttpService.getRequest(this.ENTITY_PATH + '/' + idBook).subscribe(
			(data: any) => {
				interfaceBridge.next(data);
				interfaceBridge.complete();
			},
			(error: any) => {
				interfaceBridge.error(error);
			}
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método lanza la petición a la API de crear un nuevo libro.
	 *
	 * @param name nombre del nuevo libro.
	 * @param isbn ISBN del nuevo libro.
	 * @param authorId id del autor al que está asociado el nuevo libro.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	createBook(name: string, isbn: string, authorId: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		const newBook: Book = {
			id: undefined,
			name,
			isbn,
			authorId
		};

		this.appHttpService.postRequest(this.ENTITY_PATH, newBook).subscribe(
			(data: any) => {
				interfaceBridge.next(data);
				interfaceBridge.complete();
			},
			(error: any) => {
				interfaceBridge.error(error);
			}
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método lanza la petición de actualizar un libro existente con los cambios que se han
	 * realizado desde la vista de detalle del libro.
	 *
	 * @param book datos del libro modificado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	updateBook(book: Book): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();
		const updatedBook = {
			isbn: book.isbn,
			name: book.name,
			authorId: book.authorId
		}

		this.appHttpService.putRequest(this.ENTITY_PATH + '/' + book.id, updatedBook).subscribe(
			(data: any) => {
				interfaceBridge.next(data);
				interfaceBridge.complete();
			},
			(error: any) => {
				interfaceBridge.error(error);
			}
		);

		return interfaceBridge.asObservable();
	}

	/**
	 * Este método lanza la petición de eliminar un libro dado un ID de libro.
	 *
	 * @param idBook identificador único del libro.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	deleteBook(idBook: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		this.appHttpService.deleteRequest(this.ENTITY_PATH + '/' + idBook).subscribe(
			(data: any) => {
				interfaceBridge.next(data);
				interfaceBridge.complete();
			},
			(error: any) => {
				interfaceBridge.error(error);
			}
		);

		return interfaceBridge.asObservable();
	}
}
