import { Usuario2 } from './../_models/usuario2';
import { Usuario } from './../_models/usuario';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<Usuario>(1);
  registros: boolean;
  currentUser$ = this.currentUserSource.asObservable();
  usuario: any = {};

  constructor(private http: HttpClient) {
  }

  login(model: any): Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl + 'usuarios/login', model, { observe: 'response' })
      .pipe(map(response => {
        this.usuario = response.body
        if (this.usuario.data) {
          localStorage.setItem('usuario', JSON.stringify(this.usuario.data));
          this.currentUserSource.next(this.usuario.data);
        }
        return response
      }))
  }

  setCurrentUser(usuario: Usuario) {
    this.currentUserSource.next(usuario);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.currentUserSource.next(null);
  }

  registrar(model: any): Observable<Usuario2> {
    return this.http.post<Usuario2>(this.baseUrl + 'usuarios/registrar', model)
  }

  /*registrar(model:any){
    return this.http.post(this.baseUrl+'usuarios/registrar', model)
  }*/

  obtenerUsuario(id_usuario: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.baseUrl + 'usuarios/' + id_usuario, { observe: 'response' });
  }

  obtenerUsuarioRol(rol: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'usuarios/rol/' + rol)
  }

  obtenerUsuarioDni(dni: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'usuarios/dni/' + dni)
  }
}
