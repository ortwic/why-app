import { Injectable } from '@angular/core';
import { UnitService } from './unit.service';
import { PageService } from './page.service';
import { UserDataService } from '../user/user-data.service';
import { Page, UnitPageView } from '../../models/page.model';
import { InputValue } from '../../models/content.model';
import { UserDataItems } from '../../models/user-data.model';
import { map, Observable } from 'rxjs';

export const pageReadTime = '__page-read-in';

@Injectable({
    providedIn: 'root',
})
export class ContentService {
    constructor(
        private unitService: UnitService,
        private pageService: PageService,
        private userDataService: UserDataService<InputValue>
    ) {}

    getSinglePageView(pageId: string): Observable<UnitPageView> {
        const userData = this.userDataService.getItems(pageId);
        return this.pageService.getSinglePageOrDefault(pageId).pipe(
            map((page) => ({
                ...page,
                sectionCount: page.content.length,
                userData
            } as UnitPageView)) // TODO should be a PageView
        );
    }

    getUnitPageView(unitIndex: number, pageIndex: number, guideId?: string): Observable<UnitPageView> {
        const asView = (page: Page, totalCount: number): UnitPageView => {
            const userData = guideId ? this.userDataService.getItems(page.id, unitIndex, guideId) : {};
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = pageIndex + 1 < totalCount ? pageIndex + 1 : undefined;
            return {
                ...page,
                sectionCount: page.content.length,
                userData,
                guideId,
                unitIndex,
                prevIndex: prev,
                nextIndex: next,
            };
        }

        return this.unitService.pageViewByIndex(unitIndex, pageIndex).pipe(
            map(([page, count]) => asView(page, count))
        );
    }

    async saveUserInput(page: UnitPageView, newData: UserDataItems<InputValue>) {
        this.userDataService.saveItems([page.id, page.unitIndex], newData, page.guideId);
    }
}
