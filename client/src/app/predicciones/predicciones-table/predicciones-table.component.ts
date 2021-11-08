import { AccountService } from 'src/app/_services/account.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-predicciones-table',
  templateUrl: './predicciones-table.component.html',
  styleUrls: ['./predicciones-table.component.css']
})
export class PrediccionesTableComponent implements OnInit {
  @Input() prediccionesPage: any
  public page: number;
  dni: string;
  nombre: string;
  seccion: string;
  anio: string;
  resultado: string;
  records: boolean;

  constructor(public usuariosService: AccountService) { }

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
