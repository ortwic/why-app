import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { PageComponent } from './components/page/page.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    { 
        path: '', 
        title: 'Start', 
        component: StartComponent
    },
    { 
        path: 'page/:unit/:page', 
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
