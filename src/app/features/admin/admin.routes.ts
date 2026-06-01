import { Routes } from '@angular/router';

import { Company } from './company/company';
import { Employee } from './employee/employee';
import { Genre } from './genre/genre';
import { User } from './user/user';

export const adminRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: User
    },
    {
        path: 'companies',
        component: Company
    },
    {
        path: 'employees',
        component: Employee
    },
    {
        path: 'genres',
        component: Genre
    }
];
