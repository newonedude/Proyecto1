import { EstudianteService } from './../../_services/estudiante.service';
import { AccountService } from './../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Usuario2 } from 'src/app/_models/usuario2';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

interface Rol {
  value: string;
}

@Component({
  selector: 'app-registrar-estudiantes',
  templateUrl: './registrar-estudiantes.component.html',
  styleUrls: ['./registrar-estudiantes.component.css']
})
export class RegistrarEstudiantesComponent implements OnInit {
  nombre = new FormControl('', [Validators.required]);
  nombre_apod = new FormControl('', [Validators.required]);
  ape_paterno_apod = new FormControl('', [Validators.required]);
  ape_materno_apod = new FormControl('', [Validators.required]);
  ape_paterno = new FormControl('', [Validators.required]);
  ape_materno = new FormControl('', [Validators.required]);
  fecha_ingreso = new FormControl('', [Validators.required]);
  fecha_nacimiento = new FormControl('', [Validators.required]);
  celular_apod = new FormControl('', [Validators.required]);
  dni = new FormControl('', [Validators.required, Validators.minLength(8)]);
  dni_apod = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email])
  email_apod = new FormControl('', [Validators.required, Validators.email])
  model1: any = {};
  model2: any = {};
  myDate = new Date();
  date: string;

  @Output() cancelRegister = new EventEmitter();

  constructor(private datePipe: DatePipe, private accountService: AccountService, private estudianteService: EstudianteService) {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
  }

  getErrorMessageInput() {
    return this.nombre.hasError('required') ? 'Ingrese un valor.' :
      this.ape_paterno.hasError('required') ? 'Ingrese un valor.' :
        this.ape_materno.hasError('required') ? 'Ingrese un valor.' :
          this.fecha_ingreso.hasError('required') ? 'Ingrese un valor.' :
            this.fecha_nacimiento.hasError('required') ? 'Ingrese un valor.' :
              this.nombre_apod.hasError('required') ? 'Ingrese un valor.' :
                this.ape_paterno_apod.hasError('required') ? 'Ingrese un valor.' :
                  this.ape_materno_apod.hasError('required') ? 'Ingrese un valor.' :
                    this.celular_apod.hasError('required') ? 'Ingrese un valor.' :
                      '';
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese un valor.';
    }

    return this.email.hasError('email') ? 'Ingrese un email válido.' : '';
  }

  getErrorMessageEmailApod() {
    if (this.email_apod.hasError('required')) {
      return 'Ingrese un valor.';
    }

    return this.email_apod.hasError('email') ? 'Ingrese un email válido.' : '';
  }

  getErrorMessageDNI() {
    if (this.dni.hasError('required')) {
      return 'Ingrese un valor.';
    }

    return this.dni.hasError('minLength') ? 'Ingrese un dni válido.' : '';
  }

  getErrorMessageDNIApod() {
    if (this.dni_apod.hasError('required')) {
      return 'Ingrese un valor.';
    }

    return this.dni_apod.hasError('minLength') ? 'Ingrese un dni válido.' : '';
  }

  register() {
    if (this.nombre.invalid
      || this.ape_paterno.invalid
      || this.ape_materno.invalid
      || this.fecha_ingreso.invalid
      || this.fecha_nacimiento.invalid
      || this.nombre_apod.invalid
      || this.ape_paterno_apod.invalid
      || this.ape_materno_apod.invalid
      || this.celular_apod.invalid
      || this.dni.invalid
      || this.dni_apod.invalid
    ) {
      console.log("debe llenar todos los campos.")
    } else {
      this.model1.rol = "estudiante"
      this.model1.estado = true
      this.accountService.registrar(this.model1).pipe(
        switchMap(response => {
          this.model2.id_usuario = response.id_usuario;
          this.model2.estado = true
          return this.estudianteService.registrarEstudiante(this.model2)
        })
      ).subscribe(response => {
        this.cancel();
      })
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
