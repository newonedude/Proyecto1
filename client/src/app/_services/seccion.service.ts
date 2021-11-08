import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System } from 'typescript';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  registrarSeccion(model: any): Observable<any> {
    return this.http.post<any>(this.accountService.baseUrl + 'secciones/registrar', model)
  }

  obtenerSeccion(id_seccion: string): Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+ 'secciones/'+id_seccion);
  }

  obtenerSecciones():Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'secciones');
  }

  obtenerSeccionesDetail(nivel:string, grado: string, seccion:string, anio:number):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'secciones/details?nivel='+nivel+'&grado='+grado+'&seccion='+seccion+'&anio='+anio);
  }
}
