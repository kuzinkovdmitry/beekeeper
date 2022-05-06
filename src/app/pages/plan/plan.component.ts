import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent implements OnInit {
  isLoading = false;
  selectedAlgorithm;
  algorithms;

  constructor(private pagesService: PagesService,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
this.pagesService.setPageUrl('plan');
}

  ngOnInit(): void {
  }

}
