import { Encuesta } from './../../_models/encuesta';
import { EncuestaService } from './../../_services/encuesta.service';
import { AccountService } from './../../_services/account.service';
import { MatriculaService } from './../../_services/matricula.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-encuesta',
  templateUrl: './pre-encuesta.component.html',
  styleUrls: ['./pre-encuesta.component.css']
})
export class PreEncuestaComponent implements OnInit {
  @Input() usuario: any;
  nombre = "hola";
  surveyMode = false;
  id_matricula: any;
  encuesta: Encuesta = new Encuesta();
  estado1: boolean = true;

  constructor(private matriculaService: MatriculaService,
    private encuestaService: EncuestaService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  async getInfo() {
    const resp = await this.matriculaService.obtenerMatriculaByDNI(this.usuario.dni).toPromise();
    this.id_matricula = resp.id_matricula;
    this.estado1 = resp.permiso_apoderado;

    if (resp.encuesta_realizada) {
      this.encuesta = await this.encuestaService.obtenerEncuestaByIdMatricula(this.id_matricula).toPromise();
      console.log("SI tiene encuesta anterior")
      console.log(this.encuesta);
    } else {
      console.log("NO tiene encuesta anterior")
      console.log(this.encuesta);
    }
  }

  goToSurvey() {
    this.surveyMode = !this.surveyMode;
  }

  finishSurvey(event: boolean) {
    this.surveyMode = event;
    if (event == false) {
      this.ngOnInit();
    }
  }

  solicitarConfirmacion() {
    
  }
}
