import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-work-statistics',
  templateUrl: './work-statistics.component.html',
  styleUrls: ['./work-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkStatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
