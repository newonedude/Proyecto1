import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nota } from '../_models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  registrar(model:any):Observable<Nota>{
    return this.http.post<Nota>(this.baseUrl+'notas/registrar', model)
  }

  actualizar(model:any):Observable<Nota>{
    return this.http.put<Nota>(this.baseUrl+'notas/actualizar', model)
  }

}
