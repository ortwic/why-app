import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { termsOfUseGuard } from './guards/terms-of-use.guard';
import { StartComponent } from './routes/start/start.component';
import { PageComponent } from './routes/page/page.component';
import { BlogComponent } from './routes/blog/blog.component';
import { BlogPostComponent } from './routes/blog/blog-post.component';
import { SettingsComponent } from './routes/settings/settings.component';
import { ErrorComponent } from './routes/error/error.component';
import { SummaryComponent } from './routes/summary/summary.component';

export const routes: Routes = [
    { 
        path: '', 
        title: 'Start | Why App', 
        component: StartComponent,
        canActivate: [termsOfUseGuard]
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
        canActivate: [termsOfUseGuard]
    },
    { 
        path: 'blog',
        title: 'Blog | Why App',
        canActivate: [termsOfUseGuard],
        component: BlogComponent
    },
    { 
        path: 'blog/:id', 
        component: BlogPostComponent,
        canActivate: [termsOfUseGuard]
    },
    {
        path: 'settings',
        title: 'Einstellungen | Why App',
        component: SettingsComponent,
        canActivate: [termsOfUseGuard]
    },
    {
        path: '**',
        title: 'Error | Why App',
        component: ErrorComponent
    }
];
