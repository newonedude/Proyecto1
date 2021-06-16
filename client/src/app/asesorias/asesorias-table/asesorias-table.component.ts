import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asesorias-table',
  templateUrl: './asesorias-table.component.html',
  styleUrls: ['./asesorias-table.component.css']
})
export class AsesoriasTableComponent implements OnInit {
  @Input() docentesPage:any;
  @Input() seccionesPage:any;
  @Input() estudiantesPage:any;
  @Input() asesoriasPage:any;

  constructor() {}

  ngOnInit(): void {
  }

}
