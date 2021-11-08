import { switchMap } from 'rxjs/operators';
import { EstudianteService } from './../../_services/estudiante.service';
import { Seccion } from './../../_models/seccion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SeccionService } from 'src/app/_services/seccion.service';
import { DatePipe } from '@angular/common';
import { CdkNoDataRow } from '@angular/cdk/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-asesorias-page',
  templateUrl: './asesorias-page.component.html',
  styleUrls: ['./asesorias-page.component.css']
})
export class AsesoriasPageComponent implements OnInit {
  asesorias: any = [];
  docentes: any = [];
  secciones: any = [];
  estudiantes: any = [];
  registerMode = false;
  asesoriasfull: any = [];
  DOMready = false

  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private usuarioService: AccountService,
    private seccionService: SeccionService,
    private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.getAsesorias();
  }

  getAsesorias() {
    this.http.get(this.usuarioService.baseUrl + 'asesorias').subscribe(
      r => {
        this.asesorias = r;
        this.getInfo();
      }
    )
    //this.asesorias.fecha = this.datePipe.transform(this.asesorias.fecha, 'yyyy-MM-dd');
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  async getInfo() {
    for (const asesoria of this.asesorias) {
      asesoria.fecha2 = this.datePipe.transform(asesoria.fecha, 'MMM d, y');
      asesoria.hora = this.datePipe.transform(asesoria.fecha, 'h:mm a');

      const resp = await lastValueFrom(this.usuarioService.obtenerUsuario(asesoria.id_docente));
      this.docentes.push(resp)

      const resp2 = await lastValueFrom(this.seccionService.obtenerSeccion(asesoria.id_seccion));
      this.secciones.push(resp2)

      const resp3 = await lastValueFrom(this.estudianteService.obtenerEstudiante(asesoria.id_estudiante));
      const resp4 = await lastValueFrom(this.usuarioService.obtenerUsuario(resp3.id_usuario));
      this.estudiantes.push(resp4)
    }

    this.reformAsesoria();
    this.DOMready = true
  }

  cancelRegisterMode(event: boolean) {
    this.docentes.length = 0;
    this.secciones.length = 0;
    this.estudiantes.length = 0;
    this.registerMode = event;
    if (event == false) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

  reformAsesoria() {
    for (let index = 0; index < this.asesorias.length; index++) {
      const ase: any = {};
      ase.docente = this.docentes[index].body.nombre + " " + this.docentes[index].body.ape_paterno + " " + this.docentes[index].body.ape_materno
      ase.estudiante = this.estudiantes[index].body.nombre + " " + this.estudiantes[index].body.ape_paterno + " " + this.estudiantes[index].body.ape_materno
      ase.seccion = this.secciones[index].grado + " " + this.secciones[index].seccion + " " + this.secciones[index].nivel
      ase.fecha = this.asesorias[index].fecha2
      ase.hora = this.asesorias[index].hora
      ase.estado = this.asesorias[index].estado

      this.asesoriasfull.push(ase);
    }
  }
}
