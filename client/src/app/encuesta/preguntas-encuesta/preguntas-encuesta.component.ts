import { SmsService } from './../../_services/sms.service';
import { PrediccionService } from './../../_services/prediccion.service';
import { DetallematriculaService } from 'src/app/_services/detallematricula.service';
import { AccountService } from './../../_services/account.service';
import { ModalPrediccionComponent } from './../../modals/modal-prediccion/modal-prediccion.component';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ForecastingService } from './../../_services/forecasting.service';
import { MatriculaService } from './../../_services/matricula.service';
import { Encuesta } from './../../_models/encuesta';
import { EncuestaService } from './../../_services/encuesta.service';
import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

export interface Forecastingdata {
  scored_label: any,
  scored_probabilities: any,
  nombre: any,
  status: any
};

@Component({
  selector: 'app-preguntas-encuesta',
  templateUrl: './preguntas-encuesta.component.html',
  styleUrls: ['./preguntas-encuesta.component.css'],
  providers: [DatePipe]
})


export class PreguntasEncuestaComponent implements OnInit {
  @Input() idmatricula: any
  @Input() encuestaExistente: Encuesta
  @Input() info_forecasting: any
  @Input() sms: any;
  date: any
  prediccionReady: any
  encuestaNueva: boolean
  @Output() finishSurvey = new EventEmitter();
  forescasting_results: any
  prediccion: any = {}
  forecastStatus = 200

  secondCtrl = new FormControl('', [Validators.required]);
  thirdCtrl = new FormControl('', [Validators.required]);
  fifthCtrl = new FormControl('', [Validators.required]);
  seventhCtrl = new FormControl('', [Validators.required]);
  nineteenthCtrl = new FormControl('', [Validators.required]);
  twentytwoCtrl = new FormControl('', [Validators.required]);

  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;
  ninethFormGroup: FormGroup;
  eigthteenthFormGroup: FormGroup;
  twentiethFormGroup: FormGroup;
  twentyfirstFormGroup: FormGroup;
  twentytwoFormGroup: FormGroup;
  twelvethFormGroup: FormGroup;
  nineteenthFormGroup: FormGroup;

  constructor(private encuestaService: EncuestaService,
    private accountService: AccountService,
    private matriculaService: MatriculaService,
    private forecastingService: ForecastingService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private detalleMatricula: DetallematriculaService,
    private prediccionService: PrediccionService,
    private smsService: SmsService) { }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required]
    });

    this.ninethFormGroup = this._formBuilder.group({
      ninethCtrl: ['', Validators.required]
    });

    this.eigthteenthFormGroup = this._formBuilder.group({
      eigthteenthCtrl: ['', Validators.required]
    });

    this.twentiethFormGroup = this._formBuilder.group({
      twentiethCtrl: ['', Validators.required]
    });

    this.twentyfirstFormGroup = this._formBuilder.group({
      twentyfirstCtrl: ['', Validators.required]
    });

    this.twentytwoFormGroup = this._formBuilder.group({
      twentytwoCtrl: ['', Validators.required]
    });

    this.twelvethFormGroup = this._formBuilder.group({
      twelvethCtrl: ['', Validators.required]
    });

    this.nineteenthFormGroup = this._formBuilder.group({
      nineteenthCtrl: ['', Validators.required]
    });

    if (Object.keys(this.encuestaExistente).length != 0) {
      this.encuestaNueva = false;
      console.log(this.encuestaNueva)
    } else {
      this.encuestaNueva = true;
      console.log(this.encuestaNueva)
    }
  }

  getErrorMessageInput() {
    return this.secondCtrl.hasError('required') ? 'Ingrese un valor.' :
      this.thirdCtrl.hasError('required') ? 'Ingrese un valor.' :
        this.fifthCtrl.hasError('required') ? 'Ingrese un valor.' :
          this.seventhCtrl.hasError('required') ? 'Ingrese un valor.' :
            this.nineteenthCtrl.hasError('required') ? 'Ingrese un valor.' :
              this.twentytwoCtrl.hasError('required') ? 'Ingrese un valor.' :
                  ''
  }

  async registrarEncuesta() {
    console.log(this.info_forecasting)
    this.prediccionReady = false

    //Set info for forecasting
    this.info_forecasting.edad = this.encuestaExistente.edad + ""
    this.info_forecasting.edu_padre = this.encuestaExistente.edu_padre
    this.info_forecasting.tam_familia = this.encuestaExistente.tam_familia
    this.info_forecasting.apoderado = this.encuestaExistente.apoderado
    this.info_forecasting.cal_materiales = this.encuestaExistente.cal_materiales + ""
    this.info_forecasting.cal_rela_docente = this.encuestaExistente.cal_rela_docente + ""
    this.info_forecasting.apoyo_fam_curso = this.encuestaExistente.apoyo_fam_curso
    this.info_forecasting.mot_interes = this.encuestaExistente.mot_interes
    this.info_forecasting.nivel_interes = this.encuestaExistente.nivel_interes + ""
    this.info_forecasting.horas_estudio = this.encuestaExistente.horas_estudio

    //Realizar predicción
    if (this.info_forecasting.T2_segundo == "") {
      if (this.info_forecasting.T1_Segundo == "") {
        if (this.info_forecasting.C_Final_Primero == "") {
          this.prediccion.modelo = "0"
          this.forecastStatus = 0
        } else {
          this.prediccion.modelo = "1"
          let resp = await lastValueFrom(this.forecastingService.forecastingExecution(this.info_forecasting, this.prediccion.modelo))

          this.forescasting_results = resp.data
          this.forecastStatus = resp.status

          //sms
          this.sms.scored_labels = this.forescasting_results.results.webServiceOutput0[0].scored_Labels
          this.sms.scored_probabilities = Math.round(this.forescasting_results.results.webServiceOutput0[0].scored_Probabilities * 100)
        }
      } else {
        this.prediccion.modelo = "4"
        console.log(this.info_forecasting)
        let resp = await lastValueFrom(this.forecastingService.forecastingExecution(this.info_forecasting, this.prediccion.modelo))

        this.forescasting_results = resp.data
        this.forecastStatus = resp.status

        //sms
        this.sms.scored_labels = this.forescasting_results.results.webServiceOutput0[0].scored_Labels
        this.sms.scored_probabilities = Math.round(this.forescasting_results.results.webServiceOutput0[0].scored_Probabilities * 100)
      }
    } else {
      this.prediccion.modelo = "5"
      let resp = await lastValueFrom(this.forecastingService.forecastingExecution(this.info_forecasting, this.prediccion.modelo))

      this.forescasting_results = resp.data
      this.forecastStatus = resp.status

      //sms
      this.sms.scored_labels = this.forescasting_results.results.webServiceOutput0[0].scored_Labels
      this.sms.scored_probabilities = Math.round(this.forescasting_results.results.webServiceOutput0[0].scored_Probabilities * 100)
    }

    if (this.prediccion.modelo == "0") {
      this.prediccionReady = true
      this.openDialog3()
    } else {
      if (this.forecastStatus == 200) {

        //Envío de SMS
        /*if (this.sms.scored_probabilities >= 50) {
          this.smsService.enviarSMS(this.sms).subscribe()
        }*/

        //Encuesta
        if (this.encuestaNueva) {
          this.encuestaExistente.estado = true;
          this.date = new Date();
          this.encuestaExistente.fecha_registro = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
          this.encuestaExistente.id_matricula = this.idmatricula

          await lastValueFrom(this.encuestaService.registrarEncuesta(this.encuestaExistente));

          var resp = await lastValueFrom(this.matriculaService.obtenerMatriculaById(this.idmatricula));
          resp.encuesta_realizada = true;

          await lastValueFrom(this.matriculaService.actualizar(resp));
          console.log("creado")
        } else {
          this.date = new Date();
          this.encuestaExistente.fecha_registro = formatDate(this.date, 'yyyy-MM-dd', 'en-US')

          await lastValueFrom(this.encuestaService.actualizar(this.encuestaExistente));
          console.log("actualizado")
        }

        //Predicción

        let resp2 = await lastValueFrom(this.detalleMatricula.obtenerDetalleMatricula(this.idmatricula))
        this.date = new Date()
        this.prediccion.fecha_prediccion = formatDate(this.date, 'yyyy-MM-dd', 'en-US')
        this.prediccion.id_matricula = this.idmatricula
        this.prediccion.id_asignacion = resp2.id_asignacion
        this.prediccion.scored_labels = this.forescasting_results.results.webServiceOutput0[0].scored_Labels
        this.prediccion.scored_probabilities = this.forescasting_results.results.webServiceOutput0[0].scored_Probabilities
        this.prediccion.cal_materiales = this.info_forecasting.cal_materiales
        this.prediccion.cal_rela_docente = this.info_forecasting.cal_rela_docente
        this.prediccion.horas_estudio = this.info_forecasting.horas_estudio
        this.prediccion.mot_interes = this.info_forecasting.mot_interes
        this.prediccion.nivel_interes = this.info_forecasting.nivel_interes
        this.prediccion.CF_anterior = this.info_forecasting.C_Final_Primero
        this.prediccion['P1'] = this.info_forecasting.T1_Segundo
        this.prediccion['P2'] = this.info_forecasting.T2_segundo
        this.prediccion.estado = true

        console.log(this.prediccion)

        let resp3 = await lastValueFrom(this.prediccionService.registrarPrediccion(this.prediccion))
        this.prediccionReady = true
        console.log(resp3)

        this.openDialog();
      }
      else {
        this.prediccionReady = true
        this.openDialog2()
      }
    }
  }

  cancel() {
    this.finishSurvey.emit(false);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPrediccionComponent,
      {
        data: {
          scored_label: this.forescasting_results.results.webServiceOutput0[0].scored_Labels,
          scored_probabilities: Math.round(this.forescasting_results.results.webServiceOutput0[0].scored_Probabilities * 100),
          nombre: this.accountService.usuario.data.nombre,
          status: this.forecastStatus
        }
      })
  }

  openDialog2(): void {
    const dialogRef = this.dialog.open(ModalPrediccionComponent,
      {
        data: {
          status: this.forecastStatus
        }
      })
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(ModalPrediccionComponent,
      {
        data: {
          status: this.forecastStatus
        }
      })
  }
}
