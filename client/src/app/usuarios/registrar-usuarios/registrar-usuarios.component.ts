import { AccountService } from './../../_services/account.service';
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
    {value: 'administrador'},
    {value: 'docente'},
    {value: 'usuario IE'}
  ];

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.model.estado = true
    this.accountService.registrar(this.model).subscribe(response =>{
      this.cancel();
    }, error=>{
      console.log(error);
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
