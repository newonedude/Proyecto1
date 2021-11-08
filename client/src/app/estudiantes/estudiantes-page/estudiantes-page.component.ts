import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-estudiantes-page',
  templateUrl: './estudiantes-page.component.html',
  styleUrls: ['./estudiantes-page.component.css']
})
export class EstudiantesPageComponent implements OnInit {
  estudiantes: any = []
  registerMode = false
  DOMready = false

  constructor(private http: HttpClient,
    private usuariosService: AccountService) { }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  async getEstudiantes() {
    let resp = await lastValueFrom(this.http.get(this.usuariosService.baseUrl + 'usuarios/rol/estudiante'))
    this.estudiantes = resp

    this.DOMready = true
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
    this.DOMready = false
    if (event == false) {
      this.ngOnInit();
    }
  }

  refreshPageMode(event: any) {
    if (event == true) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

}
