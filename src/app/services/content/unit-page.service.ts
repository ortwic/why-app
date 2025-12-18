import { Injectable } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import { FirestoreService } from '../firestore.service';
import { GuideService } from './guide.service';

@Injectable({
    providedIn: 'root',
})
export class UnitPageService extends FirestoreService<Page> {
    constructor(private guideService: GuideService) {
        super('guides', 'units', 'pages');
    }

    getPages(unitId: string): Observable<Page[]> {
        return this.getDocuments(this.guideService.currentId, unitId, orderBy('order'));
    }
}
