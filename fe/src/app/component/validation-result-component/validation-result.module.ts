import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialsModule} from '../../app-materials.module';
import {ValidationResultComponent} from './validation-result.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ValidationResultTreeComponent} from './validation-result-tree.component';
import {ValidationResultConsoleComponent} from './validation-result-console.component';
import {ValidationResultListingComponent} from './validation-result-listing.component';
import {ValidationResultLogComponent} from './validation-result-log.component';
import {ValidationResultTableComponent} from './validation-result-table.component';
import {DataEditorModule} from '../data-editor-component/data-editor.module';

@NgModule({
   imports: [
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      AppMaterialsModule,
      DataEditorModule,
      FlexLayoutModule,
   ],
   declarations: [
       ValidationResultComponent,
       ValidationResultTreeComponent,
       ValidationResultConsoleComponent,
       ValidationResultListingComponent,
       ValidationResultLogComponent,
       ValidationResultTableComponent,
   ],
   exports: [
      ValidationResultComponent,
      ValidationResultTreeComponent,
      ValidationResultConsoleComponent,
      ValidationResultListingComponent,
      ValidationResultLogComponent,
      ValidationResultTableComponent,
   ]
})
export class ValidationResultModule {

}