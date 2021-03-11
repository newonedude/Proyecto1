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
    this.seccionServices.registrarSeccion(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
