import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { PagesService } from '../../services/pages.service';
import {RemoveConfirmComponent} from '../../components/dialogs/remove-confirm/remove-confirm.component';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {AddWorkerComponent} from '../../components/dialogs/add-worker/add-worker.component';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerComponent implements OnInit {
  isLoading = true;
  isWorkersUpdating: boolean;
  workersData;

  constructor(private pagesService: PagesService,
              private translateService: TranslateService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    this.pagesService.setPageUrl('worker');
  }

  ngOnInit(): void {
    this.getWorkers();
  }

  getWorkers() {
    this.isLoading = true;
    this.cdRef.detectChanges();
    this.pagesService.getWorkers().subscribe(data => {
      this.workersData = data;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  openRemoveConfirmDialog(workerId: number) {
    const confirmText = this.translateService.instant('worker-remove-confirm');
    const dialogRef = this.dialog.open(RemoveConfirmComponent, {
      width: '400px',
      data: {text: confirmText}
    });

    dialogRef.afterClosed().subscribe((isRemove: boolean) => {
      if (isRemove) {
        this.isWorkersUpdating = true;
        this.cdRef.detectChanges();
        this.removeWorker(workerId);
      }
    });
  }

  removeWorker(workerId: number) {
    this.pagesService.removeWorker(workerId).subscribe(() => {
      this.workersData = this.workersData.filter(item => item.id !== workerId);
      this.isWorkersUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  addWorker(workerData) {
    this.pagesService.addWorker(workerData).subscribe(data => {
      this.workersData.push(data);
      this.isWorkersUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  editWorker(workerData) {
    this.pagesService.editWorker(workerData).subscribe((data: any) => {
      this.workersData = this.workersData.map(worker => worker.id === data.id ? data : worker);
      this.isWorkersUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  openAddWorkerDialog(userData?) {
    const editUserData = {...userData};
    const isEditMode = Object.keys(editUserData).length;
    if (isEditMode) {
      editUserData.role = editUserData.role.name;
    }
    const dialogRef = this.dialog.open(AddWorkerComponent, {
      width: '800px',
      data: {
        editUserData: isEditMode ? editUserData : undefined,
        isEditMode: !!isEditMode
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        data.role = {
          id: data.role === 'ADMIN' ? 7282 : 7289,
          name: data.role
        };
        this.isWorkersUpdating = true;
        this.cdRef.detectChanges();
        isEditMode ? this.editWorker(data) : this.addWorker(data);
      }
    });
  }
}
