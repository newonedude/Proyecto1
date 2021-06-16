import { switchMap } from 'rxjs/operators';
import { EstudianteService } from './../../_services/estudiante.service';
import { Seccion } from './../../_models/seccion';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { SeccionService } from 'src/app/_services/seccion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-asesorias-page',
  templateUrl: './asesorias-page.component.html',
  styleUrls: ['./asesorias-page.component.css']
})
export class AsesoriasPageComponent implements OnInit {
  asesorias: any;
  docentes: Array<User> = [];
  secciones: Array<Seccion> = [];
  estudiantes: Array<User> = [];
  registerMode = false;

  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private usuarioService: AccountService,
    private seccionService: SeccionService,
    private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.getAsesorias();
  }

  getAsesorias() {
    this.http.get('https://localhost:5001/api/asesorias').subscribe(
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
      this.usuarioService.obtenerUsuario(asesoria.id_docente).subscribe(
        r => {
          let obj = new User();
          obj.id_usuario = r.id_usuario;
          obj.nombre = r.nombre + " " + r.ape_paterno + " " + r.ape_materno
          this.docentes.push(obj)
        });

      this.seccionService.obtenerSeccion(asesoria.id_seccion).subscribe(
        r => {
          let obj = new Seccion();
          obj.id = r.id_seccion;
          obj.seccion = r.grado + "° " + r.seccion + " " + r.nivel;
          obj.anio = 0;
          this.secciones.push(obj)
        }
      )

      const resp = await this.estudianteService.obtenerEstudiante(asesoria.id_estudiante).toPromise();
      this.usuarioService.obtenerUsuario(resp.id_usuario).subscribe(
        r => {
          let obj = new User();
          obj.id_usuario = r.id_usuario;
          obj.nombre = r.nombre + " " + r.ape_paterno + " " + r.ape_materno
          this.estudiantes.push(obj)
        }
      )
    }
  }

  cancelRegisterMode(event: boolean) {
    this.docentes.length = 0;
    this.secciones.length = 0;
    this.estudiantes.length = 0;
    this.registerMode = event;
    if (event == false) {
      this.ngOnInit();
    }
  }

}
