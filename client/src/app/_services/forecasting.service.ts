import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ForecastingService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  forecastingExecution(model: any, forecastmodel: string): Observable<any> {
    return this.http.post<any>(this.accountService.baseUrl + 'modelsconsumption/forecastModel'+forecastmodel, model)
  }

}