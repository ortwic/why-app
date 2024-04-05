import { Injectable, inject } from '@angular/core';
import { GuideService } from './guide.service';
import { FormContent } from '../models/content.model';
import { Result } from '../models/result.model';
import { UserDataService } from './user-data.service';

@Injectable({
    providedIn: 'root',
})
export class UserResultService {
    private readonly userDataService = inject(UserDataService);
    private readonly guideService = inject(GuideService);

    get resultTree(): Promise<Result[]> {
        return this.guideService.dataPromise.then(data => {
            return Promise.all(data.map(async (guide, index) => {
                const userData = this.userDataService.getEntry(index);
                return guide.pages.then(pages => {
                    let unitData: Record<string, Result> = {};
                    pages.forEach(page => {
                        const count = userData[page.slug] ? Object.keys(userData[page.slug]).length : 0;
                        const total = page.content
                          .filter(content => content.type === 'stepper')
                          .reduce((acc, content) => acc + (content as FormContent).value.length, 1);
                        const percent = Math.round(count / total * 100);
                        unitData = {
                            ...unitData,
                            [page.slug]: {
                                data: userData[page.slug],
                                progress: {
                                    count, 
                                    total, 
                                    percent 
                                }
                            }
                        }
                    });
                    const count = Object.keys(unitData).reduce((acc, slug) => acc + unitData[slug].progress.count, 0);
                    const total = Object.keys(unitData).reduce((acc, slug) => acc + unitData[slug].progress.total, 0);
                    const percent = Math.round(count / total * 100);
                    return { 
                        ...unitData,
                        progress: {
                            count, 
                            total, 
                            percent                             
                        }
                    };
                });
            }));
        });
    }
}
