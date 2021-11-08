import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  autorizarAlumno(id_matricula:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'matriculas/autorizar/'+id_matricula);
  }

}
