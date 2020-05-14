import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toLoginPage() {
    this.router.navigate(['login']).then();
  }

}
