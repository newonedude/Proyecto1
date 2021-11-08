import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  enviarSMS(model:any):Observable<any>{
    return this.http.post<any>(this.accountService.baseUrl+'sms/sendsms', model)
  }
}
