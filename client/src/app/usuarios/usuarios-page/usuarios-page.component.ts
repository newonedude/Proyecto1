import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css']
})
export class UsuariosPageComponent implements OnInit {
  usuarios: any = []
  registerMode = false
  DOMready = false

  constructor(private http: HttpClient,
    private usuariosService: AccountService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  async getUsuarios() {
    const resp = await lastValueFrom(this.http.get(this.usuariosService.baseUrl + 'usuarios'));
    this.usuarios = resp

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
