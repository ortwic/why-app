import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styles: ``
})
export class BlogPostComponent {
  route = inject(ActivatedRoute);
  id = this.route.snapshot.params['id'];
  
  blogService = inject(BlogService);
  document = this.loadDocument();

  constructor() {
  }

  private loadDocument(): Promise<BlogPost | undefined> {
    return this.blogService.getDocument(this.id);
  }
}
