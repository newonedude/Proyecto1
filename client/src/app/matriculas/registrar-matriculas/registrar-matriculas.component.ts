import { FormControl, Validators } from '@angular/forms';
import { NotaService } from './../../_services/nota.service';
import { AsignacionService } from './../../_services/asignacion.service';
import { DetallematriculaService } from './../../_services/detallematricula.service';
import { CursoService } from './../../_services/curso.service';
import { MatriculaService } from './../../_services/matricula.service';
import { EstudianteService } from './../../_services/estudiante.service';
import { Seccion } from './../../_models/seccion';
import { User } from './../../_models/user';
import { SeccionService } from './../../_services/seccion.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registrar-matriculas',
  templateUrl: './registrar-matriculas.component.html',
  styleUrls: ['./registrar-matriculas.component.css']
})
export class RegistrarMatriculasComponent implements OnInit {
  usuarios: Array<User> = [];
  fecha_matricula = new FormControl('', [Validators.required]);
  estudiante_selected = new FormControl('', [Validators.required]);
  seccion_selected = new FormControl('', [Validators.required]);
  docentes: Array<User> = [];
  secciones: Array<Seccion> = [];
  matricula: any = {};
  detalle_matricula: any = {};
  selectedStudentOptions: any = [];
  selectedSectionOptions: any = [];
  nota: any = {};
  DOMready = false

  @Output() cancelRegister = new EventEmitter();

  constructor(private usuarioService: AccountService,
    private seccionService: SeccionService,
    private estudianteService: EstudianteService,
    private matriculaService: MatriculaService,
    private detMatriculaService: DetallematriculaService,
    private cursoService: CursoService,
    private asignacionService: AsignacionService,
    private notasService: NotaService) { }

  ngOnInit(): void {
    this.getUsuariosByRole()
    this.getSecciones()
    this.getCursos()
  }

  getErrorMessageInput() {
    return this.fecha_matricula.hasError('required') ? 'Ingrese un valor.' :
      ''
  }

  getErrorMessageStudents() {
    return this.estudiante_selected.hasError('required') ? 'Debe seleccionar uno o más estudiantes.' :
      ''
  }

  getErrorMessageSeccion() {
    return this.seccion_selected.hasError('required') ? 'Debe seleccionar una sección.' :
      ''
  }

  getUsuariosByRole() {
    this.usuarioService.obtenerUsuarioRol('estudiante').subscribe(
      r => {
        r.forEach(user => {
          let customobj = new User();
          customobj.id_usuario = user.id_usuario;
          customobj.nombre = user.nombre + " " + user.ape_paterno + " " + user.ape_materno
          this.usuarios.push(customobj)
        })
        this.DOMready = true
      }
    )
  }

  getCursos() {
    this.cursoService.obtenerCursos().subscribe(r =>
      this.detalle_matricula.id_curso = r[0].id_curso);
  }

  getSecciones() {
    this.seccionService.obtenerSecciones().subscribe(
      r => {
        r.forEach(secc => {
          let customobj = new Seccion();
          customobj.id = secc.id_seccion;
          customobj.seccion = secc.grado + "° " + secc.seccion + " " + secc.nivel + " " + secc.anio;
          customobj.anio = secc.anio;
          this.secciones.push(customobj)
        });
      }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  async onclick() {
    if (this.fecha_matricula.invalid || this.estudiante_selected.invalid || this.seccion_selected.invalid) {
      console.log("debe llenar todos los campos.")
    }
    else {
      for (const user of this.selectedStudentOptions) {
        const resp2 = await lastValueFrom(this.asignacionService.obtenerAsignacionByDetail(this.selectedSectionOptions[0].id, this.detalle_matricula.id_curso, this.selectedSectionOptions[0].anio, true))
        const resp = await lastValueFrom(this.estudianteService.obtenerEstudianteByUserId(user.id_usuario))
        this.matricula.id_estudiante = resp.id_estudiante
        this.matricula.encuesta_realizada = false
        this.matricula.permiso_apoderado = false
        if (this.selectedSectionOptions.length > 0) {
          this.matricula.anio = this.selectedSectionOptions[0].anio
          this.matricula.id_seccion = this.selectedSectionOptions[0].id
          this.matricula.estado = true
        }

        const resp3 = await lastValueFrom(this.matriculaService.registrarMatricula(this.matricula))
        this.detalle_matricula.id_asignacion = resp2.id_asignacion;
        this.detalle_matricula.id_matricula = resp3.id_matricula;
        this.detalle_matricula.estado = true;

        const resp4 = await lastValueFrom(this.detMatriculaService.registrarDetalleMatricula(this.detalle_matricula))
        this.nota.id_matricula = resp3.id_matricula
        this.nota.id_asignacion = resp4.id_asignacion
        this.nota.p1 = ""
        this.nota.p2 = ""
        this.nota.p3 = ""
        this.nota.cf = ""

        await lastValueFrom(this.notasService.registrar(this.nota))

        this.cancel();
      }
    }
  }
}
