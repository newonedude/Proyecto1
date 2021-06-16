import { DetallematriculaService } from './../../_services/detallematricula.service';
import { switchMap } from 'rxjs/operators';
import { CursoService } from './../../_services/curso.service';
import { MatriculaService } from './../../_services/matricula.service';
import { EstudianteService } from './../../_services/estudiante.service';
import { Matricula } from './../../_models/matricula';
import { Seccion } from './../../_models/seccion';
import { User } from './../../_models/user';
import { SeccionService } from './../../_services/seccion.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-registrar-matriculas',
  templateUrl: './registrar-matriculas.component.html',
  styleUrls: ['./registrar-matriculas.component.css']
})
export class RegistrarMatriculasComponent implements OnInit {
  usuarios: Array<User> = [];
  docentes: Array<User> = [];
  secciones: Array<Seccion> = [];
  matricula: any = {};
  detalle_matricula: any = {};
  selectedStudentOptions: any = [];
  selectedSectionOptions: any = [];

  @Output() cancelRegister = new EventEmitter();

  constructor(private usuarioService: AccountService, 
    private seccionService: SeccionService, 
    private estudianteService: EstudianteService, 
    private matriculaService: MatriculaService,
    private detMatriculaService: DetallematriculaService,
    private cursoService: CursoService) { }

  ngOnInit(): void {
    this.getUsuariosByRole()
    this.getDocentes()
    this.getSecciones()
    this.getCursos()
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

  getCursos(){
    this.cursoService.obtenerCursos().subscribe(r => 
      this.detalle_matricula.id_curso = r[0].id_curso);
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

  cancel(){
    this.cancelRegister.emit(false);
  }

  async onclick() {
    for(const user of this.selectedStudentOptions){
      const resp = await this.estudianteService.obtenerEstudianteByUserId(user.id_usuario).toPromise()
      this.matricula.id_estudiante = resp.id_estudiante
      if (this.selectedSectionOptions.length > 0) {
        this.matricula.anio = this.selectedSectionOptions[0].anio
        this.matricula.id_seccion = this.selectedSectionOptions[0].id;
      }

      this.matriculaService.registrarMatricula(this.matricula).pipe(
        switchMap(response =>{
          this.detalle_matricula.id_matricula = response.id_matricula;
          return this.detMatriculaService.registrarDetalleMatricula(this.detalle_matricula)
        })
      ).subscribe(
        r => {
          this.cancel();
        }
      );
    }
  }
}
