import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService) {
    translate.addLangs(['en', 'ua']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.initLoginState();
  }

  initLoginState() {
    const userData = localStorage.getItem('userData');
    this.authService.setLoginState(!!userData);
  }

  changeLanguage(key: string) {
    this.translate.use(key);
  }
}
