import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modify-worker',
  templateUrl: './modify-worker.component.html',
  styleUrls: ['./modify-worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyWorkerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
