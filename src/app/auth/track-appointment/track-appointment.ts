import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';
import { ApiService } from '../../shared/services/api/api-service';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar-service';

@Component({
  selector: 'app-track-appointment',
  imports: [
    CommonModule,
    FormsModule,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './track-appointment.html',
  styleUrl: './track-appointment.scss',
})
export class TrackAppointment {
  constructor(private api: ApiService, private snackBar: SnackBarService) {}
  appointmentId = '';
  singleAppointmentDetails: any;
  isLoading = false;
  getAppointmentDetails() {
    this.isLoading = true;
    this.singleAppointmentDetails=null
    this.api
      .commonGetMethod('appointments/getAppointmentByID?appointmentId=' + this.appointmentId, {})
      .subscribe(
        (res: any) => {
          this.singleAppointmentDetails = res?.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.snackBar.error(err?.error?.message ?? 'Try again after some time..!');
        }
      );
  }
}
