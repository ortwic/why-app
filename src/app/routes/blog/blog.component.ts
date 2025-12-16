import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BlogPostView, BlogService } from '../../services/content/blog.service';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnDestroy {
    private readonly subscriptions: Subscription;
    private readonly blogPostsSubject = new BehaviorSubject<BlogPostView[]>([]);
    readonly blogPosts$ = this.blogPostsSubject.asObservable();

    constructor(route: ActivatedRoute, service: BlogService) {
        this.subscriptions = service.getBlogPosts(route.fragment)
            .subscribe(posts => this.blogPostsSubject.next(posts));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
