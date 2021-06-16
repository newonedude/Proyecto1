import { Encuesta } from './../_models/encuesta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  registrarEncuesta(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'encuestas/registrar', model)
  }

  obtenerEncuestaByIdMatricula(id_matricula:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+ 'encuestas/idmatricula/'+id_matricula)
  }

  actualizar(model:any):Observable<Encuesta>{
    return this.http.put<Encuesta>(this.baseUrl+'encuestas/actualizar',model)
  }
}
