import { MatriculaService } from './../_services/matricula.service';
import { Usuario } from './../_models/usuario';
import { AccountService } from './../_services/account.service';
import { Component, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { Observable, ReplaySubject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  headers: any
  status = 200
  autorizacion: any
  usuarioReady = false

  constructor(public accountService: AccountService,
    private matriculaService: MatriculaService) { }

  ngOnInit(): void {
  }

  async login() {
    this.usuarioReady = true

    let resp = await lastValueFrom(this.accountService.login(this.model))
    this.status = resp.body.status

    if (this.status == 200) {
      let resp1 = await lastValueFrom(this.matriculaService.obtenerMatriculaByDNI(resp.body.data.dni))
      this.autorizacion = resp1.permiso_apoderado
    }

    this.usuarioReady = false
  }

  logout() {
    this.accountService.logout();
  }
}
