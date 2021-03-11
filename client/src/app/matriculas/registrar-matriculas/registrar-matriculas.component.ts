import { MatriculaService } from './../../_services/matricula.service';
import { EstudianteService } from './../../_services/estudiante.service';
import { Matricula } from './../../_models/matricula';
import { Seccion } from './../../_models/seccion';
import { User } from './../../_models/user';
import { SeccionService } from './../../_services/seccion.service';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-registrar-matriculas',
  templateUrl: './registrar-matriculas.component.html',
  styleUrls: ['./registrar-matriculas.component.css']
})
export class RegistrarMatriculasComponent implements OnInit {
  usuarios: Array<User> = [];
  secciones: Array<Seccion> = [];
  matricula: any = {};
  detalle_matricula: any = {};
  selectedStudentOptions: any = [];
  selectedSectionOptions: any = [];

  constructor(private usuarioService: AccountService, private seccionService: SeccionService, private estudianteService: EstudianteService, private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getUsuariosByRole()
    this.getSecciones()
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
        console.log(this.secciones)
      }
    )
  }

  onNgModelChange(event) {
    console.log('on ng model change', event);
  }

  async onclick() {
    for(const user of this.selectedStudentOptions){
      const resp = await this.estudianteService.obtenerEstudianteByUserId(user.id_usuario).toPromise()
      this.matricula.id_estudiante = resp.id_estudiante
      if (this.selectedSectionOptions.length > 0) {
        this.matricula.anio = this.selectedSectionOptions[0].anio
        this.matricula.id_seccion = this.selectedSectionOptions[0].id;
      }
      this.matriculaService.registrarMatricula(this.matricula).subscribe();
    }
  }
}
