import { NgModule } from '@angular/core';
//import { NgStickyDirective } from 'ng-sticky';
import { Routes, RouterModule } from '@angular/router';
import { BlankPageComponent } from './blank-page.component';
import { AuthGuard } from '../../shared/index';

const routes: Routes = [
    {
        path: '',
        component: BlankPageComponent
    },
    {
        path: 'post/:id',
        component: BlankPageComponent,
        canActivate:[AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlankPageRoutingModule {}
