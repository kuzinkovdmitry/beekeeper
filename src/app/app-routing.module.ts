import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HiveStatisticsComponent } from './pages/hive-statistics/hive-statistics.component';
import { WorkStatisticsComponent } from './pages/work-statistics/work-statistics.component';
import { ModifyWorkerComponent } from './pages/modify-worker/modify-worker.component';
import { AddWorkerComponent } from './pages/add-worker/add-worker.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hive-statistics', component: HiveStatisticsComponent},
  {path: 'work-statistics', component: WorkStatisticsComponent},
  {path: 'modify-worker', component: ModifyWorkerComponent},
  {path: 'add-worker', component: AddWorkerComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
