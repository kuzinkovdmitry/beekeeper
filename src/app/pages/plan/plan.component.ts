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
  total: string;
  apiaries;
  selectedApiary;

  constructor(private pagesService: PagesService,
              private cdRef: ChangeDetectorRef) {
  this.pagesService.setPageUrl('plan');
  }

  ngOnInit(): void {
    this.getApiaries();
  }

  private getApiaries(): void {
    this.pagesService.getApiaries().subscribe(data => {
      this.apiaries = data;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  public getDataAlgorythm(): void {
    if (this.selectedApiary) {
      this.getData();
    }
  }

  public getData(): void {
    this.algoritmResult = null;
    this.isLoading = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      if (this.selectedAlgorithm === 'Greeady algorithm') {
        this.algoritmResult = [
          {
            id: 1,
            leftForWinter: 30,
            profit: '15 770',
            goods: [
              { name: 'Propolis', total: 10 },
              { name: 'Honeycomb', total: 13 },
              { name: 'Pollen', total: 10 }
            ]
          },
          {
            id: 2,
            leftForWinter: 25,
            profit: '9 601',
            goods: [
              { name: 'Honey', total: 15 },
              { name: 'Propolis', total: 30 },
              { name: 'Honeycomb', total: 6 }
            ]
          },
          {
            id: 3,
            leftForWinter: 25,
            profit: '11 628',
            goods: [
              { name: 'Bee venom', total: 26 },
              { name: 'Beeswax', total: 12 }
            ]
          },
          {
            id: 4,
            leftForWinter: 25,
            profit: '20 271',
            goods: [
              { name: 'Honey', total: 35 },
              { name: 'Propolis', total: 15 }
            ]
          },
          {
            id: 5,
            leftForWinter: 25,
            profit: '15 196',
            goods: [
              { name: 'Bee venom', total: 22 },
              { name: 'Honeycomb', total: 19 }
            ]
          },
          {
            id: 6,
            leftForWinter: 25,
            profit: '7 512',
            goods: [
              { name: 'Beeswax', total: 26 },
              { name: 'Honeycomb', total: 10 }
            ]
          }
        ];
        this.total = '79 978';
      } else {
        this.algoritmResult = [
          {
            id: 1,
            leftForWinter: 30,
            profit: '14 790',
            goods: [
              { name: 'Honey', total: 20 },
              { name: 'Honeycomb', total: 13 },
              { name: 'Pollen', total: 10 }
            ]
          },
          {
            id: 2,
            leftForWinter: 25,
            profit: '11 601',
            goods: [
              { name: 'Bee venom', total: 20 },
              { name: 'Propolis', total: 40 },
              { name: 'Honeycomb', total: 9 }
            ]
          },
          {
            id: 3,
            leftForWinter: 25,
            profit: '13 728',
            goods: [
              { name: 'Bee venom', total: 36 },
              { name: 'Beeswax', total: 12 }
            ]
          },
          {
            id: 4,
            leftForWinter: 25,
            profit: '22 271',
            goods: [
              { name: 'Honeycomb', total: 30 },
              { name: 'Propolis', total: 15 }
            ]
          },
          {
            id: 5,
            leftForWinter: 25,
            profit: '14 196',
            goods: [
              { name: 'Bee venom', total: 22 },
              { name: 'Honeycomb', total: 19 }
            ]
          },
          {
            id: 6,
            leftForWinter: 25,
            profit: '9 512',
            goods: [
              { name: 'Beeswax', total: 26 },
              { name: 'Honeycomb', total: 10 }
            ]
          }
        ];
        this.total = '77 586';
      }
      this.isLoading = false;
      this.cdRef.detectChanges();
    }, 3000);
  }

}
