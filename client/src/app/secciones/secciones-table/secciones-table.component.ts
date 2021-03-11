import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-secciones-table',
  templateUrl: './secciones-table.component.html',
  styleUrls: ['./secciones-table.component.css']
})
export class SeccionesTableComponent implements OnInit {
  @Input() seccionesPage: any;

  constructor() { }

  ngOnInit(): void {
  }

}
