import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class BookDataNotifierService {

	private bookDataChangeEmmiter: Subject<void>;


	constructor() {
		this.bookDataChangeEmmiter = new Subject();
	}

	/**
	 * Este método devuelve un observable de tipo subject que se encarga de notificar cuando
	 * los datos de la entidad libro han sido alterados.
	 *
	 * @returns un objeto observable de tipo subject para emitir las notificaciones.
	 */
	getBookDataListener(): Observable<void> {
		return this.bookDataChangeEmmiter;
	}

	/**
	 * Este método notifica al componente o componentes que estén escuchando que los datos han cambiado.
	 */
	notifyDataHasChanged(): void {
		this.bookDataChangeEmmiter.next();
	}
}
