import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWorkerComponent implements OnInit {
  addWorkerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddWorkerComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.initForm();
    if (this.data.isEditMode) {
      this.initEditState();
    }
  }

  initForm() {
    this.addWorkerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      passport: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  initEditState() {
    this.addWorkerForm.patchValue(this.data.editUserData);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addWorker() {
    const formValues = this.addWorkerForm.value;
    if (this.data.isEditMode) {
      formValues.id = this.data.editUserData.id;
    }
    this.dialogRef.close(formValues);
  }

  setRandomPassword() {
    this.addWorkerForm.controls.password.setValue(Math.random().toString(36).slice(-8));
  }

}
