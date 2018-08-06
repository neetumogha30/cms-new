import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectUrlRoutingModule } from './direct-url-routing.module';
import { DirectUrlComponent } from './direct-url.component';

@NgModule({
  imports: [
    CommonModule,
    DirectUrlRoutingModule
  ],
  declarations: [DirectUrlComponent]
})
export class DirectUrlModule { }
