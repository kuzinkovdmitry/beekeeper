import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  algorithms = ['Greeady algorithm', 'Borders and branches method'];
  algoritmResult;

  constructor(private pagesService: PagesService,
              private cdRef: ChangeDetectorRef) {
  this.pagesService.setPageUrl('plan');
  }

  ngOnInit(): void {
  }

  public getData(): void {
    this.algoritmResult = null;
    this.isLoading = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.algoritmResult = [
        {
          id: 1,
          leftForWinter: 110,
          profit: '220 000',
          goods: [
            { name: 'Honey', total: 10 },
            { name: 'Honeycomb', total: 11 }
          ]
        },
        {
          id: 2,
          leftForWinter: 77,
          profit: '12 309',
          goods: [
            { name: 'Honey', total: 4 },
            { name: 'Honeycomb', total: 21 }
          ]
        }
      ];
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

}
