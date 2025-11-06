import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonHeader } from '../../shared/components/common-header/common-header';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../shared/services/api/api-service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonConfirmationDialog } from '../../shared/components/common-confirmation-dialog/common-confirmation-dialog';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar-service';

@Component({
  selector: 'app-all-users-list',
  imports: [
    CommonModule,
    CommonHeader,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './all-appointment-list.html',
  styleUrl: './all-appointment-list.scss',
})
export class AllAppoinmentList implements OnInit {
  dataSourceAppoinmentList = new MatTableDataSource<any>();
  displayedColumns = ['appointmentID', 'patientName', 'patientContact', 'doctorName','doctorContact','appointmentDate','status','action'];

  isLoading = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private api: ApiService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  getAllAppoinments() {
    this.dataSourceAppoinmentList.data = [];
    this.isLoading = true;
    this.api.commonGetMethod('appoinments/getAllAppoinments', {}).subscribe(
      (res) => {
        this.dataSourceAppoinmentList.data = res?.data;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  assignAppoinmentsConfirmDialog(appoinmentsObject: any) {
    const dialogRef = this.dialog.open(CommonConfirmationDialog, {
      disableClose: true,
      data: {
        dialogType: 'userDashboard',
        dialogData: appoinmentsObject,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.getAllAppoinments();
      }
    });
  }

  goto(url: string) {
    this.router.navigate([url]);
  }
}
