import { Injectable, inject } from '@angular/core';
import { GuideService } from './guide.service';
import { FormContent } from '../models/content.model';
import { UserDataService } from './user-data.service';

export interface Progress {
    [key: string]: Progress | number;
    count: number;
    total: number;
    percent: number;
}

@Injectable({
    providedIn: 'root',
})
export class UserProgressService {
    private readonly userDataService = inject(UserDataService);
    private readonly guideService = inject(GuideService);

    get progressTree(): Promise<Progress[]> {
        return this.guideService.dataPromise.then(data => {
            return Promise.all(data.map(async (guide, index) => {
                const userData = this.userDataService.getEntry(index);
                return guide.pages.then(pages => {
                    let unitData: Record<string, Progress> = {};
                    pages.forEach(page => {
                        const count = userData[page.slug] ? Object.keys(userData[page.slug]).length : 0;
                        const total = page.content
                          .filter(content => content.type === 'stepper')
                          .reduce((acc, content) => acc + (content as FormContent).value.length, 1);
                        const percent = Math.round(count / total * 100);
                        unitData = {
                            ...unitData,
                            [page.slug]: { count, total, percent }
                        }
                    });
                    const count = Object.keys(unitData).reduce((acc, slug) => acc + unitData[slug].count, 0);
                    const total = Object.keys(unitData).reduce((acc, slug) => acc + unitData[slug].total, 0);
                    const percent = Math.round(count / total * 100);
                    return { ...unitData, count, total, percent };
                });
            }));
        });
    }
}
