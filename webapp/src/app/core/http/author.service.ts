import { Injectable } from '@angular/core';

import { HttpModule } from './http.module';
import { AppHttpService } from './app-http-client.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Author } from 'src/app/shared/models/author.model';

/**
 * Este servicio gestiona las llamadas de la entidad de autor.
 */
@Injectable({
	providedIn: HttpModule
})
export class AuthorService {
	private ENTITY_PATH = 'authors';



	constructor(private appHttpService: AppHttpService) {
		// empty
	}

	/**
	 * Este método lanza la petición de obtener de la API los datos de la tabla de autores.
	 *
	 * @returns Devuelve un observable que se resuelve con un listado de entidades de tipo autor.
	 */
	getAllAuthors(): Observable<Author[]> {
		const interfaceBridge: Subject<Author[]> = new Subject<Author[]>();

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
	 * Este método lanza la petición de obtener una entidad de tipo autor dado un identificador
	 * único de autor.
	 *
	 * @param idAuthor identificador único de autor.
	 * @returns Devuelve un observable que se resuelve con una entidad de tipo autor.
	 */
	getAuthor(idAuthor: number): Observable<Author> {
		const interfaceBridge: Subject<Author> = new Subject<Author>();

		this.appHttpService.getRequest(this.ENTITY_PATH + '/' + idAuthor).subscribe(
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
	 * Este método lanza la petición a la API de crear un nuevo autor.
	 *
	 * @param firstName nombre del nuevo autor.
	 * @param lastName apellidos del nuevo autor.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	createAuthor(firstName: string, lastName: string, authorId: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		const newAuthor: Author = {
			id: undefined,
			firstName,
			lastName
		};

		this.appHttpService.postRequest(this.ENTITY_PATH, newAuthor).subscribe(
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
	 * Este método lanza la petición de actualizar un autor existente con los cambios que se han
	 * realizado desde la vista de detalle del autor.
	 *
	 * @param author datos del autor modificado.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	updateAuthor(author: Author): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		this.appHttpService.putRequest(this.ENTITY_PATH + '/' + author.id, author).subscribe(
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
	 * Este método lanza la petición de eliminar un autor dado un ID de autor.
	 *
	 * @param idAuthor identificador único del autor.
	 * @returns Devuelve un observable que se resuelve para indicar que la acción ha sido completada.
	 */
	deleteAuthor(idAuthor: number): Observable<void> {
		const interfaceBridge: Subject<any> = new Subject<any>();

		this.appHttpService.deleteRequest(this.ENTITY_PATH + '/' + idAuthor).subscribe(
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
