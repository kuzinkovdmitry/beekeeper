import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWorkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
