import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstudianteService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  registrarEstudiante(model: any):Observable<any> {
    return this.http.post<any>(this.baseUrl + 'estudiantes/registrar', model)
  }

  obtenerEstudiante(id_estudiante: string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'estudiantes/'+id_estudiante);
  }

  obtenerEstudianteByUserId(id_usuario:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'estudiantes/iduser/'+id_usuario);
  }
}
