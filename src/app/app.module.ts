import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RemoveConfirmComponent } from './components/dialogs/remove-confirm/remove-confirm.component';
import { AddBeehiveComponent } from './components/dialogs/add-beehive/add-beehive.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AddWorkerComponent } from './components/dialogs/add-worker/add-worker.component';
import { AddGoodComponent } from './components/dialogs/add-good/add-good.component';
import { AddHiveComponent } from './components/dialogs/add-hive/add-hive.component';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    RemoveConfirmComponent,
    AddBeehiveComponent,
    AddWorkerComponent,
    AddGoodComponent,
    AddHiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
