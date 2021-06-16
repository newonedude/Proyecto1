import { Usuario2 } from './../_models/usuario2';
import { Usuario } from './../_models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<Usuario>(1);
  currentUser$ = this.currentUserSource.asObservable();
  usuario: any = {};

  constructor(private http: HttpClient) { }

  login(model:any):Observable<any>{
    return this.http.post(this.baseUrl+'usuarios/login', model).pipe(
      map((response:Usuario)=>{
        this.usuario = response;
        if(this.usuario){
          localStorage.setItem('usuario',JSON.stringify(this.usuario));
          this.currentUserSource.next(this.usuario);
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

  registrar(model:any): Observable<Usuario2>{
    return this.http.post<Usuario2>(this.baseUrl+'usuarios/registrar', model)
  }

  /*registrar(model:any){
    return this.http.post(this.baseUrl+'usuarios/registrar', model)
  }*/

  obtenerUsuario(id_usuario:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'usuarios/'+id_usuario);
  }

  obtenerUsuarioRol(rol:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'usuarios/rol/'+rol)
  }

  obtenerUsuarioDni(dni:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+'usuarios/dni/'+dni)
  }
}
