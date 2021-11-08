import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.css']
})
export class UsuariosTableComponent implements OnInit {
  public page: number;
  @Input() usuariosPage: any;
  rol: string;
  dni: string;
  nombre: string;
  ape_paterno: string;
  ape_materno: string;

  constructor() {
  }

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

  clear() {
    this.rol = '';
    this.dni = '';
    this.nombre = '';
    this.ape_materno = '';
    this.ape_paterno = '';
  }

}
