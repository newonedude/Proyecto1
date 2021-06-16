import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  obtenerAsignacionByDetail(id_seccion:string, id_curso:string, anio:string, estado:boolean):Observable<any>{
    return this.http.get<any>(this.baseUrl+'asignaciones/details?id_seccion='+id_seccion+'&id_curso='+id_curso+'&anio='+anio+'&estado='+estado);
  }
}
