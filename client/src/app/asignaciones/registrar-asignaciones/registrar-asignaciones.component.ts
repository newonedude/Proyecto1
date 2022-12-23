import { FormControl, Validators } from '@angular/forms';
import { AsignacionService } from './../../_services/asignacion.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Seccion } from 'src/app/_models/seccion';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CursoService } from 'src/app/_services/curso.service';
import { SeccionService } from 'src/app/_services/seccion.service';

@Component({
  selector: 'app-registrar-asignaciones',
  templateUrl: './registrar-asignaciones.component.html',
  styleUrls: ['./registrar-asignaciones.component.css']
})
export class RegistrarAsignacionesComponent implements OnInit {
  docentes: Array<User> = [];
  secciones: Array<Seccion> = [];
  curso: any = {};
  asignacion: any = {};
  docente = new FormControl('', [Validators.required]);
  course = new FormControl('', [Validators.required]);
  section = new FormControl('', [Validators.required]);

  @Output() cancelRegister = new EventEmitter();

  constructor(private usuarioService: AccountService,
    private seccionService: SeccionService,
    private cursoService: CursoService,
    private asignacionService: AsignacionService) { }

  ngOnInit(): void {
    this.getUsuariosByRole()
    this.getCursos();
    this.getSecciones();
  }

  getErrorMessageInput() {
    return this.docente.hasError('required') ? 'Ingrese un valor.' :
      this.course.hasError('required') ? 'Ingrese un valor.' :
        this.section.hasError('required') ? 'Ingrese un valor.' :
          ''
  }

  getUsuariosByRole() {
    this.usuarioService.obtenerUsuarioRol('docente').subscribe(
      r => {
        r.forEach(user => {
          let customobj = new User();
          customobj.id_usuario = user.id_usuario;
          customobj.nombre = user.nombre + " " + user.ape_paterno + " " + user.ape_materno
          this.docentes.push(customobj)
        });
      }
    )
    console.log(this.docentes)
  }

  getCursos() {
    this.cursoService.obtenerCursos().subscribe(r =>
      this.curso = r[0]);
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

  register() {
    if (this.docente.invalid || this.course.invalid) {
      console.log("debe llenar todos los campos.")
    }
    else {
      for (let sec of this.secciones) {
        if (sec.id == this.asignacion.id_seccion) {
          this.asignacion.anio = sec.anio
        }
      }

      this.asignacion.id_curso = this.curso.id_curso
      this.asignacion.estado = true
      console.log(this.asignacion)

      this.asignacionService.registrarAsignacion(this.asignacion).subscribe(
        r => this.cancel()
      )
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
