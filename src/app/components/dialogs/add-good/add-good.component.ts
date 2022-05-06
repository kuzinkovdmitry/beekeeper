import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-good',
  templateUrl: './add-good.component.html',
  styleUrls: ['./add-good.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGoodComponent implements OnInit {
  addGoodForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddGoodComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data.isEditMode) {
      this.initEditState();
    }
  }

  initForm() {
    this.addGoodForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      restrictions: new FormControl(0, [Validators.required]),
      volume: new FormControl(0, [Validators.required]),
      cost: new FormControl(0, [Validators.required]),
      usedForWinter: new FormControl(false, [Validators.required])
    });
  }

  save() {
    const formValues = this.addGoodForm.value;
    if (formValues.usedForWinter && formValues.cost) {
      this.openSnackBar('Goods used for wintering bees cannot be sold');
      return;
    }
    if (this.data.isEditMode) {
      formValues.id = this.data.editData.id;
    }
    this.dialogRef.close(formValues);
  }

  openSnackBar(message: string) {
    this.snackBar.open(
      message,
      'ОК',
      {
        duration: 5000,
        verticalPosition: 'top'
      });
  }

  initEditState() {
    this.addGoodForm.patchValue(this.data.editData);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
