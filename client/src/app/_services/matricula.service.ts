import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../_models/matricula';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http:HttpClient,
    private accountService: AccountService) { }

  registrarMatricula(model:any):Observable<any>{
    return this.http.post<any>(this.accountService.baseUrl+'matriculas/registrar', model)
  }

  obtenerMatriculaByDNI(dni: string): Observable<any> {
    return this.http.get<any>(this.accountService.baseUrl + 'matriculas/dniestudiante/' + dni);
  }

  obtenerMatriculaById(id_matricula:number):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'matriculas/idmatricula/'+id_matricula)
  }

  actualizar(model:any):Observable<Matricula>{
    return this.http.put<Matricula>(this.accountService.baseUrl+'matriculas/actualizar', model)
  }

  obtenerMatriculasByDNI(dni: string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'matriculas/dnimatriculas/'+ dni);
  }

  obtenerMatriculasTable():Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'matriculas/matriculastable')
  }
}
