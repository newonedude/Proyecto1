import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../_models/nota';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  registrar(model:any):Observable<Nota>{
    return this.http.post<Nota>(this.accountService.baseUrl+'notas/registrar', model)
  }

  actualizar(model:any):Observable<Nota>{
    return this.http.put<Nota>(this.accountService.baseUrl+'notas/actualizar', model)
  }

  obtenerNotaByMatricula(id_matricula:number):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'notas/bymatricula/'+id_matricula)
  }

}
