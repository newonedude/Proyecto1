import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  obtenerAsesorias():Observable<any>{
    return this.http.get<any>(this.baseUrl+'asesorias');
  }

  registrarAsesoria(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'asesorias/registrar', model)
  }

}
