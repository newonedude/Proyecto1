import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Rol {
  value: string;
}

@Component({
  selector: 'app-registrar-usuarios',
  templateUrl: './registrar-usuarios.component.html',
  styleUrls: ['./registrar-usuarios.component.css']
})
export class RegistrarUsuariosComponent implements OnInit {
  model: any={};
  @Output() cancelRegister = new EventEmitter();
  
  roles: Rol[] = [
    {value: 'Administrador'},
    {value: 'Docente'},
    {value: 'Usuario IE'}
  ];

  constructor( private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.registrar(this.model).subscribe(response =>{
      console.log(response);
      this.cancel();
    }, error=>{
      console.log(error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
