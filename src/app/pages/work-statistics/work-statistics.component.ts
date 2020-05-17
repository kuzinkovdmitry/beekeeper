import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PagesService} from '../../services/pages.service';

@Component({
  selector: 'app-work-statistics',
  templateUrl: './work-statistics.component.html',
  styleUrls: ['./work-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkStatisticsComponent implements OnInit {

  constructor(private pagesService: PagesService) {
    this.pagesService.setPageUrl('work-statistics');
  }

  ngOnInit(): void {
  }

}
