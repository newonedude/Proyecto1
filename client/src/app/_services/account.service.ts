import { Usuario } from './../_models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<Usuario>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl+'usuarios/login', model).pipe(
      map((response:Usuario)=>{
        const usuario = response;
        if(usuario){
          localStorage.setItem('usuario',JSON.stringify(usuario));
          this.currentUserSource.next(usuario);
        }
      })
    )
  }

  setCurrentUser(usuario: Usuario){
    this.currentUserSource.next(usuario);
  }

  logout(){
    localStorage.removeItem('usuario');
    this.currentUserSource.next(null);
  }

  registrar(model:any){
    return this.http.post(this.baseUrl+'usuarios/registrar', model).pipe(
      map((usuario:Usuario) =>{
      /*if(usuario){
        localStorage.setItem('usuario',JSON.stringify(usuario));
        this.currentUserSource.next(usuario);
      }*/
    })
    )
  }
}
