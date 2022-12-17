import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { fieldVerificators } from './models/fieldVerificators.model';
import { Logged } from "./models/logged.model";

@Injectable({ providedIn: "root" })
export class AdopterEsperaService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  GetAdoptantesEsperaForDashboard(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/AdoptanteEspera/GetAdoptantesEsperaForDashboard");
  }

  GetAllAdoptantesEsperaForTable(
    sortDirection: string,
    sortProperty: string = "",
    pageIndex: number,
    pageSize: number = 10,
    nombre: string,
    telefono: string,
    ciudad: string,
    especie: string,
    raza: string,
    tamano: string,
    color: string,
    edad: number
  ): Observable<any> {
    let params = new HttpParams()
      .set("PageSize", `${pageSize}`)
      .set("PageNumber", `${pageIndex}`)
      .set("SortDirection", sortDirection)
      .set("SortProperty", sortProperty);

    if (nombre) {
      params = params.set("Nombre", nombre);
    }
    if (telefono) {
      params = params.set("Telefono", telefono);
    }
    if (ciudad) {
      params = params.set("Ciudad", ciudad);
    }
    if (especie) {
      params = params.set("Especie", especie);
    }
    if (raza) {
      params = params.set("Raza", raza);
    }
    if (tamano) {
      params = params.set("Tamano", tamano);
    }
    if (color) {
      params = params.set("Color", color);
    }
    if (edad) {
      params = params.set("Edad", `${edad}`);
    }

    return this.httpClient.get<any>("https://localhost:5001/api/AdoptanteEspera/GetAllAdoptantesEsperaForTable", { params: params });
  }

  post(
    body: string
  ): Observable<any> {

    // ESTO VA PARA LOS POSTS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Y AHORA AGREGAR LOS HEADERS COMO PARAMETROS TAMBIEN
    return this.httpClient.post<any>("https://localhost:5001/api/AdoptanteEspera/PostAdoptanteEspera", body,  {headers: headers});
  }
}
