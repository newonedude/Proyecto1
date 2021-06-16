import { MatriculaService } from './../../_services/matricula.service';
import { Encuesta } from './../../_models/encuesta';
import { EncuestaService } from './../../_services/encuesta.service';
import { NotaService } from './../../_services/nota.service';
import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preguntas-encuesta',
  templateUrl: './preguntas-encuesta.component.html',
  styleUrls: ['./preguntas-encuesta.component.css'],
  providers: [DatePipe]
})


export class PreguntasEncuestaComponent implements OnInit {
  @Input() idmatricula: any;
  @Input() encuestaExistente: Encuesta;
  date: any;
  encuestaNueva: boolean;
  @Output() finishSurvey = new EventEmitter();

  constructor(private encuestaService: EncuestaService,
    private matriculaService:MatriculaService) { }

  ngOnInit(): void {
    if (Object.keys(this.encuestaExistente).length != 0) {
      this.encuestaNueva = false;
      console.log(this.encuestaNueva)
    } else {
      this.encuestaNueva = true;
      console.log(this.encuestaNueva)
    }
  }

  async registrarEncuesta() {
    if (this.encuestaNueva) {
      this.encuestaExistente.estado = true;
      this.date = new Date();
      this.encuestaExistente.fecha_registro = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
      this.encuestaExistente.id_matricula = this.idmatricula;

      await this.encuestaService.registrarEncuesta(this.encuestaExistente).toPromise();

      var resp = await this.matriculaService.obtenerMatriculaById(this.idmatricula).toPromise();
      resp.encuesta_realizada = true;

      await this.matriculaService.actualizar(resp).toPromise();
      console.log("creado")
    } else {
      this.date = new Date();
      this.encuestaExistente.fecha_registro = formatDate(this.date, 'yyyy-MM-dd', 'en-US');

      await this.encuestaService.actualizar(this.encuestaExistente).toPromise();
      console.log("actualizado")
    }

    this.cancel();
  }

  cancel() {
    this.finishSurvey.emit(false);
  }

}
