import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Self } from '@angular/core';
import { PagesService } from '../../services/pages.service';
import { Chart } from 'angular-highcharts';
import { CHART_CONFIG } from '../../data/chart-config';
import { CHART_PERIOD } from '../../data/chart-period';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil} from 'rxjs/operators';
import { NgOnDestroy } from '../../services/destroy.service';

@Component({
  selector: 'app-work-statistics',
  templateUrl: './work-statistics.component.html',
  styleUrls: ['./work-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class WorkStatisticsComponent implements OnInit {
  workStatisticsChart: Chart;
  workStatisticsChartData;
  workStatisticsChartConfig;
  CHART_PERIOD = CHART_PERIOD;
  isLoading = true;

  constructor(private pagesService: PagesService,
              private translateService: TranslateService,
              private cdRef: ChangeDetectorRef,
              @Self() private onDestroy$: NgOnDestroy) {
    this.pagesService.setPageUrl('work-statistics');
  }

  ngOnInit() {
    this.getWorkStatisticsData(10);
    this.checkLanguageChanges();
  }

  private setWorkStatisticsChart() {
    this.workStatisticsChartConfig = Object.assign(CHART_CONFIG);
    this.changeLanguageCondition();
    this.workStatisticsChartConfig.yAxis.max = 24;
    this.workStatisticsChartConfig.xAxis.categories = this.getxAxisCategories();
    this.workStatisticsChartConfig.series = this.getSeries();
    this.workStatisticsChart = new Chart(this.workStatisticsChartConfig);
    this.cdRef.detectChanges();
  }

  private getWorkStatisticsData(periodValue: number) {
    this.isLoading = true;
    this.cdRef.detectChanges();
    const endDate = moment(new Date()).format('YYYY-MM-DD');
    const startDate = moment(endDate).subtract(periodValue - 1, 'days').format('YYYY-MM-DD');
    this.pagesService.getWorkStatisticData(startDate, endDate).subscribe((data: any[]) => {
      this.workStatisticsChartData = data;
      this.setWorkStatisticsChart();
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  getxAxisCategories() {
    const xAxisCategories = [];
    this.workStatisticsChartData[0].workingHoursValues.forEach(item => {
      if (!xAxisCategories.find(day => day === item.day)) {
        xAxisCategories.push(item.day);
      }
    });
    return xAxisCategories;
  }

  getSeries() {
    const series = [];
    this.workStatisticsChartData.forEach((worker, index) => {
      const seriesItem = {
        name: `${worker.worker.lastName} ${worker.worker.firstName}`,
        data: [],
        borderWidth: 0,
        opacity: 0.7
      };
      series.push(seriesItem);
      worker.workingHoursValues.forEach(day => series[index].data.push(day.hours));
    });
    return series;
  }

  public changeWorkStatisticPeriod(period) {
    if (!period.active) {
      this.CHART_PERIOD = this.CHART_PERIOD.map(item => {
        return {...item, active: period.value === item.value};
      });
      this.getWorkStatisticsData(period.value);
      this.cdRef.detectChanges();
    }
  }

  private changeLanguageCondition() {
    if (localStorage.getItem('lang') === 'ua') {
      this.workStatisticsChartConfig.tooltip.pointFormat = '<div>' +
        '<p style="color: {point.color}">{series.name}: {point.y} год.</p>' +
        '</div>';
      this.workStatisticsChartConfig.yAxis.labels.format = '{value} годин';
    } else {
      this.workStatisticsChartConfig.tooltip.pointFormat = '<div>' +
        '<p style="color: {point.color}">{series.name}: {point.y} hours</p>' +
        '</div>';
      this.workStatisticsChartConfig.yAxis.labels.format = '{value} hours';
    }
  }

  private checkLanguageChanges() {
    this.pagesService.selectedLang
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.setWorkStatisticsChart());
  }

}
