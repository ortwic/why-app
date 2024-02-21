import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { ErrorComponent } from './components/error/error.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

export const routes: Routes = [
    { 
        path: '', 
        title: 'Start', 
        component: StartComponent
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
        path: '**',
        title: 'Error',
        component: ErrorComponent
    }
];
