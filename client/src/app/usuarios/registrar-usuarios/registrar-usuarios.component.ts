import { FormControl, Validators } from '@angular/forms';
import { AccountService } from './../../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Console } from 'console';

interface Rol {
  value: string;
}

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  nombre = new FormControl('', [Validators.required]);
  ape_paterno = new FormControl('', [Validators.required]);
  ape_materno = new FormControl('', [Validators.required]);
  dni = new FormControl('', [Validators.required]);
  rol = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email])
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  roles: Rol[] = [
    { value: 'administrador' },
    { value: 'docente' },
    { value: 'usuario IE' }
  ];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.nombre.invalid || this.ape_materno.invalid || this.ape_paterno.invalid) {
      console.log("complete todos los campos.")
    } else {
      this.model.estado = true
      this.accountService.registrar(this.model).subscribe(response => {
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
    return this.nombre.hasError('required') ? 'Ingrese un valor.' :
      this.ape_paterno.hasError('required') ? 'Ingrese un valor.' :
        this.ape_materno.hasError('required') ? 'Ingrese un valor.' :
          this.dni.hasError('required') ? 'Ingrese un valor.' :
            this.rol.hasError('required') ? 'Ingrese un valor.' :
              this.password.hasError('required') ? 'Ingrese un valor.' :
                ''
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese un valor.';
    }

    return this.email.hasError('email') ? 'Ingrese un email válido.' : '';
  }

}
