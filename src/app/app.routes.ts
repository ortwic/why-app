import { Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

export const routes: Routes = [
    { path: '', component: StartComponent, title: 'Start' },
    { path: 'blog', component: BlogComponent, title: 'Blog' },
    { path: 'blog/:tag', component: BlogComponent, title: 'Blog (filtered)' },
    { path: 'post/:id', component: BlogPostComponent, title: 'Details' },
];
