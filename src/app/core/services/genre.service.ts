import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ApiResponse } from "../interfaces/api-response.interface";
import { IGenre } from "../interfaces/genre.interface";

@Injectable({
	providedIn: "root",
})
export class GenreService {
	private readonly HTTP_OPTIONS_JSON_RESPONSE = {
		observe: "response" as const,
	};

	constructor(private readonly http: HttpClient) { }

	getAll(): Observable<IGenre[] | null> {
		const url = `http://localhost:8080/ps/physical-storage-management/possr/api/genres/v1/getAll`;

		return this.http.get<ApiResponse<IGenre[]>>(url, this.HTTP_OPTIONS_JSON_RESPONSE).pipe(
			map((httpResponse: HttpResponse<ApiResponse<IGenre[]>>) => {
				if (httpResponse.status === 204 || !httpResponse.body) {
					console.warn(`API respondió ${httpResponse.status} sin contenido. Devolviendo null.`);
					return null;
				}

				const apiResponse = httpResponse.body;

				if (apiResponse.meta.statusCode !== 200) {
					const errorMessage = apiResponse.meta.status || apiResponse.meta.message || "Error interno de la API.";
					throw new Error(errorMessage);
				}
				return apiResponse.data;
			}),

			catchError((error) => {
				console.error("Error en el servicio de generos:", error);
				const userMessage = error instanceof Error ? error.message : "Fallo de conexión o red.";
				return throwError(() => new Error(userMessage));
			})
		);
	}
}