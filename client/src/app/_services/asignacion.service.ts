import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  obtenerAsignacionByDetail(id_seccion:string, id_curso:string, anio:string, estado:boolean):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'asignaciones/details?id_seccion='+id_seccion+'&id_curso='+id_curso+'&anio='+anio+'&estado='+estado);
  }

  registrarAsignacion(model:any):Observable<any>{
    return this.http.post<any>(this.accountService.baseUrl+'asignaciones/registrar', model)
  }
}
