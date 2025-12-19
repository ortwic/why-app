import { Injectable, OnDestroy, signal } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { map, Observable, Subscription } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { Unit, UnitView } from '../../models/unit.model';
import { Page } from '../../models/page.model';
import { GuideService } from './guide.service';
import { UnitPageService } from './unit-page.service';

@Injectable({
    providedIn: 'root',
})
export class UnitService extends FirestoreService<Unit> implements OnDestroy {
    private readonly _subscriptions: Subscription[] = [];

    constructor(private guideService: GuideService, private pageService: UnitPageService) {
        super('guides', 'units');
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(s => s.unsubscribe());
    }

    getUnits(): Observable<UnitView[]> {
        return this.getDocuments(this.guideService.currentId, orderBy('order')).pipe(
            map((units) => units.map((unit) => (this.appendPages(unit))))
        );
    }

    private appendPages(unit: Unit): UnitView {
        const pages = signal<Page[]>([]);
        this._subscriptions.push(
            this.pageService.getPages(unit.id).subscribe(p => pages.set(p))
        );
        return { ...unit, pages };
    }
}
