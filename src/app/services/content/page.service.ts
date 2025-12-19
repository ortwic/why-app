import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Page } from '../../models/page.model';
import { GuideService } from './guide.service';

const emptyPage = { 
    title: '404 - Page Not Found',
    content: [
        {
            type: 'text',
            value: 'The page you were looking for was not found',
        },
    ],
} as Page;

@Injectable({
    providedIn: 'root',
})
export class PageService extends FirestoreService<Page> {
    constructor(private guideService: GuideService) {
        super('guides', 'pages');
    }

    getSinglePageOrDefault(pageId: string): Observable<Page> {
        return this.getDocument(this.guideService.currentId, pageId).pipe(
            map((page) => page ?? emptyPage)
        );
    }
}
