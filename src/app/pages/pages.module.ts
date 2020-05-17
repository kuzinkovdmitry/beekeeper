import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {WorkerComponent} from './worker/worker.component';
import {HomeComponent} from './home/home.component';
import {WorkStatisticsComponent} from './work-statistics/work-statistics.component';
import {HiveStatisticsComponent} from './hive-statistics/hive-statistics.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    PagesComponent,
    WorkerComponent,
    HomeComponent,
    WorkStatisticsComponent,
    HiveStatisticsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule,
    PagesRoutingModule,
  ],
  providers: []
})
export class PagesModule {
}
