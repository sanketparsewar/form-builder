import { Routes } from '@angular/router';
import { LayoutComponent } from './form-builder/layout/layout/layout.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }

];
