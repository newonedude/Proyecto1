import { AsignacionService } from './../../_services/asignacion.service';
import { switchMap } from 'rxjs/operators';
import { DetallematriculaService } from './../../_services/detallematricula.service';
import { CursoService } from './../../_services/curso.service';
import { MatriculaService } from './../../_services/matricula.service';
import { SeccionService } from './../../_services/seccion.service';
import { EstudianteService } from './../../_services/estudiante.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-file-matricula',
  templateUrl: './upload-file-matricula.component.html',
  styleUrls: ['./upload-file-matricula.component.css']
})
export class UploadFileMatriculaComponent implements OnInit {
  data = [];
  resArray: any = [];
  matricula: any = {};
  detmatricula: any = {};
  input: any;
  @Output() refreshPage = new EventEmitter();

  constructor(private accountService: AccountService,
    private estudianteService: EstudianteService,
    private seccionService: SeccionService,
    private matriculaService: MatriculaService,
    private cursoService: CursoService,
    private asignacionService: AsignacionService,
    private detalleMatriculaService: DetallematriculaService) { }

  ngOnInit(): void {
  }

  refresh() {
    this.refreshPage.emit(true);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length == 1 && evt.target.accept === ".xlsx") {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        console.log(wb);

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  async uploadfile() {
    let keys = this.data.shift();
    this.resArray = this.data.map((e) => {
      let obj = {};
      keys.forEach((key, i) => {
        obj[key] = e[i];
      });
      return obj;
    });
    this.registerToServices();
  }

  async registerToServices() {
    for (const registro of this.resArray) {
      const resp6 = await this.cursoService.obtenerCursos().toPromise();
      const resp = await this.accountService.obtenerUsuarioDni(registro.dni).toPromise();

      const resp2 = await this.estudianteService.obtenerEstudianteByUserId(resp.id_usuario).toPromise();
      this.matricula.id_estudiante = resp2.id_estudiante;
      this.matricula.fecha_matricula = registro.fecha_matricula

      const resp3 = await this.seccionService.obtenerSeccionesDetail(registro.nivel, registro.grado, registro.seccion, registro.anio).toPromise();
      this.matricula.id_seccion = resp3.id_seccion;
      this.matricula.anio = resp3.anio;
      this.matricula.estado = true;

      const resp4 = await this.matriculaService.registrarMatricula(this.matricula).toPromise();
      this.detmatricula.id_matricula = resp4.id_matricula;

      const resp7 = await this.asignacionService.obtenerAsignacionByDetail(resp3.id_seccion, resp6[0].id_curso, resp3.anio, true).toPromise();
      this.detmatricula.id_asignacion = resp7.id_asignacion

      await this.detalleMatriculaService.registrarDetalleMatricula(this.detmatricula).toPromise();
    }
    this.refresh();
    this.input = document.getElementById("inputSubir");
    this.input.value = '';
  }
}
