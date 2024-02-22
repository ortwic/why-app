import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
  blogService = inject(BlogService);

  blogPosts$ = this.loadBlogPosts();

  private loadBlogPosts(): Observable<BlogPost[]> {
    const constraints = [
      orderBy('publish_date', 'desc'), 
      where('status', '==', 'published')
    ];
    
    const tag = this.route.snapshot.params['tag'];
    if (tag) {
      constraints.push(where('tags', 'array-contains', tag));
    }

    return this.blogService.getDocuments(...constraints);
  }
}
