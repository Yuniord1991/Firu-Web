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
}
