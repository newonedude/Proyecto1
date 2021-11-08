import { EstudianteService } from './../../_services/estudiante.service';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Usuario2 } from 'src/app/_models/usuario2';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

interface Rol {
  value: string;
}

@Component({
  selector: 'app-registrar-estudiantes',
  templateUrl: './registrar-estudiantes.component.html',
  styleUrls: ['./registrar-estudiantes.component.css']
})
export class RegistrarEstudiantesComponent implements OnInit {
  model1: any={};
  model2: any={};
  myDate = new Date();
  date:string;

  @Output() cancelRegister = new EventEmitter();

  constructor(private datePipe: DatePipe, private accountService: AccountService, private estudianteService: EstudianteService) {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
  }
  
  register(){
    this.model1.rol = "estudiante"
    this.model1.estado = true
    this.accountService.registrar(this.model1).pipe(
      switchMap(response => {
        this.model2.id_usuario = response.id_usuario;
        this.model2.estado = true
        return this.estudianteService.registrarEstudiante(this.model2)
      })
    ).subscribe(response =>{
      this.cancel();
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
