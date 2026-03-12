import { Injectable, isDevMode } from '@angular/core';
import { orderBy, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import { FirestoreService } from '../../core/firestore.service';
import { GuideService } from './guide.service';
import { emptyPage } from './page.service';

@Injectable({
    providedIn: 'root',
})
export class UnitPageService extends FirestoreService<Page> {
    constructor(private guideService: GuideService) {
        super('guides', 'units', 'pages');
    }

    getPages(unitId: string): Observable<Page[]> {
        const filter = isDevMode() ? where('status', '!=', 'draft') : where('status', '==', 'published');
        return this.getDocuments(
            this.guideService.currentId, 
            unitId, 
            filter, 
            orderBy('order')
        );
    }

    getPageByIndex(unitId: string, pageIndex: number): Observable<[Page, number]> {
        return this.getPages(unitId).pipe(
            map((pages) => [pages[pageIndex] ?? emptyPage, pages.length])
        );
    }
}
