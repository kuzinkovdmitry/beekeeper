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
          leftForWinter: 30,
          profit: '12 770',
          goods: [
            { name: 'Honey', total: 5 },
            { name: 'Honeycomb', total: 23 }
          ]
        }
      ];
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 1000);
  }

}
