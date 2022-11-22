import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class MovimientoService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  GetAllMovimientos(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Movimiento/GetAllMovimientos");
  }

  GetMovimientosForDashboard(): Observable<any> {
    // return this.httpClient.get<any>(environment.serverUrl + "/api/Mascotas");
    return this.httpClient.get<any>("https://localhost:5001/api/Movimiento/GetMovimientosForDashboard");
  }

  getAllMovimientosForTable(
    sortDirection: string,
    sortProperty: string = "",
    pageIndex: number,
    pageSize: number = 10,
    tipo: string,
    remitente: string,
    destino: string,
    motivo: string,
    fecha: Date,
    monto: string
  ): Observable<any> {
    let params = new HttpParams()
      .set("PageSize", `${pageSize}`)
      .set("PageNumber", `${pageIndex}`)
      .set("SortDirection", sortDirection)
      .set("SortProperty", sortProperty);

    if (tipo) {
      params = params.set("Tipo", tipo);
    }
    if (remitente) {
      params = params.set("Remitente", remitente);
    }
    if (destino) {
      params = params.set("Destino", destino);
    }
    if (motivo) {
      params = params.set("Motivo", motivo);
    }
    if (fecha != null) {
      params = params.set("Fecha", fecha.toISOString());
    }
    if (monto) {
      params = params.set("Monto", monto);
    }

    return this.httpClient.get<any>("https://localhost:5001/api/Movimiento/GetAllMovimientosForTable", { params: params });
  }

  post(
    body: string
  ): Observable<any> {

    // ESTO VA PARA LOS POSTS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Y AHORA AGREGAR LOS HEADERS COMO PARAMETROS TAMBIEN
    return this.httpClient.post<any>("https://localhost:5001/api/Movimiento/PostMovimiento", body,  {headers: headers});
  }
}
