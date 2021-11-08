import { AccountService } from './../_services/account.service';
import { NavService } from './../_services/nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(public navService: NavService, private accountService:AccountService) { }

  ngOnInit(): void {
  }

  salir() {
    this.accountService.logout();
  }

}
