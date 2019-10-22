import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialsModule} from '../../app-materials.module';
import {ViewTableComponent} from './view-table.component';
import {ViewEditorComponent} from './view-editor.component';
import {ViewEditorDialogComponent} from './view-editor-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialsModule,
    ],
    declarations: [
        ViewTableComponent,
        ViewEditorComponent,
        ViewEditorDialogComponent,
    ],
    exports: [
        ViewTableComponent,
        ViewEditorComponent,
        ViewEditorDialogComponent,
    ],
    entryComponents: [
        ViewEditorDialogComponent,
    ]
})
export class ViewModule {
}
