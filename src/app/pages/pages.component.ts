import { Component, OnInit, ChangeDetectionStrategy, Self, ChangeDetectorRef } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from '../services/destroy.service';
import { MENU_LIST } from '../data/menu-list';
import { PagesService } from '../services/pages.service';
import { LANGUAGES } from '../data/languages';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class PagesComponent implements OnInit {
  isLogined: boolean;
  menuList = MENU_LIST;
  languageList = LANGUAGES;
  languageControl: FormControl;
  selectedLang: string;
  userData;

  constructor(private router: Router,
              private authService: AuthService,
              private pagesService: PagesService,
              private cdRef: ChangeDetectorRef,
              @Self() private onDestroy$: NgOnDestroy) { }

  ngOnInit() {
    this.languageControl = new FormControl('');
    this.setUserData();
    this.checkLanguageControlChanges();
    this.initLanguage();
    this.checkLoginStateChanges();
    this.checkActivePage();
  }

  checkLoginStateChanges() {
    this.authService.isUserLogined
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: boolean) => {
        this.isLogined = state;
        this.cdRef.detectChanges();
      });
  }

  setUserData() {
    const userData = this.pagesService.getUserData();
    this.userData = userData ? JSON.parse(userData) : '';
    this.cdRef.detectChanges();
  }

  checkActivePage() {
    this.pagesService.pagesUrl
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((url: string) => {
        this.menuList = this.menuList.map(item => {
            return {
              ...item,
              active: item.key === url
            };
        });
        this.cdRef.detectChanges();
      });
  }

  initLanguage() {
    const selectedLang = this.pagesService.getSelectedLang();
    this.languageControl.setValue(selectedLang);
  }

  checkLanguageControlChanges() {
    this.languageControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(lang => {
        this.selectedLang = lang;
        this.pagesService.changeLanguage(lang);
      });
  }

  changeLoginState() {
    if (this.isLogined) {
      this.authService.logout();
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
