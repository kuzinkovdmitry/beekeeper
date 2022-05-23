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

  getGoods(id) {
    return this.http.get(`${BASE_URL}goods/getAllGoodsByApiary?id=${id}`);
  }

  addGood(goodData) {
    return this.http.post(`${BASE_URL}goods/add`, goodData);
  }

  editGood(goodData) {
    return this.http.put(`${BASE_URL}goods/update`, goodData);
  }

  deleteGood(id: number) {
    return this.http.delete(`${BASE_URL}goods/delete?id=${id}`);
  }

  getApiaries() {
    return this.http.get(`${BASE_URL}apiary/getAllApiaries`);
  }

  getHives(id) {
    return this.http.get(`${BASE_URL}goodsExtraction/getAllGoodsExtractionByApiary?id=${id}`);
  }

  getBeehives(id) {
    return this.http.get(`${BASE_URL}beehive/byAppiaryId?id=${id}`);
  }

  addHive(hiveId: number, goodId: number, workerId: number, finalCountOfFrames: number) {
    return this.http.get(`${BASE_URL}goodsExtraction/add?goodsId=${goodId}&beehiveId=${hiveId}&workerId=${workerId}&finalCountOfFrames=${finalCountOfFrames}`);
  }

  editHive(id: number, hiveId: number, goodId: number, workerId: number, finalCountOfFrames: number) {
    return this.http.get(`${BASE_URL}goodsExtraction/update?goodsExtractionId=${id}&goodsId=${goodId}&beehiveId=${hiveId}&workerId=${workerId}&finalCountOfFrames=${finalCountOfFrames}`);
  }

  deleteHive(id: number) {
    return this.http.delete(`${BASE_URL}goodsExtraction/delete?id=${id}`);
  }
}
