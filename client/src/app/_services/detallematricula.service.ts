import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetallematriculaService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  registrarDetalleMatricula(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'detallematriculas/registrar', model)
  }
}
