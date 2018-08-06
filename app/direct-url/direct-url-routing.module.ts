import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectUrlComponent } from './direct-url.component';

const routes: Routes = [
    {
        path: '', component: DirectUrlComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DirectUrlRoutingModule {
}
