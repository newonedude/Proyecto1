import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Forecastingdata } from 'src/app/predicciones/predicciones-table/predicciones-table.component';

@Component({
  selector: 'app-modal-docente-info',
  templateUrl: './modal-docente-info.component.html',
  styleUrls: ['./modal-docente-info.component.css']
})
export class ModalDocenteInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDocenteInfoComponent>,
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
