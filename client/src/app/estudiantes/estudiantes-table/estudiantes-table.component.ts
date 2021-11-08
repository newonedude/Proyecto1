import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.css']
})
export class EstudiantesTableComponent implements OnInit {
  @Input() estudiantesPage: any
  nombre: string;
  ape_paterno: string;
  ape_materno: string;
  dni: string;
  public page: number;
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
