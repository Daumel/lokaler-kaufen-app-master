import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AppRoutingModule} from '../app-routing.module';

@Component({
  selector: 'password-reset-popup',
  templateUrl: './password-reset-popup.component.html',
  styleUrls: ['./password-reset-popup.component.css']
})
export class PasswordResetPopupComponent implements OnInit {

  private routes;

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')])
  });

  constructor(public dialogRef: MatDialogRef<PasswordResetPopupComponent>) {
  }

  ngOnInit(): void {
    this.routes = AppRoutingModule.getRoutes();
  }

  onSubmit(): void {
    const popupResult = {
      email: this.formGroup.controls.email.value
    };
    this.dialogRef.close(popupResult);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
