import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../data/base-url';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  pagesUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedLang: Subject<string> = new Subject<string>();

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

  initLanguageState(key: string) {
    this.translate.use(key);
    localStorage.setItem('lang', key);
  }

  changeLanguage(key: string) {
    this.translate.use(key);
    localStorage.setItem('lang', key);
    this.selectedLang.next(key);
  }

  getBeehiveStatistics() {
    return this.http.get(`${BASE_URL}currentBeehive/getAllInfo`);
  }

  addBeehive(beehiveData) {
    return this.http.get(`${BASE_URL}currentBeehive/add?frame=${beehiveData.amountOfFrames}&coord=${beehiveData.coordinates}`);
  }

  removeBeehive(id: number) {
    return this.http.get(`${BASE_URL}currentBeehive/delete?id=${id}`);
  }

  getWorkStatisticData(startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}workingHours/byPeriod?startDate=${startDate}&endDate=${endDate}`);
  }

  getWeatherStatisticData(startDate: string, endDate: string) {
    return this.http.get(`${BASE_URL}weatherForecast/forGraph?startDate=${startDate}&endDate=${endDate}`);
  }

  getWorkers() {
    return this.http.get(`${BASE_URL}worker/getAll`);
  }

  removeWorker(id: number) {
    return this.http.get(`${BASE_URL}worker/delete?id=${id}`);
  }

  addWorker(workerData) {
    return this.http.post(`${BASE_URL}worker/add`, workerData);
  }

  editWorker(workerData) {
    return this.http.post(`${BASE_URL}worker/update`, workerData);
  }
}
