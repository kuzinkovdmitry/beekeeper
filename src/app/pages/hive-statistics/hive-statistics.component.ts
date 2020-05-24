import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveConfirmComponent } from '../../components/dialogs/remove-confirm/remove-confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { AddBeehiveComponent } from '../../components/dialogs/add-beehive/add-beehive.component';

@Component({
  selector: 'app-hive-statistics',
  templateUrl: './hive-statistics.component.html',
  styleUrls: ['./hive-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiveStatisticsComponent implements OnInit {
  isLoading = true;
  isBeehiveUpdating: boolean;
  hiveData: any;

  constructor(private pagesService: PagesService,
              private dialog: MatDialog,
              private translateService: TranslateService,
              private cdRef: ChangeDetectorRef) {
    this.pagesService.setPageUrl('hive-statistics');
  }

  ngOnInit() {
    this.getBeehiveStatistics();
  }

  getBeehiveStatistics() {
    this.pagesService.getBeehiveStatistics().subscribe(data => {
      this.hiveData = data;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  openRemoveConfirmDialog(beehiveId: number) {
    const confirmText = this.translateService.instant('beehive-remove-confirm');
    const dialogRef = this.dialog.open(RemoveConfirmComponent, {
      width: '400px',
      data: {text: confirmText}
    });

    dialogRef.afterClosed().subscribe((isRemove: boolean) => {
      if (isRemove) {
        this.isBeehiveUpdating = true;
        this.cdRef.detectChanges();
        this.removeBeehive(beehiveId);
      }
    });
  }

  openAddBeehiveDialog() {
    const dialogRef = this.dialog.open(AddBeehiveComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const beehiveData = {
          amountOfFrames: data.amountOfFrames,
          coordinates: `${data.latitude}, ${data.longitude}`
        };
        this.isBeehiveUpdating = true;
        this.cdRef.detectChanges();
        this.addBeehive(beehiveData);
      }
    });
  }

  addBeehive(beehiveData) {
    this.isBeehiveUpdating = true;
    this.pagesService.addBeehive(beehiveData).subscribe(data => {
      this.hiveData.push(data);
      this.isBeehiveUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  removeBeehive(beehiveId: number) {
    this.pagesService.removeBeehive(beehiveId).subscribe(() => {
      this.hiveData = this.hiveData.filter(item => item.id !== beehiveId);
      this.isBeehiveUpdating = false;
      this.cdRef.detectChanges();
    });
  }
}
