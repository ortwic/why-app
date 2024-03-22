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
        title: 'Start', 
        component: StartComponent
    },
    { 
        path: 'p/:unit/:page', 
        title: 'Seite',
        component: PageComponent,
        resolve: {
            unit: (route: ActivatedRouteSnapshot) => route.params['unit'],
            page: (route: ActivatedRouteSnapshot) => route.params['page']
        }
    },
    { 
        path: 'blog', 
        title: 'Blog',
        component: BlogComponent,
    },
    { 
        path: 'blog/:tag', 
        title: 'Blog',
        component: BlogComponent,
        resolve: {
            tag: (route: ActivatedRouteSnapshot) => route.params['tag']
        }
    },
    { 
        path: 'post/:id', 
        title: 'Details', 
        component: BlogPostComponent,
    },
    {
        path: 'settings',
        title: 'Einstellungen',
        component: SettingsComponent
    },
    {
        path: 'imprint',
        title: 'Impressum',
        component: ImprintComponent
    },
    {
        path: 'privacy',
        title: 'Datenschutz',
        component: PrivacyComponent
    },
    {
        path: '**',
        title: 'Error',
        component: ErrorComponent
    }
];
