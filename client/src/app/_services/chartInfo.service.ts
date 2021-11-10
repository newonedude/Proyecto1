import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ChartInfoService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

    obtenerHistorialSeccion():Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'historialseccion');
    }

    obtenerPrediccionSeccion():Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'prediccionseccion');
    }

    obtenerHistorialGrado():Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'historialgrado');
    }

    obtenerPrediccionGrado():Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'predicciongrado');
    }




    obtenerChartbySeccion(seccion:string):Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'chart1/seccion/'+seccion)
    }

    obtenerChartbyGrado(grado:string):Observable<any>{
      return this.http.get<any>(this.accountService.baseUrl+'chart1/grado/'+grado)
    }
}
