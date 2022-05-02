import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IMatIcon } from './interfaces/mat-icon.interface';
import { MATERIAL_ICONS_LIST } from './material-icons-list';
import { MatIconRegistry } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

const MATERIAL_MODULES = [
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatRadioModule,
  MatCheckboxModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {
  constructor(private sanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry) {
    const extention = '.svg';
    MATERIAL_ICONS_LIST.forEach((icon: IMatIcon) => {
      const url = sanitizer.bypassSecurityTrustResourceUrl(icon.src + icon.name + extention);
      matIconRegistry.addSvgIcon(icon.name, url);
    });
  }
}
