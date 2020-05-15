import { Component, OnInit, ChangeDetectionStrategy, Self, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { NgOnDestroy } from '../services/destroy.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class PagesComponent implements OnInit {
  isLogined: boolean;

  constructor(private router: Router,
              private authService: AuthService,
              private cdRef: ChangeDetectorRef,
              @Self() private onDestroy$: NgOnDestroy) { }

  ngOnInit() {
    this.checkLoginStateChanges();
  }

  logout() {
    this.authService.logout();
  }

  checkLoginStateChanges() {
    this.authService.isUserLogined
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: boolean) => {
        this.isLogined = state;
        this.cdRef.detectChanges();
      });
  }

  toLoginPage() {
    this.router.navigate(['login']);
  }
}
