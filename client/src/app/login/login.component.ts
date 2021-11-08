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
  autorizacion:any

  constructor(public accountService: AccountService,
    private matriculaService:MatriculaService) { }

  ngOnInit(): void {
  }

  async login() {
    /*this.accountService.login(this.model)
    .subscribe(r =>{
      this.status = r.body.status
    })*/

    let resp = await lastValueFrom(this.accountService.login(this.model))
    this.status = resp.body.status

    let resp1 = await lastValueFrom(this.matriculaService.obtenerMatriculaByDNI(resp.body.data.dni))
    this.autorizacion = resp1.permiso_apoderado
  }

  logout() {
    this.accountService.logout();
  }
}
