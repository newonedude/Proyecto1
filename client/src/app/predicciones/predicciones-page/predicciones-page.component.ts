import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
      prediccion.anio = prediccion.anio + ""
      if (prediccion.resultado == "si") {
        prediccion.resultado = "Aprobado"
      } else {
        prediccion.resultado = "Desaprobado"
      }
    }

    this.DOMready = true
  }
}