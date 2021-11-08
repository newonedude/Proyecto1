import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-table',
  templateUrl: './calificaciones-table.component.html',
  styleUrls: ['./calificaciones-table.component.css']
})
export class CalificacionesTableComponent implements OnInit {
  @Input() calificacionesPage: any
  public page: number;
  nombre:string;
  dni:string;
  nivel:string;
  grado:string;
  seccion:string;
  anio:string;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var acc = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

}
