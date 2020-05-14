import { NgModule } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IMatIcon} from './interfaces/mat-icon.interface';
import {MATERIAL_ICONS_LIST} from './material-icons-list';
import {MatIconRegistry} from '@angular/material/icon';

const MATERIAL_MODULES = [

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
