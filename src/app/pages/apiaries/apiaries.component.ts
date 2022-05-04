import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHiveComponent } from 'src/app/components/dialogs/add-hive/add-hive.component';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-apiaries',
  templateUrl: './apiaries.component.html',
  styleUrls: ['./apiaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiariesComponent implements OnInit {
  isLoading = false;
  isApiariesUpdating: boolean;
  apiaries;
  selectedApiary;
  hives;

  constructor(private pagesService: PagesService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    this.pagesService.setPageUrl('apiaries');
  }

  ngOnInit(): void {
    this.getApiaries();
  }

  public openAddHiveDialog(hive?): void {
    const dialogRef = this.dialog.open(AddHiveComponent, {
      width: '800px',
      data: { isEditMode: !!hive, editData: hive, apiaryId: this.selectedApiary.id }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.isApiariesUpdating = true;
        this.cdRef.detectChanges();
        this.addHive(data);
      }
    });
  }

  addHive(body) {
    this.pagesService.addHive(body.hive, body.good, body.worker).subscribe(data => {
      console.log(data);
      this.isApiariesUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  public getHives(): void {
    this.isLoading = true;
    this.pagesService.getHives(this.selectedApiary.id).subscribe(data => {
      this.hives = data;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  private getApiaries(): void {
    this.pagesService.getApiaries().subscribe(data => {
      this.apiaries = data;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

}
