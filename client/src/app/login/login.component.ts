import { Usuario } from './../_models/usuario';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any ={}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
    }, error=>{
      console.log(error);
    })
  }

  logout(){
    this.accountService.logout();
  }
}
