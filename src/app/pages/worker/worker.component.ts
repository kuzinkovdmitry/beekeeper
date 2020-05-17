import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerComponent implements OnInit {

  constructor(private pagesService: PagesService) {
    this.pagesService.setPageUrl('worker');
  }

  ngOnInit(): void {
  }

}
