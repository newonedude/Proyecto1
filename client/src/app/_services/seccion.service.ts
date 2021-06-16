import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { System } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  registrarSeccion(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'secciones/registrar', model)
  }

  obtenerSeccion(id_seccion: string): Observable<any>{
    return this.http.get<any>(this.baseUrl+ 'secciones/'+id_seccion);
  }

  obtenerSecciones():Observable<any>{
    return this.http.get<any>(this.baseUrl+'secciones');
  }

  obtenerSeccionesDetail(nivel:string, grado: string, seccion:string, anio:number):Observable<any>{
    return this.http.get<any>(this.baseUrl+'secciones/details?nivel='+nivel+'&grado='+grado+'&seccion='+seccion+'&anio='+anio);
  }
}
