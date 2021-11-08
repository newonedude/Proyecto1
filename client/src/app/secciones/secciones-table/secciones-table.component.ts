import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones-table',
  templateUrl: './secciones-table.component.html',
  styleUrls: ['./secciones-table.component.css']
})
export class SeccionesTableComponent implements OnInit {
  @Input() seccionesPage: any;
  public page: number;
  anio:string;
  grado:string;
  seccion:string;
  nivel:string;

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
