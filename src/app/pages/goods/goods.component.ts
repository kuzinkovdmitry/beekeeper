import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGoodComponent } from 'src/app/components/dialogs/add-good/add-good.component';
import { RemoveConfirmComponent } from 'src/app/components/dialogs/remove-confirm/remove-confirm.component';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsComponent implements OnInit {
  isLoading = false;
  isGoodsUpdating: boolean;
  goods: any[];

  constructor(private pagesService: PagesService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    this.pagesService.setPageUrl('goods');
  }

  ngOnInit(): void {
    this.getGoods();
  }

  public openAddGoodDialog(good?): void {
    const dialogRef = this.dialog.open(AddGoodComponent, {
      width: '800px',
      data: { isEditMode: !!good, editData: good }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.isGoodsUpdating = true;
        this.cdRef.detectChanges();
        good ? this.editGood(data) : this.addGood(data);
      }
    });
  }

  openRemoveConfirmDialog(goodId: number) {
    const dialogRef = this.dialog.open(RemoveConfirmComponent, {
      width: '400px',
      data: {text: 'Do you really want to delete this good?'}
    });

    dialogRef.afterClosed().subscribe((isRemove: boolean) => {
      if (isRemove) {
        this.isGoodsUpdating = true;
        this.cdRef.detectChanges();
        this.removeGood(goodId);
      }
    });
  }

  removeGood(goodId: number) {
    this.pagesService.deleteGood(goodId).subscribe(() => {
      this.goods = this.goods.filter(item => item.id !== goodId);
      this.isGoodsUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  private addGood(goodData): void {
    this.pagesService.addGood(goodData).subscribe(data => {
      this.goods.push(data);
      this.isGoodsUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  private editGood(goodData): void {
    this.pagesService.editGood(goodData).subscribe((data: any) => {
      this.goods = this.goods.map(good => good.id === data.id ? data : good);
      this.isGoodsUpdating = false;
      this.cdRef.detectChanges();
    });
  }

  private getGoods(): void {
    this.pagesService.getGoods().subscribe((data: any[]) => {
      this.goods = data;
      this.cdRef.detectChanges();
    });
  }

}
