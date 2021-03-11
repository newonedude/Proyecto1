import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudiantes-table',
  templateUrl: './estudiantes-table.component.html',
  styleUrls: ['./estudiantes-table.component.css']
})
export class EstudiantesTableComponent implements OnInit {
  @Input() estudiantesPage: any
  constructor() { }

  ngOnInit(): void {
  }

}
