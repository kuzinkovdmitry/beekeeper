import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  pagesUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private translate: TranslateService) {
  }

  setPageUrl(url: string) {
    this.pagesUrl.next(url);
  }

  getSelectedLang() {
    return localStorage.getItem('lang');
  }

  getUserData() {
    return localStorage.getItem('userData');
  }

  changeLanguage(key: string) {
    this.translate.use(key);
    localStorage.setItem('lang', key);
  }
}
