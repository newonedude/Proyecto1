import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asesorias-table',
  templateUrl: './asesorias-table.component.html',
  styleUrls: ['./asesorias-table.component.css']
})
export class AsesoriasTableComponent implements OnInit {
  @Input() asesoriasPage: any;
  public page: number;
  docente: string;
  seccion: string;
  estudiante: string;
  fecha: string;
  hora: string;

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
