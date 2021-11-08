import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrediccionService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient, private accountService:AccountService) { }

  obtenerPredicciones(year: number):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'predicciones/'+year);
  }

  registrarPrediccion(model: any): Observable<any> {
    return this.http.post<any>(this.accountService.baseUrl + 'predicciones/registrar', model)
  }
}
