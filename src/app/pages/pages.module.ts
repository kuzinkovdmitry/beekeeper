import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {WorkerComponent} from './worker/worker.component';
import {HomeComponent} from './home/home.component';
import {WorkStatisticsComponent} from './work-statistics/work-statistics.component';
import {HiveStatisticsComponent} from './hive-statistics/hive-statistics.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ChartModule} from 'angular-highcharts';
import { WeatherStatisticsComponent } from './weather-statistics/weather-statistics.component';
import { GoodsComponent } from './goods/goods.component';
import { ApiariesComponent } from './apiaries/apiaries.component';
import { PlanComponent } from './plan/plan.component';

@NgModule({
  declarations: [
    PagesComponent,
    WorkerComponent,
    HomeComponent,
    WorkStatisticsComponent,
    HiveStatisticsComponent,
    WeatherStatisticsComponent,
    GoodsComponent,
    ApiariesComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PagesRoutingModule
  ],
  providers: []
})
export class PagesModule {
}
