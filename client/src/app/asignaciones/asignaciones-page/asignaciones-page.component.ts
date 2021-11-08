import { SeccionService } from './../../_services/seccion.service';
import { CursoService } from './../../_services/curso.service';
import { AsignacionService } from './../../_services/asignacion.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-asignaciones-page',
  templateUrl: './asignaciones-page.component.html',
  styleUrls: ['./asignaciones-page.component.css']
})
export class AsignacionesPageComponent implements OnInit {
  asignaciones: any = [];
  docentes: any = [];
  cursos: any = [];
  secciones: any = [];
  registerMode = false;
  asignacionesFull: any = [];
  DOMready = false

  constructor(private http: HttpClient,
    private asignacionService: AsignacionService,
    private usuarioService: AccountService,
    private cursoService: CursoService,
    private seccionService: SeccionService) { }

  ngOnInit(): void {

    this.getAsignaciones();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getAsignaciones() {
    this.http.get(this.usuarioService.baseUrl + 'asignaciones').subscribe(r => {
      this.asignaciones = r;
      this.getCursoAsignacion();
      this.getDocenteAsignacion();
    });
  }

  async getDocenteAsignacion() {
    for (const asignacion of this.asignaciones) {
      const resp = await lastValueFrom(this.usuarioService.obtenerUsuario(asignacion.id_docente));
      this.docentes.push(resp)
    }
    this.getSeccionAsignacion();

  }

  async getCursoAsignacion() {
    const resp = await this.cursoService.obtenerCursos().toPromise();
    this.cursos.push(resp)
  }

  async getSeccionAsignacion() {
    for (const asignacion of this.asignaciones) {
      const resp = await lastValueFrom(this.seccionService.obtenerSeccion(asignacion.id_seccion));
      this.secciones.push(resp)
    }
    this.reformDocentes();
    this.DOMready = true
  }

  cancelRegisterMode(event: boolean) {
    this.secciones.length = 0;
    this.cursos.length = 0;
    this.docentes.length = 0;
    this.asignaciones.length = 0;
    this.asignacionesFull.length = 0;
    this.registerMode = event;
    if (event == false) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

  refreshPageMode(event: any) {
    this.secciones.length = 0;
    this.cursos.length = 0;
    this.docentes.length = 0;
    this.asignaciones.length = 0;
    if (event == true) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

  reformDocentes() {
    for (let index = 0; index < this.asignaciones.length; index++) {
      const asigg: any = {};
      asigg.fullname = this.docentes[index].body.nombre + " " + this.docentes[index].body.ape_paterno + " " + this.docentes[index].body.ape_materno
      asigg.grado = this.secciones[index].grado
      asigg.seccion = this.secciones[index].seccion
      asigg.nivel = this.secciones[index].nivel
      asigg.anio = this.secciones[index].anio + ""
      if (this.asignaciones[index].estado == true) {
        asigg.estado = "Activo"
      } else {
        asigg.estado = "Inactivo"
      }
      this.asignacionesFull.push(asigg)
    }
  }
}
