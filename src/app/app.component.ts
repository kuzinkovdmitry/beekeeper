import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PagesService } from './services/pages.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private pagesService: PagesService,
              private authService: AuthService) {
    this.initLang();
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.initLoginState();
  }

  initLoginState() {
    const userData = localStorage.getItem('userData');
    this.authService.setLoginState(!!userData);
  }

  initLang() {
    this.translate.addLangs(['en', 'ua']);
    const selectedLang = localStorage.getItem('lang');
    this.pagesService.initLanguageState(selectedLang ? selectedLang : 'en');
  }
}
