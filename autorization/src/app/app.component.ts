import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './_services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'autorization';
  authorizedMode = false;
  nonauthorizedMode = false;
  id_matricula = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id_matricula = params['id_matricula'];
    });
  }

  async autorizar() {
    this.authorizationService.autorizarAlumno(this.id_matricula).subscribe();
    this.authorizedToggle();
  }

  authorizedToggle() {
    this.authorizedMode = !this.authorizedMode;
  }

  nonauthorizedToggle() {
    this.nonauthorizedMode = !this.nonauthorizedMode;
  }
}
