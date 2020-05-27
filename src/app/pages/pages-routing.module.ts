import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HiveStatisticsComponent} from './hive-statistics/hive-statistics.component';
import {WorkStatisticsComponent} from './work-statistics/work-statistics.component';
import {WorkerComponent} from './worker/worker.component';
import {PagesComponent} from './pages.component';
import {AuthGuard} from '../guards/auth.guard';
import {WeatherStatisticsComponent} from './weather-statistics/weather-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'hive-statistics',
        component: HiveStatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'weather-statistics',
        component: WeatherStatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'work-statistics',
        component: WorkStatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'worker',
        component: WorkerComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
