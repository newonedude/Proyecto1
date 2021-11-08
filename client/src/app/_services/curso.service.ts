import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  obtenerCursos():Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'cursos');
  }

  obtenerCursoByDesc(descripcion:string):Observable<any>{
    return this.http.get<any>(this.accountService.baseUrl+'cursos/desc/'+descripcion);
  }
}
