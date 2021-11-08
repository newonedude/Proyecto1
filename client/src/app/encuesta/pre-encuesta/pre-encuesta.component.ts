import { lastValueFrom } from 'rxjs';
import { NotaService } from './../../_services/nota.service';
import { EstudianteService } from './../../_services/estudiante.service';
import { ModalAutorizacionComponent } from './../../modals/modal-autorizacion/modal-autorizacion.component';
import { Encuesta } from './../../_models/encuesta';
import { EncuestaService } from './../../_services/encuesta.service';
import { AccountService } from './../../_services/account.service';
import { MatriculaService } from './../../_services/matricula.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface SMSdata {
  receiverPhoneNumber: any,
  id_matricula: any
};

@Component({
  selector: 'app-pre-encuesta',
  templateUrl: './pre-encuesta.component.html',
  styleUrls: ['./pre-encuesta.component.css']
})
export class PreEncuestaComponent implements OnInit {
  @Input() usuario: any;
  @Input() autorizacion: any;
  DOMready = false
  surveyMode = false;
  id_matricula: any;
  cel_apoderado: any;
  encuesta: Encuesta = new Encuesta();
  info_forecasting: any = {
    "edad": "",
    "edu_padre": "",
    "tam_familia": "",
    "apoderado": "",
    "cal_materiales": "",
    "cal_rela_docente": "",
    "apoyo_fam_curso": "",
    "mot_interes": "",
    "nivel_interes": "",
    "horas_estudio": "",
    "T1_Segundo": "",
    "T2_segundo": "",
    "C_Final_Primero": ""
  };

  constructor(private matriculaService: MatriculaService,
    private estudianteService: EstudianteService,
    private encuestaService: EncuestaService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private notaService: NotaService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  async getInfo() {
    const resp = await lastValueFrom(this.matriculaService.obtenerMatriculaByDNI(this.usuario.dni));
    this.id_matricula = resp.id_matricula;

    const resp2 = await lastValueFrom(this.estudianteService.obtenerEstudianteByUserId(this.usuario.id_usuario));
    this.cel_apoderado = resp2.celular_apod;

    if (resp.encuesta_realizada) {
      this.encuesta = await lastValueFrom(this.encuestaService.obtenerEncuestaByIdMatricula(this.id_matricula));
    }

    const resp3 = await lastValueFrom(this.matriculaService.obtenerMatriculasByDNI(this.usuario.dni));

    if (resp3.length > 1) {
      for (let obj of resp3) {
        if (!obj.estado) {
          const resp = await lastValueFrom(this.notaService.obtenerNotaByMatricula(obj.id_matricula))
          this.info_forecasting.C_Final_Primero = resp.cf
        } else {
          const resp = await lastValueFrom(this.notaService.obtenerNotaByMatricula(obj.id_matricula))
          this.info_forecasting.T1_Segundo = resp.p1
          this.info_forecasting.T2_segundo = resp.p2
        }
      }

      this.DOMready = true
    } else {
      for (let obj of resp3) {
        if (obj.estado) {
          const resp = await lastValueFrom(this.notaService.obtenerNotaByMatricula(obj.id_matricula))
          this.info_forecasting.T1_Segundo = resp.p1
          this.info_forecasting.T2_segundo = resp.p2
        }
      }

      this.DOMready = true
    }
  }

  goToSurvey() {
    this.surveyMode = !this.surveyMode;
  }

  finishSurvey(event: boolean) {
    this.surveyMode = event;
    if (event == false) {
      this.DOMready = false
      this.ngOnInit();
    }
  }

  salir() {
    this.accountService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAutorizacionComponent,
      {
        data: {
          receiverPhoneNumber: '+51' + this.cel_apoderado,
          id_matricula: this.id_matricula,
          typeSMS: 'autorizacion'
        }
      });

    dialogRef.afterClosed().subscribe()
  }
}
