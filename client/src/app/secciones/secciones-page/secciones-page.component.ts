import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones-page',
  templateUrl: './secciones-page.component.html',
  styleUrls: ['./secciones-page.component.css']
})
export class SeccionesPageComponent implements OnInit {
  secciones: any = []
  seccionesFull: any = []
  registerMode = false
  DOMready = false

  constructor(private http: HttpClient,
    private usuariosService: AccountService) { }

  ngOnInit(): void {
    this.getSecciones();
  }

  async getSecciones() {
    const resp = await lastValueFrom(this.http.get(this.usuariosService.baseUrl + 'secciones'));
    this.secciones = resp
    this.secciones.forEach((value, index) => {
      this.secciones[index].anio = this.secciones[index].anio + ""
    });

    this.DOMready = true
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    if (event == false) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

}
