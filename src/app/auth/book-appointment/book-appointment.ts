import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar-service';
import { ApiService } from '../../shared/services/api/api-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-book-appointment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    RouterLink
],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.scss',
})
export class BookAppointment {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  private api = inject(ApiService);

  formGroup: FormGroup = this.fb.group({
    patientName: ['', Validators.required],
    patientContact: ['', [Validators.required, Validators.minLength(10)]],
    disease: ['', Validators.required],
    appointmentDate: [new Date(), Validators.required],
  });
  submitted = signal(false);
  loading$ = false;
  minDate = new Date();
  appointmentNo = '';
  constructor() {}

  checkBookingAppoinmentDetails() {
    this.submitted.set(true);
    this.appointmentNo = '';
    if (this.formGroup.invalid) return;
    this.loading$ = true;
    this.api.commonPostMethod('appointments/create', this.formGroup.value).subscribe(
      (res: any) => {
        this.loading$ = false;
        this.snackBarService.success(res?.message ?? 'Saved successfully');
        this.appointmentNo = res?.data?.appointmentId;
      },
      (err: any) => {
        this.loading$ = false;
        this.snackBarService.error(err?.error?.message ?? 'Try again..!');
      }
    );
  }
  goto(url: string) {
    this.router.navigate([url]);
  }
  onlyAllowedNumber(event: any) {
    if (this.onlyAllowedNumberValue(event)) {
      event.preventDefault();
      return false;
    }
    return;
  }
  onlyAllowedNumberValue(event: any) {
    var regex = new RegExp('^[0-9]+$');
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) return true;

    return;
  }
}
