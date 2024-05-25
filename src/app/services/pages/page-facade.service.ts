import { Injectable } from '@angular/core';
import { UnitService } from './unit.service';
import { PageService } from './page.service';
import { UserDataService } from '../user/user-data.service';
import { PageView } from '../../models/page.model';
import { InputValue } from '../../models/content.model';
import { UserDataItems } from '../../models/user-data.model';

export const pageReadTime = '__page-read-in';

@Injectable({
    providedIn: 'root',
})
export class PageFacadeService {
    constructor(
        private unitService: UnitService,
        private pageService: PageService,
        private userDataService: UserDataService<InputValue>
    ) {}

    async getSinglePageView(pageId: string): Promise<PageView> {
        const page = await this.pageService.getSinglePageOrDefault(pageId);
        const userData = this.userDataService.getItems(pageId);
        return {
            ...page,
            sectionCount: page.content.length,
            userData
        }
    }

    async getUnitPageView(unitIndex: number, pageIndex: number, guideId?: string): Promise<PageView> {
        const pages = await this.unitService.getPages(unitIndex);
        const page = pages[pageIndex];
        const userData = guideId ? this.userDataService.getItems(page.id, unitIndex, guideId) : {};
        const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
        const next = pageIndex + 1 < pages.length ? pageIndex + 1 : undefined;
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

    async saveUserInput(page: PageView, newData: UserDataItems<InputValue>) {
        this.userDataService.saveItems([page.id, page.unitIndex], newData, page.guideId);
    }
}
