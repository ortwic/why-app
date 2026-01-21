import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FirestoreService } from '../../core/firestore.service';
import { Page } from '../../models/page.model';
import { GuideService } from './guide.service';

export const emptyPage = { 
    title: '404 - Page Not Found',
    hero_section: {},
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

    getPage(pageId: string): Observable<Page> {
        return this.getDocument(this.guideService.currentId, pageId).pipe(
            map((page) => page ?? emptyPage)
        );
    }
}
