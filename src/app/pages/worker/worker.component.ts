import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { PagesService } from '../../services/pages.service';
import {RemoveConfirmComponent} from "../../components/dialogs/remove-confirm/remove-confirm.component";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AddBeehiveComponent} from '../../components/dialogs/add-beehive/add-beehive.component';
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
      console.log(data);
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

  openAddWorkerDialog() {
    const dialogRef = this.dialog.open(AddWorkerComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        data.role = {
          id: 0,
          name: data.role
        };
        console.log(data);
        // this.isWorkersUpdating = true;
        this.cdRef.detectChanges();
        // this.addBeehive(beehiveData);
      }
    });
  }
}
