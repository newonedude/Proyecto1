import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema de Predicción';
  usuarios: any;

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.http.get('https://localhost:5001/api/Usuarios').subscribe(response => {
      this.usuarios = response;
    }, error =>{
      console.log(error)
    })
  }
}