import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Forecastingdata } from 'src/app/encuesta/preguntas-encuesta/preguntas-encuesta.component';

@Component({
  selector: 'app-modal-prediccion',
  templateUrl: './modal-prediccion.component.html',
  styleUrls: ['./modal-prediccion.component.css']
})
export class ModalPrediccionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalPrediccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Forecastingdata
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.onNoClick();
  }
}
