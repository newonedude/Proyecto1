import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.css']
})
export class UsuariosTableComponent implements OnInit {
  @Input() usuariosPage: any;
  constructor() { }

  ngOnInit(): void {
  }

}
