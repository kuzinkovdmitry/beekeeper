import { PagesService } from 'src/app/services/pages.service';
import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-add-hive',
  templateUrl: './add-hive.component.html',
  styleUrls: ['./add-hive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHiveComponent implements OnInit {
  addHiveForm: FormGroup;
  apiaryId: number;
  hives;
  goods;
  workers;

  constructor(private dialogRef: MatDialogRef<AddHiveComponent>,
              private pagesService: PagesService,
              @Inject(MAT_DIALOG_DATA) public data,
              private cdRef: ChangeDetectorRef) {
    this.apiaryId = data.apiaryId;
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    if (this.data.isEditMode) {
      this.initEditState();
    }
  }

  getData() {
    combineLatest([
      this.pagesService.getBeehives(this.apiaryId),
      this.pagesService.getGoods(this.apiaryId),
      this.pagesService.getWorkers()
    ]).subscribe(([hives, goods, workers]) => {
      this.hives = hives;
      this.goods = goods;
      this.workers = workers;
      this.cdRef.detectChanges();
    });
  }

  initForm() {
    this.addHiveForm = new FormGroup({
      hive: new FormControl('', [Validators.required]),
      good: new FormControl('', [Validators.required]),
      worker: new FormControl('', [Validators.required]),
      finalCountOfFrames: new FormControl('', [Validators.required])
    });
  }

  save() {
    const formValues = this.addHiveForm.value;
    if (this.data.isEditMode) {
      formValues.id = this.data.editData.id;
    }
    this.dialogRef.close(formValues);
  }

  initEditState() {
    this.addHiveForm.get('hive').setValue(this.data.editData.beehive.id);
    this.addHiveForm.get('good').setValue(this.data.editData.goods.id);
    this.addHiveForm.get('worker').setValue(this.data.editData.beehive.apiaryValue.worker.id);
    this.addHiveForm.get('finalCountOfFrames').setValue(this.data.editData.finalCountOfFrames);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
