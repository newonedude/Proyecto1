import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class DetallematriculaService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  registrarDetalleMatricula(model:any):Observable<any>{
    return this.http.post<any>(this.accountService.baseUrl+'detallematriculas/registrar', model)
  }

  obtenerDetalleMatricula(id_matricula: string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'detallematriculas/'+id_matricula);
  }
}
