import { Injectable } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { Observable, map, of } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { BlogPost } from '../../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends FirestoreService {
  readonly data$: Observable<BlogPost[]> = of([]);

  private readonly constraints = [
    orderBy('publish_date', 'desc'), 
    where('status', '==', 'published')
  ];

  constructor() {
    super('blog');
    this.data$ = super.getDocumentStream<BlogPost>(...this.constraints)
      .pipe(map(arr => arr.sort((a) => a.sticky ? -1 : 1)));
  }
}
