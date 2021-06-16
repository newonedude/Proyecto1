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

interface Hora {
  value: string;
}

@Component({
  selector: 'app-registrar-asesorias',
  templateUrl: './registrar-asesorias.component.html',
  styleUrls: ['./registrar-asesorias.component.css']
})
export class RegistrarAsesoriasComponent implements OnInit {
  secciones: Array<Seccion> = [];
  usuarios: Array<User> = [];
  docentes: Array<User> = [];
  selectedStudentOptions: any = [];
  selectedSectionOptions: any = [];
  selectedTeacherOptions: any = [];
  asesoria: any = {};
  hora2:string;
  fecha1:string;

  @Output() cancelRegister = new EventEmitter();

  horas: Hora[] = [
    {value: '13:00'},
    {value: '14:00'},
    {value: '15:00'},
    {value: '16:00'},
    {value: '17:00'}
  ];

  constructor(
    private usuarioService: AccountService, 
    private seccionService: SeccionService, 
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private asesoriaService: AsesoriaService
  ) { }

  ngOnInit(): void {
    this.getUsuariosByRole();
    this.getSecciones();
    this.getDocentes();
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
      }
    )
  }

  getDocentes(){
    this.usuarioService.obtenerUsuarioRol('docente').subscribe(
      r => {
        r.forEach(docente => {
          let custmobj = new User();
          custmobj.id_usuario = docente.id_usuario;
          custmobj.nombre = docente.nombre+" "+docente.ape_paterno+" "+docente.ape_materno
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
    this.asesoria.fecha = this.fecha1+"T"+this.hora2

    const resp = await this.estudianteService.obtenerEstudianteByUserId(this.selectedStudentOptions[0].id_usuario).toPromise()
    this.asesoria.id_estudiante = resp.id_estudiante;
    this.asesoria.id_docente = this.selectedTeacherOptions[0].id_usuario;
    this.asesoria.id_seccion = this.selectedSectionOptions[0].id;
    const resp2 = await this.cursoService.obtenerCursos().toPromise()
    this.asesoria.id_curso = resp2[0].id_curso;
    this.asesoria.estado = 'activo';

    this.asesoriaService.registrarAsesoria(this.asesoria).subscribe(
      r => this.cancel()
    )
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}