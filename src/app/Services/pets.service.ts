import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class PetsService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  getAllMascotas(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Mascotas");
  }

  getAllMascotasForTable(
    // sortDirection = "",
    // sortProperty = "",
    // pageIndex = 0,
    // pageSize = 10,
    sortDirection: string,
    sortProperty: string = "",
    pageIndex: number,
    pageSize: number = 10,
    specie: string,
    city: string,
    size: string,
    age: string
  ): Observable<any> {
    let params = new HttpParams()
      .set("PageSize", `${pageSize}`)
      .set("PageNumber", `${pageIndex}`)
      .set("SortDirection", sortDirection)
      .set("SortProperty", sortProperty);

    if (specie) {
      params = params.set("Especie", specie);
    }
    if (city) {
      params = params.set("Ciudad", city);
    }
    if (size) {
      params = params.set("Tamano", size);
    }
    if (age) {
      params = params.set("Edad", age);
    }

    return this.httpClient.get<any>("https://localhost:5001/api/Mascotas/GetAllMascotasForTable", { params: params });
  }

  getById(usuarioId: number): Observable<any> {
    return this.httpClient.get<any>(`Usuarios/${usuarioId}`);
  }

  post(body: string): Observable<void> {
    return this.httpClient.post<void>("Usuarios", body);
  }

  put(body: string): Observable<void> {
    return this.httpClient.put<void>("Usuarios", body);
  }

  delete(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`Usuarios/${userId}`);
  }
}
