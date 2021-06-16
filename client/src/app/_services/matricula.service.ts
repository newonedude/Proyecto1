import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../_models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  registrarMatricula(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'matriculas/registrar', model)
  }

  obtenerMatriculaByDNI(dni: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'matriculas/dniestudiante/' + dni);
  }

  obtenerMatriculaById(id_matricula:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'matriculas/idmatricula/'+id_matricula)
  }

  actualizar(model:any):Observable<Matricula>{
    return this.http.put<Matricula>(this.baseUrl+'matriculas/actualizar', model)
  }
}
