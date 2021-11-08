import { MatriculaService } from 'src/app/_services/matricula.service';
import { AccountService } from './../../_services/account.service';
import { switchMap } from 'rxjs/operators';
import { EstudianteService } from './../../_services/estudiante.service';
import { SeccionService } from './../../_services/seccion.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-matriculas-page',
  templateUrl: './matriculas-page.component.html',
  styleUrls: ['./matriculas-page.component.css']
})
export class MatriculasPageComponent implements OnInit {
  matriculas: any = []
  registerMode = false
  DOMready = false

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  async getMatriculas() {
    const r = await lastValueFrom(this.matriculaService.obtenerMatriculasTable())
    this.matriculas = r

    this.DOMready = true
  }

  cancelRegisterMode(event: boolean) {
    this.matriculas.length = 0;
    this.DOMready = false
    this.registerMode = event;
    if (event == false) {
      this.ngOnInit();
    }
  }

  refreshPageMode(event: any) {
    this.DOMready = false
    this.matriculas.length = 0;
    if (event == true) {
      this.ngOnInit();
    }
  }
}
