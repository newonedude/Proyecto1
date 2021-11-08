import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class Chart1Service {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

    obtenerChart1():Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'chart1');
    }

    obtenerChartbySeccion(seccion:string):Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'chart1/seccion/'+seccion)
    }

    obtenerChartbyGrado(grado:string):Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'chart1/grado/'+grado)
    }
}
