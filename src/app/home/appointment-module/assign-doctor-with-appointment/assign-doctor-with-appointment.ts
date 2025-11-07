import { Component, Inject, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '../../../shared/services/snackBar/snack-bar-service';
import { ApiService } from '../../../shared/services/api/api-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-assign-doctor-with-appointment',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './assign-doctor-with-appointment.html',
  styleUrl: './assign-doctor-with-appointment.scss',
})
export class AssignDoctorWithAppointment {
  private fb = inject(FormBuilder);
  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private api: ApiService,
    private snackBar: SnackBarService,
    private matDialogRef: MatDialogRef<AssignDoctorWithAppointment>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  formGroup: FormGroup = this.fb.group({
    patientName: ['', ],
     appointmentId: ['', ],
    patientContact: [''],
    disease: [''],
    department:['',Validators.required],
    appointmentDate: [],
    doctorId: [],
  });
  allDepartmentList:any[]=[]
  deptBasisDoctorList:any[]=[]
  allDoctorList:any[]=[]
  submitted = signal(false);
  loading$ = false;
  ngOnInit() {
    this.setValues();
    this.getAllDoctors()
  }
  getAllDoctors(){
    this.api.commonGetMethod('doctor/getAlldoctors',{}).subscribe((res:any)=>{
      this.allDepartmentList = [...new Set(res?.data.map((doc:any) => doc.department))];
      this.allDoctorList=res?.data
    })
  }
  onSelectChange(){
    this.deptBasisDoctorList=this.allDoctorList.filter((item:any)=>item?.department==this.formGroup.value?.department)
  }
  setValues() {
    this.formGroup.patchValue({
      patientName: this.data?.dialogData?.patientName ?? '',
      patientContact: this.data?.dialogData?.patientContact ?? '',
      disease: this.data?.dialogData?.disease ?? '',
      appointmentDate: this.data?.dialogData?.appointmentDate ?? '',
      appointmentId: this.data?.dialogData?.appointmentId ?? '',
    });
  }
  assignDoctorAppoinmentDetails() {
    this.submitted.set(true);
    if (this.formGroup.invalid) return;
    this.loading$ = true;
    this.api.commonPostMethod('appointments/scheduleAppointment', this.formGroup.value).subscribe(
      (res: any) => {
        this.loading$ = false;
        this.snackBarService.success(res?.message ?? 'Scheduled successfully');
        this.matDialogRef.close();
      },
      (err: any) => {
        this.loading$ = false;
        this.snackBarService.error(err?.error?.message ?? 'Try again..!');
      }
    );
  }
  closeDialog() {
    this.matDialogRef.close();
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
