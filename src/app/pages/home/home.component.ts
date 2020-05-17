import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private pagesService: PagesService) {
    this.pagesService.setPageUrl('home');
  }

  ngOnInit(): void {
  }

}
