import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { CapitalizePipe } from './htmlFilter.pipe'; 
import { QuillModule } from 'ngx-quill';
import { ClickOutsideModule } from 'ng-click-outside';

//import { NguiStickyModule  } from '@ngui/sticky';
//import { NgxEditorModule } from 'ngx-editor';
import { NgStickyModule } from 'ng-sticky';


@NgModule({
    imports: [CommonModule, BlankPageRoutingModule,DndModule.forRoot(),FormsModule,FancyImageUploaderModule,QuillModule,ClickOutsideModule,NgStickyModule.forRoot()],
    declarations: [BlankPageComponent,CapitalizePipe]
})
export class BlankPageModule {
    public apiurl="http://devrevamp.speakingtree.in";
}
