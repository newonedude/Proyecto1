import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  obtenerCursos():Observable<any>{
    return this.http.get<any>(this.baseUrl+'cursos');
  }

  obtenerCursoByDesc(descripcion:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'cursos/desc/'+descripcion);
  }
}
