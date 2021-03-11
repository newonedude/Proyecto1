import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  registrarMatricula(model:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'matriculas/registrar', model)
  }
}
