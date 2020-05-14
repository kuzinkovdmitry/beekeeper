import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HiveStatisticsComponent} from './hive-statistics/hive-statistics.component';
import {WorkStatisticsComponent} from './work-statistics/work-statistics.component';
import {ModifyWorkerComponent} from './modify-worker/modify-worker.component';
import {AddWorkerComponent} from './add-worker/add-worker.component';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'hive-statistics', component: HiveStatisticsComponent},
      {path: 'work-statistics', component: WorkStatisticsComponent},
      {path: 'modify-worker', component: ModifyWorkerComponent},
      {path: 'add-worker', component: AddWorkerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
