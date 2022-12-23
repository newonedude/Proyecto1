import { FormControl, Validators } from '@angular/forms';
import { SeccionService } from './../../_services/seccion.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Nivel {
  value: string;
}

interface Grado {
  value: string;
}

@Component({
  selector: 'app-registrar-secciones',
  templateUrl: './registrar-secciones.component.html',
  styleUrls: ['./registrar-secciones.component.css']
})
export class RegistrarSeccionesComponent implements OnInit {
  nivel = new FormControl('', [Validators.required]);
  grado = new FormControl('', [Validators.required]);
  seccion = new FormControl('', [Validators.required]);
  anio = new FormControl('', [Validators.required]);
  capacidad = new FormControl('', [Validators.required]);
  model: any = {}
  @Output() cancelRegister = new EventEmitter();

  niveles: Nivel[] = [
    { value: 'Primaria' },
    { value: 'Secundaria' }
  ];

  grados: Grado[] = [
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' }
  ];

  constructor(private seccionServices: SeccionService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.nivel.invalid || this.grado.invalid || this.seccion.invalid || this.anio.invalid || this.capacidad.invalid) {
      console.log("debe llenar todos los campos.")
    }
    else {
      this.seccionServices.registrarSeccion(this.model).subscribe(response => {
        this.cancel();
      }, error => {
        console.log(error);
      })
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  getErrorMessageInput() {
    return this.nivel.hasError('required') ? 'Ingrese un valor.' :
      this.grado.hasError('required') ? 'Ingrese un valor.' :
        this.seccion.hasError('required') ? 'Ingrese un valor.' :
          this.anio.hasError('required') ? 'Ingrese un valor.' :
            this.capacidad.hasError('required') ? 'Ingrese un valor.' :
              ''
  }

}
