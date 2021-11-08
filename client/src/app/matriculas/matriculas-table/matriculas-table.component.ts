import { Component, Input, OnInit, Pipe } from '@angular/core';
import { transform } from 'typescript';

@Component({
  selector: 'app-matriculas-table',
  templateUrl: './matriculas-table.component.html',
  styleUrls: ['./matriculas-table.component.css']
})

export class MatriculasTableComponent implements OnInit {
  @Input() matriculasPage: any;
  public page: number;
  nivel:string;
  nombre:string;
  ape_paterno:string;
  ape_materno:string;
  dni:string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var acc = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
}