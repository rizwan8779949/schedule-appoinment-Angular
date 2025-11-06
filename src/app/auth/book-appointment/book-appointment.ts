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

  ],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.scss',
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },]
})
export class BookAppointment {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  private api = inject(ApiService);

  formGroup: FormGroup = this.fb.group({
    patientName: ['', Validators.required],
    patientContact: ['', Validators.required],
    disease: ['', Validators.required],
    appointmentDate: ['', Validators.required],
  });
  allRoleList = ['User', 'Admin'];
  submitted = signal(false);
  loading$ = false;

  minDate = new Date();

  constructor() {}

  checkBookingAppoinmentDetails() {
    this.submitted.set(true);

    if (this.formGroup.invalid) return;
    this.loading$ = true;
    this.api.commonPostMethod('user/login', this.formGroup.value).subscribe(
      (res: any) => {
        this.loading$ = false;
        localStorage.setItem('loggedInUserData', JSON.stringify(res));
        this.snackBarService.success('Logged in successfully');
        this.router.navigate(['/appointments']);
      },
      (err: any) => {
        this.loading$ = false;
        this.snackBarService.error(err?.error?.message ?? 'Try again..!');
      }
    );
  }
}
