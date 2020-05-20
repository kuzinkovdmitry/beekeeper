import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../data/base-url';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  pagesUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private translate: TranslateService,
              private http: HttpClient) {
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

  getBeehiveStatistics() {
    return this.http.get(`${BASE_URL}currentBeehive/getAllInfo`);
  }

  removeBeehive(id: number) {
    return this.http.get(`${BASE_URL}currentBeehive/delete?id=${id}`);
  }
}
