import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-calificaciones-page',
  templateUrl: './calificaciones-page.component.html',
  styleUrls: ['./calificaciones-page.component.css']
})
export class CalificacionesPageComponent implements OnInit {
  calificacionesTabla: any = [];
  existenRegistros: boolean;
  DOMready = false

  constructor(private http: HttpClient,
    private usuariosService: AccountService) { }

  ngOnInit(): void {
    this.getCalificacionesTabla()
  }

  async getCalificacionesTabla() {
    const resp = await lastValueFrom(this.http.get(this.usuariosService.baseUrl + 'notas/calificaciones'))
    this.calificacionesTabla = resp
    this.calificacionesTabla.forEach((value, index) => {
      this.calificacionesTabla[index].anio = this.calificacionesTabla[index].anio + ""
    });

    if (this.calificacionesTabla.length >= 1) {
      this.existenRegistros = true;
    } else {
      this.existenRegistros = false
    }

    this.DOMready = true
  }

  refreshPageMode(event: any) {
    this.calificacionesTabla.lentgth = 0;
    if (event == true) {
      this.DOMready = false
      this.ngOnInit();
    }
  }
}