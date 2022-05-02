import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-apiaries',
  templateUrl: './apiaries.component.html',
  styleUrls: ['./apiaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiariesComponent implements OnInit {
  isLoading = false;
  isApiariesUpdating: boolean;
  apiaries: any[];

  constructor(private pagesService: PagesService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
    this.pagesService.setPageUrl('apiaries');
  }

  ngOnInit(): void {
  }

}
