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
}
