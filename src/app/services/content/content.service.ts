import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GuideService } from './guide.service';
import { PageService } from './page.service';
import { UserDataService } from '../user/user-data.service';
import { UnitPageService } from './unit-page.service';
import { Page, PageView, UnitPageView } from '../../models/page.model';
import { InputValue } from '../../models/content.model';
import { UserDataItems } from '../../models/user-data.model';

export const pageReadTime = '__page-read-in';

@Injectable({
    providedIn: 'root',
})
export class ContentService {
    private readonly _storageKey: string;
    readonly isUnitPageView = (page: PageView): page is UnitPageView => 'unitId' in page;

    constructor(
        private guideService: GuideService,
        private unitPageService: UnitPageService,
        private pageService: PageService,
        private userDataService: UserDataService<InputValue>
    ) {
        this._storageKey = this.guideService.currentId;
    }

    getPageView(unitId: string, pageIndex: number): Observable<PageView> {
        return isNaN(pageIndex)
            ? this.getSinglePageView(unitId)
            : this.getUnitPageView(unitId, pageIndex);
    }

    private getSinglePageView(pageId: string): Observable<PageView> {
        const userData = this.userDataService.getItems(pageId);
        return this.pageService.getPage(pageId).pipe(
            map((page) => ({
                ...page,
                sectionCount: page.content.length,
                userData
            }))
        );
    }

    private getUnitPageView(unitId: string, pageIndex: number): Observable<UnitPageView> {
        const asView = (page: Page, totalCount: number): UnitPageView => {
            const userData = this._storageKey ? this.userDataService.getItems(page.id, unitId, this._storageKey) : {};
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = pageIndex + 1 < totalCount ? pageIndex + 1 : undefined;
            return {
                ...page,
                sectionCount: page.content.length,
                userData,
                unitId,
                prevIndex: prev,
                nextIndex: next,
            };
        }

        return this.unitPageService.getPageByIndex(unitId, pageIndex).pipe(
            map(([page, count]) => asView(page, count))
        );
    }

    async saveUserInput(page: PageView, newData: UserDataItems<InputValue>) {
        if (this.isUnitPageView(page)) {
            this.userDataService.saveItems([page.id, page.unitId], newData, this._storageKey);
        } else {
            this.userDataService.saveItems([page.id, 0], newData);
        }
    }
}
