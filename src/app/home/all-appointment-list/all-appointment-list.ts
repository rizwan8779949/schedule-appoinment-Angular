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
import { userMgmtInitial } from '../../shared/ngrx/allUserMgmt/user-mgmt.actions';
import { userMgmtError, userMgmtLoading, userMgmtSelector } from '../../shared/ngrx/allUserMgmt/user-mgmt.selectors';

@Component({
  selector: 'app-all-users-list',
  imports: [
    CommonModule,
    CommonHeader,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './all-appointment-list.html',
  styleUrl: './all-appointment-list.scss',
})
export class AllAppoinmentList implements OnInit, OnDestroy {
 dataSourceAppoinmentList = new MatTableDataSource<any>();
  displayedColumns = ['username', 'email', 'jobRole', 'action'];

  isLoading = false;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(userMgmtInitial());

    this.store
      .pipe(select(userMgmtSelector), takeUntil(this.destroy$))
      .subscribe((users) => {
        this.dataSourceAppoinmentList.data = users ?? [];
      });

    this.store
      .pipe(select(userMgmtLoading), takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });

    this.error$ = this.store.pipe(select(userMgmtError));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 

  deleteUserConfirmDialog(deleteUserObject: any) {
    const dialogRef = this.dialog.open(CommonConfirmationDialog, {
      disableClose: true,
      data:
      {
        dialogType:'userDashboard',
        dialogData:deleteUserObject
      }
      ,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.store.dispatch(userMgmtInitial()); 
      }
    });
  }

  goto(url: string) {
    this.router.navigate([url]);
  }
}
