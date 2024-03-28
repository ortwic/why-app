import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { StartComponent } from './pages/start/start.component';
import { PageComponent } from './pages/page/page.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    { 
        path: '', 
        title: 'Start | Why App', 
        component: StartComponent
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
        path: 'imprint',
        title: 'Impressum | Why App',
        component: ImprintComponent
    },
    {
        path: 'privacy',
        title: 'Datenschutz | Why App',
        component: PrivacyComponent
    },
    {
        path: '**',
        title: 'Error | Why App',
        component: ErrorComponent
    }
];
