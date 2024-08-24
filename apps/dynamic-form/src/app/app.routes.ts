import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'angular-form',
        loadChildren: () =>  import('@dynamic-form/angular-form').then( component => component.angularFormRoutes)
    },
    {
        path: '',
        redirectTo: 'angular-form',
        pathMatch: 'full'
    }
];
