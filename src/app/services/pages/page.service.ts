import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Page, PageContent } from '../../models/page.model';

export const emptyPage = { content: [] as PageContent[] } as Page;

@Injectable({
  providedIn: 'root'
})
export class PageService extends FirestoreService {

  constructor() { 
    super('pages');
  }

  async getSinglePageOrDefault(pageId: string): Promise<Page> {
    const page = await this.getDocument<Page>(pageId);
    return page ?? emptyPage;
  }
}
