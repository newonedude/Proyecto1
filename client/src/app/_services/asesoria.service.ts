import { AccountService } from 'src/app/_services/account.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  constructor(private http: HttpClient,
    private accountService: AccountService) {
   }

  obtenerAsesorias():Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'asesorias');
  }

  registrarAsesoria(model:any):Observable<any>{
    return this.http.post<any>(this.accountService.baseUrl+'asesorias/registrar', model)
  }

}
