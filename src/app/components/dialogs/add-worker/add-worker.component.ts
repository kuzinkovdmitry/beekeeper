import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWorkerComponent implements OnInit {
  addWorkerForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddWorkerComponent>) { }

  ngOnInit() {
    this.initForm();
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

  closeDialog() {
    this.dialogRef.close();
  }

  addWorker() {
    this.dialogRef.close(this.addWorkerForm.value);
  }

  setRandomPassword() {
    this.addWorkerForm.controls.password.setValue(Math.random().toString(36).slice(-8));
  }

}
