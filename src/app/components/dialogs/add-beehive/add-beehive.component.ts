import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-beehive',
  templateUrl: './add-beehive.component.html',
  styleUrls: ['./add-beehive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBeehiveComponent implements OnInit {
  addBeehiveForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddBeehiveComponent>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addBeehiveForm = new FormGroup({
      amountOfFrames: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required])
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addBeehive() {
    this.dialogRef.close(this.addBeehiveForm.value);
  }
}
