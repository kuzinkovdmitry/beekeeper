import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Self} from '@angular/core';
import {PagesService} from '../../services/pages.service';
import {TranslateService} from '@ngx-translate/core';
import {NgOnDestroy} from '../../services/destroy.service';
import {WEATHER_CHART_PERIOD} from '../../data/chart-period';
import {Chart} from 'angular-highcharts';
import * as moment from 'moment';
import {CHART_CONFIG} from '../../data/chart-config';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-weather-statistics',
  templateUrl: './weather-statistics.component.html',
  styleUrls: ['./weather-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class WeatherStatisticsComponent implements OnInit {
  weatherStatisticsChart: Chart;
  weatherStatisticsChartData;
  weatherStatisticsChartConfig;
  CHART_PERIOD = WEATHER_CHART_PERIOD;
  isLoading = true;

  constructor(private pagesService: PagesService,
              private translateService: TranslateService,
              private cdRef: ChangeDetectorRef,
              @Self() private onDestroy$: NgOnDestroy) {
    this.pagesService.setPageUrl('weather-statistics');
  }

  ngOnInit() {
    this.getWeatherStatisticsData(7);
    this.checkLanguageChanges();
  }

  private getWeatherStatisticsData(periodValue: number) {
    this.isLoading = true;
    this.cdRef.detectChanges();
    const endDate = moment(new Date()).format('YYYY-MM-DD');
    const startDate = moment(endDate).subtract(periodValue - 1, 'days').format('YYYY-MM-DD');
    this.pagesService.getWeatherStatisticData(startDate, endDate).subscribe((data: any[]) => {
      this.weatherStatisticsChartData = data;
      this.setWeatherStatisticsChart();
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  setWeatherStatisticsChart() {
    this.weatherStatisticsChartConfig = Object.assign(CHART_CONFIG);
    this.weatherStatisticsChartConfig.yAxis.labels.format = '{value} ℃';
    this.weatherStatisticsChartConfig.tooltip.pointFormat = '<div>' +
      '<p style="color: #000000">{point.y} ℃</p>' +
      '</div>';
    this.weatherStatisticsChartConfig.xAxis.categories = this.getxAxisCategories();
    this.weatherStatisticsChartConfig.series = this.getSeries();
    this.weatherStatisticsChart = new Chart(this.weatherStatisticsChartConfig);
    this.cdRef.detectChanges();
  }

  getxAxisCategories() {
    return this.weatherStatisticsChartData.dates;
  }

  getSeries() {
    return [
      {
        name: 'temperature',
        data: this.setNegativeColor(),
        borderWidth: 0,
        opacity: 0.7
      }
    ];
  }

  private setNegativeColor() {
    const negativeColor = 'red';
    const defaultColor = 'green';
    return this.weatherStatisticsChartData.temperature.map(item => {
      return {
        y: item,
        color: item <= 5 ? negativeColor : defaultColor
      };
    });
  }

  public changeWeatherStatisticPeriod(period) {
    if (!period.active) {
      this.CHART_PERIOD = this.CHART_PERIOD.map(item => {
        return {...item, active: period.value === item.value};
      });
      this.getWeatherStatisticsData(period.value);
      this.cdRef.detectChanges();
    }
  }

  private checkLanguageChanges() {
    this.pagesService.selectedLang
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => this.setWeatherStatisticsChart());
  }
}
