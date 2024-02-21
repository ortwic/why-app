import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { orderBy, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styles: `
    div.post {
      border-color: silver;
      border-style: solid;
      border-width: 1px 0 1px 0;
      color: var(--primtext);
      padding: .4rem;
  
      .thumbnail {
          float: left;
          margin-right: .4rem;
      }
  
      a.label {
          display: inline-block;
          margin: .6rem .3rem;
          padding: .2rem .6rem;
          font-weight: normal;
          transition: all .2s ease-in-out;
      }
  
      @media screen and (orientation: portrait) {
          padding-right: 1rem;
      }
    }
    
    img.thumbnail {
        width: 200px;
        object-fit: scale-down;
    }
  `
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
