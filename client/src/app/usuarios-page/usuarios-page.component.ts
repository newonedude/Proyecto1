import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css']
})
export class UsuariosPageComponent implements OnInit {
  usuarios: any;
  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.http.get('https://localhost:5001/api/Usuarios').subscribe(usuarios => this.usuarios = usuarios);
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode=event;
  }

}
