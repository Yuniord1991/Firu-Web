import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { fieldVerificators } from './models/fieldVerificators.model';
import { Logged } from "./models/logged.model";

@Injectable({ providedIn: "root" })
export class AdopterService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  GetAllAdoptantes(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Adoptante/GetAllAdoptantes");
  }

  GetAdoptantesForDashboard(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Adoptante/GetAdoptantesForDashboard");
  }

  GetAllAdoptantesForTable(
    sortDirection: string,
    sortProperty: string = "",
    pageIndex: number,
    pageSize: number = 10,
    dni: string,
    nombre: string,
    apellido: string,
    edad: string,
    provincia: string,
    ciudad: string,
    localidad: string,
    calificacion: string,
    enEspera: string
  ): Observable<any> {
    let params = new HttpParams()
      .set("PageSize", `${pageSize}`)
      .set("PageNumber", `${pageIndex}`)
      .set("SortDirection", sortDirection)
      .set("SortProperty", sortProperty);

    if (dni) {
      params = params.set("Dni", dni);
    }
    if (nombre) {
      params = params.set("Nombre", nombre);
    }
    if (apellido) {
      params = params.set("Apellido", apellido);
    }
    if (edad) {
      params = params.set("Edad", edad);
    }
    if (provincia) {
      params = params.set("Provincia", provincia);
    }
    if (ciudad) {
      params = params.set("Ciudad", ciudad);
    }
    if (localidad) {
      params = params.set("Localidad", localidad);
    }
    if (calificacion) {
      params = params.set("Calificacion", calificacion);
    }
    if (enEspera) {
      params = params.set("EnEspera", enEspera);
    }

    return this.httpClient.get<any>("https://localhost:5001/api/Adoptante/GetAllAdoptantesForTable", { params: params });
  }

  post(
    body: string
  ): Observable<any> {

    // ESTO VA PARA LOS POSTS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Y AHORA AGREGAR LOS HEADERS COMO PARAMETROS TAMBIEN
    return this.httpClient.post<any>("https://localhost:5001/api/Adoptante/PostAdoptante", body,  {headers: headers});
  }
}
