import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private pagesService: PagesService) {
    this.pagesService.setPageUrl('home');
  }
}
