import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiantes-page',
  templateUrl: './estudiantes-page.component.html',
  styleUrls: ['./estudiantes-page.component.css']
})
export class EstudiantesPageComponent implements OnInit {
  estudiantes: any;
  registerMode = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(){
    this.http.get('https://localhost:5001/api/usuarios/rol/estudiante').subscribe(estudiantes => this.estudiantes = estudiantes);
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode=event;
    if(event == false){
      this.ngOnInit();
    }
  }

  refreshPageMode(event: any){
    if(event == true){
      this.ngOnInit();
    }
  }

}
