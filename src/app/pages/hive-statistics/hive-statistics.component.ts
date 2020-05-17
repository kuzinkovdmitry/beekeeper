import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-hive-statistics',
  templateUrl: './hive-statistics.component.html',
  styleUrls: ['./hive-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiveStatisticsComponent implements OnInit {

  constructor(private pagesService: PagesService) {
    this.pagesService.setPageUrl('hive-statistics');
  }

  ngOnInit(): void {
  }

}
