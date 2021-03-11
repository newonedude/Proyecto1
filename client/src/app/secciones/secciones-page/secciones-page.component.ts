import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones-page',
  templateUrl: './secciones-page.component.html',
  styleUrls: ['./secciones-page.component.css']
})
export class SeccionesPageComponent implements OnInit {
  secciones:any;
  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSecciones();
  }

  getSecciones(){
    this.http.get('https://localhost:5001/api/secciones').subscribe(
      response => this.secciones = response
    )
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

}
