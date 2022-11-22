import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class VolunteerService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  GetAllVoluntarios(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Voluntario/GetAllVoluntarios");
  }

  GetVoluntariosForDashboard(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Voluntario/GetVoluntariosForDashboard");
  }

  GetAllVoluntariosForTable(
    sortDirection: string,
    sortProperty: string = "",
    pageIndex: number,
    pageSize: number = 10,
    dni: string,
    nombre: string,
    apellido: string,
    edad: string,
    organizacion: string,
    provincia: string,
    ciudad: string,
    localidad: string
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
    if (organizacion) {
      params = params.set("Organizacion", organizacion);
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

    return this.httpClient.get<any>("https://localhost:5001/api/Voluntario/GetAllVoluntariosForTable", { params: params });
  }

  post(
    body: string
  ): Observable<any> {

    // ESTO VA PARA LOS POSTS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Y AHORA AGREGAR LOS HEADERS COMO PARAMETROS TAMBIEN
    return this.httpClient.post<any>("https://localhost:5001/api/Voluntario/PostVoluntario", body,  {headers: headers});
  }
}
