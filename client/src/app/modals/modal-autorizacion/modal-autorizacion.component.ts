import { AccountService } from './../../_services/account.service';
import { SmsService } from './../../_services/sms.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SMSdata } from 'src/app/encuesta/pre-encuesta/pre-encuesta.component';

@Component({
  selector: 'app-modal-autorizacion',
  templateUrl: './modal-autorizacion.component.html',
  styleUrls: ['./modal-autorizacion.component.css']
})
export class ModalAutorizacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAutorizacionComponent>,
    private smsService: SmsService,
    private accountService:AccountService,
    @Inject(MAT_DIALOG_DATA) public data: SMSdata
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.smsService.enviarSMS(this.data).subscribe();
    this.onNoClick();
    this.accountService.logout();
  }
}
