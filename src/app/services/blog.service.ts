import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends FirestoreService {
  constructor() {
    super('blog');
  }
}
