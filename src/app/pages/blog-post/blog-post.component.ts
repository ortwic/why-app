import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, MarkedPipe, SafeUrlPipe],
  templateUrl: './blog-post.component.html',
  styles: ``
})
export class BlogPostComponent {
  route = inject(ActivatedRoute);
  blogService = inject(BlogService);
  
  document = this.loadDocument();

  private loadDocument(): Promise<BlogPost | undefined> {
    const id = this.route.snapshot.params['id'];
    return this.blogService.getDocument<BlogPost>(id).then(post => {
      if (post) {
        document.title = post.title + " | Why App";
      }
      return post;
    });
  }
}
