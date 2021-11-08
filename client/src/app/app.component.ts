import { AccountService } from './_services/account.service';
import { Usuario } from './_models/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lista de Usuarios';

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    //const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
    //this.accountService.setCurrentUser(usuario);
  }
}