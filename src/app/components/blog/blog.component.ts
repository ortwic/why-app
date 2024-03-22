import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  route = inject(ActivatedRoute);
  readonly service = inject(BlogService);
  readonly blogPosts$ = this.service.data$;

  constructor() {
    const tag = this.route.snapshot.params['tag'];
    if (tag) {
      this.blogPosts$ = this.service.data$.pipe(
        map(posts => posts.filter(post => post.tags?.includes(tag)))
      );
    }
  }
}
