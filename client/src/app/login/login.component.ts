import { Usuario } from './../_models/usuario';
import { AccountService } from './../_services/account.service';
import { Component, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    const resp = this.accountService.login(this.model).subscribe();

    //this.accountService.login(this.model).subscribe(r => console.log(r))
  }

  logout() {
    this.accountService.logout();
  }
}
