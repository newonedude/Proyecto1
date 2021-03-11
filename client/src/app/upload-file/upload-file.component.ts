import { Usuario2 } from './../_models/usuario2';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { AccountService } from '../_services/account.service';
import { EstudianteService } from '../_services/estudiante.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  data = [];
  resArray: any = [];
  model1: any = {};
  model2: any = {};
  input:any;
  @Output() refreshPage = new EventEmitter();

  constructor(private accountService: AccountService, private estudianteService: EstudianteService) { }

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
    this.registerToServices()
  }

  registerToServices() {
    for (let index = 0; index < this.resArray.length; index++) {
      this.model1.nombre = this.resArray[index].nombre
      this.model1.ape_paterno = this.resArray[index].ape_paterno
      this.model1.ape_materno = this.resArray[index].ape_materno
      this.model1.dni = this.resArray[index].dni
      this.model1.usuario = this.resArray[index].dni
      this.model1.password = this.resArray[index].fecha_nacimiento
      this.model1.rol = this.resArray[index].rol
      this.model1.email = this.resArray[index].email
      this.model1.estado = true

      this.accountService.registrar(this.model1).pipe(
        switchMap(response => {
          this.model2.id_usuario = response.id_usuario;
          this.model2.fecha_ingreso = this.resArray[index].fecha_ingreso
          this.model2.fecha_nacimiento = this.resArray[index].fecha_nacimiento
          this.model2.nombre_apod = this.resArray[index].nombre_apod
          this.model2.ape_paterno_apod = this.resArray[index].ape_paterno_apod
          this.model2.ape_materno_apod = this.resArray[index].ape_materno_apod
          this.model2.dni_apod = this.resArray[index].dni_apod
          this.model2.celular_apod = this.resArray[index].celular_apod
          this.model2.email_apod = this.resArray[index].email_apod

          return this.estudianteService.registrarEstudiante(this.model2)
        })
      ).subscribe(response =>{
        this.refresh()
        this.input = document.getElementById("inputSubir");
        this.input.value='';
      })
    }
  }
}
