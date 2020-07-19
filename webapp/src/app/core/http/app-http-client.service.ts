import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from './http.module';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

/**
 * Este servicio simplifica las llamadas a la API con métodos CRUD llevando a cabo tareas
 * de unión de URL de la API y las rutas o capilares.
 */
@Injectable({
	providedIn: HttpModule
})
export class AppHttpService {

	constructor(private httpClient: HttpClient) {
		// empty
	}

	/**
	 * Este método envía una petición GET a la URL especificada como variable de entorno y ruta
	 * que recibe como parámetro.
	 * @param path ruta a la que atacar.
	 */
	public getRequest(path: string): Observable<Object> {
		return this.httpClient.get(environment.apiUrl + path);
	}

	/**
	 * Este método envía una petición POST a la URL especificada como variable de entorno y ruta
	 * que recibe como parámetro, adjuntando el contenido del cuerpo recibido por la variable BODY.
	 * @param path ruta a la que atacar.
	 * @param body objeto con los datos a enviar.
	 */
	public postRequest(path: string, body: any): Observable<Object> {
		return this.httpClient.post(environment.apiUrl + path, body);
	}

	/**
	 * Este método envía una petición PUT a la URL especificada como variable de entorno y ruta
	 * que recibe como parámetro, adjuntando el contenido del cuerpo recibido por la variable BODY.
	 * @param path ruta a la que atacar.
	 * @param body objeto con los datos a enviar.
	 */
	public putRequest(path: string, body: any): Observable<Object> {
		return this.httpClient.put(environment.apiUrl + path, body);
	}

	/**
	 * Este método envía una petición DELETE a la URL especificada como variable de entorno y ruta
	 * que recibe como parámetro.
	 * @param path ruta a la que atacar.
	 */
	public deleteRequest(path: string): Observable<Object> {
		return this.httpClient.delete(environment.apiUrl + path);
	}

	/**
	 * Este método envía una petición PATCH a la URL especificada como variable de entorno y ruta
	 * que recibe como parámetro, adjuntando el contenido del cuerpo recibido por la variable BODY.
	 * @param path ruta a la que atacar.
	 * @param body objeto con los datos a enviar.
	 */
	public patchRequest(path: string, body: any): Observable<Object> {
		return this.httpClient.patch(environment.apiUrl + path, body);
	}
}