import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hive-statistics',
  templateUrl: './hive-statistics.component.html',
  styleUrls: ['./hive-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiveStatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
