import { Injectable } from '@angular/core';
import { orderBy, QueryConstraint, where } from '@angular/fire/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { BlogPost, BlogPostView } from '../../models/blog.model';
import { MediaStorageService } from '../common/media-storage.service';
import { GuideService } from './guide.service';

const emptyPost = {
    title: '404 - Blog Post Not Found',
    content: [
        {
            type: 'text',
            value: 'The blog post you were looking for was not found',
        },
    ],
} as BlogPost;

@Injectable({
    providedIn: 'root',
})
export class BlogService extends FirestoreService<BlogPost> {

    constructor(private guideService: GuideService, private storageService: MediaStorageService) {
        super('guides', 'blog');
    }

    getBlogPosts(tag$: Observable<string | null>): Observable<BlogPostView[]> {
        const defaults: QueryConstraint[] = [
            orderBy('publish_date', 'desc'), 
            where('status', '==', 'published')
        ];
        return tag$.pipe(
            switchMap((tag) => {
                const constraints = tag 
                    // array-contains does not support InvariantCase comparison!
                    ? [...defaults, where('tags', 'array-contains', tag)] 
                    : [...defaults];
                
                return this.getDocuments(this.guideService.currentId, ...constraints);
            }),
            map((arr) => arr.sort((a) => (a.sticky ? -1 : 1))),
            switchMap(async (posts) => this.resolveUrl(posts))
        );
    }

    getBlogPost(id: string): Observable<BlogPost> {
        return this.getDocument(this.guideService.currentId, id).pipe(
            map(p => p ?? emptyPost)
        );
    }

    private async resolveUrl(posts: BlogPost[]): Promise<BlogPostView[]> {
        return Promise.all(
            posts.map(async (post) => {
                const path = post.images[0]?.value;
                const [url, error] = await this.storageService.downloadUrl(path);
                return {
                    ...post,
                    imageSrc: url ?? path,
                    alt: error ?? post.title,
                };
            })
        );
    }
}
