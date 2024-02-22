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
  blogService = inject(BlogService);
  
  document = this.loadDocument();

  private loadDocument(): Promise<BlogPost | undefined> {
    const id = this.route.snapshot.params['id'];
    return this.blogService.getDocument(id);
  }
}
