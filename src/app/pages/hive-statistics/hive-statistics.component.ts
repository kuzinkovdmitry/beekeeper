import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { MatDialog } from '@angular/material/dialog';
import {RemoveConfirmComponent} from '../../components/dialogs/remove-confirm/remove-confirm.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hive-statistics',
  templateUrl: './hive-statistics.component.html',
  styleUrls: ['./hive-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiveStatisticsComponent implements OnInit {
  isLoading = true;
  isBeehiveRemoving: boolean;
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
        this.isBeehiveRemoving = true;
        this.cdRef.detectChanges();
        this.removeBeehive(beehiveId);
      }
    });
  }

  removeBeehive(beehiveId: number) {
    this.pagesService.removeBeehive(beehiveId).subscribe(data => {
      if (data) {
        this.hiveData = this.hiveData.filter(item => item.id !== beehiveId);
        this.isBeehiveRemoving = false;
        this.cdRef.detectChanges();
      }
    });
  }
}
