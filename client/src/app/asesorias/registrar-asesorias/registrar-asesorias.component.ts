import { FormControl, Validators } from '@angular/forms';
import { AsesoriaService } from './../../_services/asesoria.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Seccion } from 'src/app/_models/seccion';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CursoService } from 'src/app/_services/curso.service';
import { DetallematriculaService } from 'src/app/_services/detallematricula.service';
import { EstudianteService } from 'src/app/_services/estudiante.service';
import { MatriculaService } from 'src/app/_services/matricula.service';
import { SeccionService } from 'src/app/_services/seccion.service';
import { SmsService } from 'src/app/_services/sms.service';
import { DatePipe } from '@angular/common'
import { lastValueFrom } from 'rxjs';

interface Hora {
  value: string;
}

@Component({
  selector: 'app-registrar-asesorias',
  templateUrl: './registrar-asesorias.component.html',
  styleUrls: ['./registrar-asesorias.component.css']
})
export class RegistrarAsesoriasComponent implements OnInit {
  fecha_matricula = new FormControl('', [Validators.required]);
  hora = new FormControl('', [Validators.required]);
  estudiante = new FormControl('', [Validators.required]);
  seccion = new FormControl('', [Validators.required]);
  docente = new FormControl('', [Validators.required]);

  secciones: Array<Seccion> = [];
  usuarios: Array<User> = [];
  docentes: Array<User> = [];

  selectedStudentOptions: any = [];
  selectedSectionOptions: any = [];
  selectedTeacherOptions: any = [];

  asesoria: any = {};
  hora2: string;
  fecha1: string;
  sms: any = {}
  DOMready = false

  @Output() cancelRegister = new EventEmitter();

  horas: Hora[] = [
    { value: '13:00' },
    { value: '14:00' },
    { value: '15:00' },
    { value: '16:00' },
    { value: '17:00' }
  ];

  constructor(
    private usuarioService: AccountService,
    private seccionService: SeccionService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private asesoriaService: AsesoriaService,
    private smsService: SmsService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getUsuariosByRole();
    this.getSecciones();
    this.getDocentes();
  }

  getErrorMessageInput() {
    return this.fecha_matricula.hasError('required') ? 'Ingrese un valor.' :
      this.hora.hasError('required') ? 'Ingrese un valor.' :
        ''
  }

  getErrorMessageEstudiante() {
    return this.estudiante.hasError('required') ? 'Seleccione un estudiante.' :
      ''
  }

  getErrorMessageSeccion() {
    return this.seccion.hasError('required') ? 'Seleccione una sección.' :
      ''
  }

  getErrorMessageDocente() {
    return this.docente.hasError('required') ? 'Seleccione un docente.' :
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
        });

        this.DOMready = true
      }
    )
  }

  getDocentes() {
    this.usuarioService.obtenerUsuarioRol('docente').subscribe(
      r => {
        r.forEach(docente => {
          let custmobj = new User();
          custmobj.id_usuario = docente.id_usuario;
          custmobj.nombre = docente.nombre + " " + docente.ape_paterno + " " + docente.ape_materno
          this.docentes.push(custmobj)
        });
      }
    )
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

  async onclick() {
    if (this.fecha_matricula.invalid || this.hora.invalid || this.estudiante.invalid || this.seccion.invalid || this.docente.invalid) {
      console.log("complete los campos.")
    } else {
      this.asesoria.fecha = this.fecha1 + "T" + this.hora2

      const resp = await lastValueFrom(this.estudianteService.obtenerEstudianteByUserId(this.selectedStudentOptions[0].id_usuario))
      const resp3 = await lastValueFrom(this.usuarioService.obtenerUsuario(this.selectedStudentOptions[0].id_usuario))
      this.asesoria.id_estudiante = resp.id_estudiante;
      this.asesoria.id_docente = this.selectedTeacherOptions[0].id_usuario;
      this.asesoria.id_seccion = this.selectedSectionOptions[0].id;

      //sms
      this.sms.receiverPhoneNumber = '+51' + resp.celular_apod
      this.sms.nombreAlumno = resp3.body.nombre + " " + resp3.body.ape_paterno + " " + resp3.body.ape_materno
      this.sms.typeSMS = "asesoria"

      const resp2 = await lastValueFrom(this.cursoService.obtenerCursos())
      this.asesoria.id_curso = resp2[0].id_curso;
      this.asesoria.estado = true;

      this.asesoriaService.registrarAsesoria(this.asesoria).subscribe(
        r => {
          this.sms.fecha_asesoria = this.datepipe.transform(r.fecha, 'dd-MM-yyyy')
          this.sms.hora_asesoria = this.datepipe.transform(r.fecha, 'h:mm a')
          console.log(this.sms)
          this.smsService.enviarSMS(this.sms).subscribe()
          this.cancel()
        }
      )
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}