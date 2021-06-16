import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-page',
  templateUrl: './calificaciones-page.component.html',
  styleUrls: ['./calificaciones-page.component.css']
})
export class CalificacionesPageComponent implements OnInit {
  calificacionesTabla: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getCalificacionesTabla();
  }

  getCalificacionesTabla(){
    this.http.get('https://localhost:5001/api/notas/calificaciones')
    .subscribe(r => this.calificacionesTabla = r);
  }

  refreshPageMode(event: any) {
    this.calificacionesTabla.lentgth = 0;
    if (event == true) {
      this.ngOnInit();
    }
  }
}
