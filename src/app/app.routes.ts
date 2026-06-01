import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Logout } from './features/auth/logout/logout';
import { NotFound } from './features/auth/not-found/not-found';
import { Home } from './features/home/home';
import { Layout } from './layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'admin',
                loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
            }
        ]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'logout',
        component: Logout
    },
    {
        path: 'not-found',
        component: NotFound
    }
];
