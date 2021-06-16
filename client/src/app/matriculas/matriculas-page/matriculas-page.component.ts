import { AccountService } from './../../_services/account.service';
import { switchMap } from 'rxjs/operators';
import { EstudianteService } from './../../_services/estudiante.service';
import { SeccionService } from './../../_services/seccion.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matriculas-page',
  templateUrl: './matriculas-page.component.html',
  styleUrls: ['./matriculas-page.component.css']
})
export class MatriculasPageComponent implements OnInit {
  matriculas: any;
  registerMode = false;
  secciones: any = [];
  estudiantes: any = [];
  usuarios: any = [];

  constructor(private http: HttpClient, private seccionService: SeccionService, private estudianteService: EstudianteService, private usuarioService: AccountService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getMatriculas() {
    this.http.get('https://localhost:5001/api/matriculas').subscribe(response => {
      this.matriculas = response;
      this.getSeccionesMatriculas();
      this.getAlumnosMatriculas();
    }
    );
  }

  async getSeccionesMatriculas() {
    for (const matricula of this.matriculas) {
      const resp = await this.seccionService.obtenerSeccion(matricula.id_seccion).toPromise()
      this.secciones.push(resp)
    }
  }

  async getAlumnosMatriculas() {
    for (const matricula of this.matriculas) {
      const resp = await this.estudianteService.obtenerEstudiante(matricula.id_estudiante).toPromise()
      this.estudiantes.push(resp)
    }

    this.getUsuarios();
  }

  async getUsuarios() {
    for (const estudiante of this.estudiantes) {
      const resp = await this.usuarioService.obtenerUsuario(estudiante.id_usuario).toPromise()
      this.usuarios.push(resp)
    }
  }

  cancelRegisterMode(event: boolean) {
    this.secciones.length = 0;
    this.estudiantes.length = 0;
    this.usuarios.length = 0;
    this.registerMode = event;
    if (event == false) {
      this.ngOnInit();
    }
  }

  refreshPageMode(event: any) {
    this.secciones.length = 0;
    this.estudiantes.length = 0;
    this.usuarios.length = 0;
    if (event == true) {
      this.ngOnInit();
    }
  }
}
