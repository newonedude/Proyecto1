import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  registrarEstudiante(model: any):Observable<any> {
    return this.http.post<any>(this.accountService.baseUrl + 'estudiantes/registrar', model)
  }

  obtenerEstudiante(id_estudiante: string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'estudiantes/'+id_estudiante);
  }

  obtenerEstudianteByUserId(id_usuario:string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'estudiantes/iduser/'+id_usuario);
  }
}
