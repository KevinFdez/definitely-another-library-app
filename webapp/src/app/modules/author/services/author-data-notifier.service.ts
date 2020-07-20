import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthorDataNotifierService {

	private authorDataChangeEmmiter: Subject<void>;


	constructor() {
		this.authorDataChangeEmmiter = new Subject();
	}

	/**
	 * Este método devuelve un observable de tipo subject que se encarga de notificar cuando
	 * los datos de la entidad autor han sido alterados.
	 *
	 * @returns un objeto observable de tipo subject para emitir las notificaciones.
	 */
	getAuthorDataListener(): Observable<void> {
		return this.authorDataChangeEmmiter;
	}

	/**
	 * Este método notifica al componente o componentes que estén escuchando que los datos han cambiado.
	 */
	notifyDataHasChanged(): void {
		this.authorDataChangeEmmiter.next();
	}
}
