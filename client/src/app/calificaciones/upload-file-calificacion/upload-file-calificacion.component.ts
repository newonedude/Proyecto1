import { NotaService } from './../../_services/nota.service';
import { CursoService } from 'src/app/_services/curso.service';
import { SeccionService } from 'src/app/_services/seccion.service';
import { AsignacionService } from './../../_services/asignacion.service';
import { MatriculaService } from 'src/app/_services/matricula.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-file-calificacion',
  templateUrl: './upload-file-calificacion.component.html',
  styleUrls: ['./upload-file-calificacion.component.css']
})
export class UploadFileCalificacionComponent implements OnInit {
  data = [];
  resArray: any = [];
  nota: any = {};
  input: any;
  @Output() refreshPage = new EventEmitter();

  constructor(private matriculaService: MatriculaService,
    private asignacionService: AsignacionService,
    private seccionService: SeccionService,
    private cursoService: CursoService,
    private notaService: NotaService) { }

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

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  async uploadfile() {
    if ((<HTMLInputElement>document.getElementById("inputSubir")).files.length > 0) {
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
  }

  async registerToServices() {
    for (const registro of this.resArray) {
      const resp = await this.matriculaService.obtenerMatriculaByDNI(registro.dni).toPromise();
      this.nota.id_matricula = resp.id_matricula;

      const resp3 = await this.seccionService.obtenerSeccionesDetail(registro.nivel, registro.grado, registro.seccion, registro.anio).toPromise();

      const resp4 = await this.cursoService.obtenerCursoByDesc(registro.curso).toPromise();

      const resp2 = await this.asignacionService.obtenerAsignacionByDetail(resp3.id_seccion, resp4.id_curso, registro.anio, true).toPromise();
      this.nota.id_asignacion = resp2.id_asignacion;

      if (registro.p1 == null) {
        this.nota.p1 = ""
      } else 
      {
        this.nota.p1 = registro.p1.toString();
      }

      if (registro.p2 == null) {
        this.nota.p2 = ""
      } else 
      {
        this.nota.p2 = registro.p2.toString();
      }

      if (registro.p3 == null) {
        this.nota.p3 = ""
      } else 
      {
        this.nota.p3 = registro.p3.toString();
      }

      if (registro.cf == null) {
        this.nota.cf = ""
      } else 
      {
        this.nota.cf = registro.cf.toString();
      }

      const resp5 = await this.notaService.actualizar(this.nota).toPromise();
    }
    this.input = document.getElementById("inputSubir");
    this.input.value = '';
    this.refresh();
  }
}
