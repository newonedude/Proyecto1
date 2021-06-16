import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones-table',
  templateUrl: './calificaciones-table.component.html',
  styleUrls: ['./calificaciones-table.component.css']
})
export class CalificacionesTableComponent implements OnInit {
  @Input() calificacionesPage: any
  constructor() { }

  ngOnInit(): void {
  }

}
