import { ModalDocenteInfoComponent } from './../../modals/modal-docente-info/modal-docente-info.component';
import { AccountService } from 'src/app/_services/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface Forecastingdata {
  scored_label: any,
  scored_probabilities: any,
  nombre: any
};

@Component({
  selector: 'app-predicciones-table',
  templateUrl: './predicciones-table.component.html',
  styleUrls: ['./predicciones-table.component.css']
})
export class PrediccionesTableComponent implements OnInit {
  @Input() prediccionesPage: any
  public page: number
  dni: string
  nombre: string
  seccion: string
  anio: string
  scored_labels: string
  records: boolean
  fecha_prediccion: string

  constructor(public usuariosService: AccountService,
    private dialog: MatDialog) { }

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

  openDialog(prediccion: any): void {
    const dialogRef = this.dialog.open(ModalDocenteInfoComponent,
      {
        data: {
          scored_label: prediccion.scored_labels,
          scored_probabilities: prediccion.scored_probabilities,
          nombre: prediccion.nombre
        }
      })
  }
}
