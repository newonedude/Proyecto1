import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any ={}
  loggedIn: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      this.loggedIn = true;
    }, error=>{
      console.log(error);
    })
  }

}
