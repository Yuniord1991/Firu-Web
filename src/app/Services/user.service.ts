import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { fieldVerificators } from '../Services/models/fieldVerificators.model';
import { Logged } from "./models/logged.model";

@Injectable({ providedIn: "root" })
export class UserService {

  constructor
  (
    private httpClient: HttpClient,
  )
  {}

  GetLogged(
    emailOrUser: string,
    password: string,
  ): Observable<Logged> {

    let params = new HttpParams()

    if (emailOrUser) {
      params = params.set("EmailOrUser", emailOrUser);
    }
    if (password) {
      params = params.set("Password", password);
    }

    return this.httpClient.get<Logged>("https://localhost:5001/api/Login/GetLogged", { params: params });
  }

  GetCheckingExistentFields(
    firstName: string,
    lastName: string,
    user: string,
    email: string,
  ): Observable<fieldVerificators> {

    let params = new HttpParams()

    if (firstName) {
      params = params.set("FirstName", firstName);
    }
    if (lastName) {
      params = params.set("LastName", lastName);
    }
    if (user) {
      params = params.set("UserName", user);
    }
    if (email) {
      params = params.set("Email", email);
    }
    console.log(user)
    return this.httpClient.get<fieldVerificators>("https://localhost:5001/api/Login/GetCheckingExistentFields", { params: params });
  }

  post(
    body: string
  ): Observable<any> {

    // ESTO VA PARA LOS POSTS
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Y AHORA AGREGAR LOS HEADERS COMO PARAMETROS TAMBIEN
    return this.httpClient.post<any>("https://localhost:5001/api/Login/PostUser", body,  {headers: headers});
  }

  put(body: string): Observable<void> {
    return this.httpClient.put<void>("Usuarios", body);
  }

  delete(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`Usuarios/${userId}`);
  }
}
