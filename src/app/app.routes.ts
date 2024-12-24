import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./features/registration/registration.component').then(
            (m) => m.RegistrationComponent
        )
    },
    {
        path: 'list',
        loadComponent: ()=> import('./features/list-registration/list-registration.component').then(
            (m) => m.ListRegistrationComponent
        )
    },
];
