import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { PageComponent } from './pages/page/page.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ErrorComponent } from './pages/error/error.component';
import { SummaryComponent } from './pages/summary/summary.component';

export const routes: Routes = [
    { 
        path: '', 
        title: 'Start | Why App', 
        component: StartComponent
    },
    { 
        path: 'p/:unit',
        component: PageComponent,
        resolve: {
            unit: (route: ActivatedRouteSnapshot) => route.params['unit']
        }
    },
    { 
        path: 'p/:unit/:page',
        component: PageComponent,
        resolve: {
            unit: (route: ActivatedRouteSnapshot) => route.params['unit'],
            page: (route: ActivatedRouteSnapshot) => route.params['page']
        }
    },
    { 
        path: 'summary',
        title: 'Auswertung | Why App',
        component: SummaryComponent,
    },
    { 
        path: 'blog',
        title: 'Blog | Why App',
        component: BlogComponent,
    },
    { 
        path: 'blog/:tag',
        component: BlogComponent,
        resolve: {
            tag: (route: ActivatedRouteSnapshot) => route.params['tag']
        }
    },
    { 
        path: 'post/:id', 
        component: BlogPostComponent,
    },
    {
        path: 'settings',
        title: 'Einstellungen | Why App',
        component: SettingsComponent
    },
    {
        path: '**',
        title: 'Error | Why App',
        component: ErrorComponent
    }
];
