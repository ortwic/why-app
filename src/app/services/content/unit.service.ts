import { Injectable } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { FirestoreService } from '../../core/firestore.service';
import { UnitView } from '../../models/unit.model';
import { GuideService } from './guide.service';
import { UnitPageService } from './unit-page.service';

@Injectable({
    providedIn: 'root',
})
export class UnitService extends FirestoreService<UnitView> {

    constructor(private guideService: GuideService, private pageService: UnitPageService) {
        super('guides', 'units');
    }

    getUnits(): Observable<UnitView[]> {
        return this.getDocuments(
            this.guideService.currentId, 
            orderBy('order')
        ).pipe(
            switchMap(units =>
                combineLatest(
                    units.map(unit =>
                        this.pageService.getPages(unit.id).pipe(
                            map(pages => ({ ...unit, pages }))
                        )
                    )
                )
            ),
            // For some reason orderBy('order') doesn't work reliably so sort again
            map(units => units.sort((a, b) => a.order - b.order))
        );
    }
}
