import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StringMappingType } from 'typescript';

@Component({
  selector: 'app-asignaciones-table',
  templateUrl: './asignaciones-table.component.html',
  styleUrls: ['./asignaciones-table.component.css']
})
export class AsignacionesTableComponent implements OnInit {
  @Input() asignacionesPage: any;
  public page: number;
  anio:string;
  fullname:string;
  grado:string;
  seccion:string;
  nivel:string;
  estado:string;

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
