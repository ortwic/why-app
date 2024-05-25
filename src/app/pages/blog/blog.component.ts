import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { BlogService } from '../../services/blog/blog.service';
import { MediaStorageService } from '../../services/common/media-storage.service';
import { BlogPost } from '../../models/blog.model';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [CommonModule, RouterModule, MatCardModule],
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss',
})
export class BlogComponent {
    readonly route = inject(ActivatedRoute);
    readonly service = inject(BlogService);
    readonly storageService = inject(MediaStorageService);
    readonly blogPosts$ = this.service.data$.pipe(
        switchMap(async (posts) => this.resolveUrl(posts))
    );

    constructor() {
        const tag = this.route.snapshot.params['tag']?.toLowerCase();
        const contains = (array: string[]) => {
            return array && array.join().toLowerCase().includes(tag);
        };

        if (tag) {
            this.blogPosts$ = this.service.data$.pipe(
                map((posts) => posts.filter((post) => contains(post.tags))),
                switchMap(async (posts) => this.resolveUrl(posts))
            );
            document.title = 'Blog - ' + tag + ' | Why App';
        }
    }

    private async resolveUrl(posts: BlogPost[]) {
        return Promise.all(posts.map(async (post) => {
            const path = post.images[0]?.value;
            const imageUrl = await this.storageService.downloadUrl(path);
            return { 
                ...post, 
                imageSrc: imageUrl 
            };
        }));
    }
}
