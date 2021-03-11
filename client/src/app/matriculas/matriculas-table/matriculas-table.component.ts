import { Component, Input, OnInit, Pipe } from '@angular/core';
import { transform } from 'typescript';

@Component({
  selector: 'app-matriculas-table',
  templateUrl: './matriculas-table.component.html',
  styleUrls: ['./matriculas-table.component.css']
})

export class MatriculasTableComponent implements OnInit {
  @Input() combinedArray: any;
  @Input() usuariosPage: any;
  @Input() seccionesPage: any;

  constructor() { }

  ngOnInit(): void {
  }
}