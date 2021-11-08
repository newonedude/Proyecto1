import { Encuesta } from './../_models/encuesta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  registrarEncuesta(model: any): Observable<any> {
    return this.http.post<any>(this.accountService.baseUrl + 'encuestas/registrar', model)
  }

  obtenerEncuestaByIdMatricula(id_matricula:string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+ 'encuestas/idmatricula/'+id_matricula)
  }

  actualizar(model:any):Observable<Encuesta>{
    return this.http.put<Encuesta>(this.accountService.baseUrl+'encuestas/actualizar',model)
  }
}
