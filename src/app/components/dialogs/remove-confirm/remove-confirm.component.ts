import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-remove-confirm',
  templateUrl: './remove-confirm.component.html',
  styleUrls: ['./remove-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
