import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-predicciones-page',
  templateUrl: './predicciones-page.component.html',
  styleUrls: ['./predicciones-page.component.css']
})
export class PrediccionesPageComponent implements OnInit {
  prediccionesTabla: any = []
  records: boolean
  DOMready = false

  constructor(private http: HttpClient,
    public usuariosService: AccountService) { }

  ngOnInit(): void {
    this.getResultadoPrediccionesTabla();
  }

  async getResultadoPrediccionesTabla() {
    this.prediccionesTabla = await lastValueFrom(this.http.get(this.usuariosService.baseUrl + 'predicciones'));
    for (const prediccion of this.prediccionesTabla) {
      prediccion.fecha_prediccion = formatDate(prediccion.fecha_prediccion, 'yyyy-MM-dd', 'en-US')
      prediccion.anio = prediccion.anio + ""
      if (prediccion.scored_labels == "Si") {
        prediccion.scored_labels = "Aprobado"
      } else {
        prediccion.scored_labels = "Desaprobado"
      }
    }

    this.DOMready = true
  }
}