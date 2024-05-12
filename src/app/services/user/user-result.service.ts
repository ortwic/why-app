import { Injectable, inject } from '@angular/core';
import { UnitService } from '../pages/unit.service';
import { FormContent } from '../../models/content.model';
import { Result } from '../../models/result.model';
import { UserDataService } from './user-data.service';

@Injectable({
    providedIn: 'root',
})
export class UserResultService {
    private readonly _userDataService = inject(UserDataService);
    private readonly _unitService = inject(UnitService);

    async resultTree(storageKey?: string): Promise<Result[]> {
        return this._unitService.dataPromise.then(data => {
            return Promise.all(data.map(async (unit, index) => {
                const userData = this._userDataService.getRecord(index, storageKey);
                return unit.pages.then(pages => {
                    let unitData: Record<string, Result> = {};
                    pages.forEach(page => {
                        const count = userData[page.id] ? Object.keys(userData[page.id]).length : 0;
                        const total = page.content
                          .filter(content => content.type === 'stepper')
                          .reduce((acc, content) => acc + (content as FormContent).value.length, 1);
                        const percent = Math.round(count / total * 100);
                        unitData = {
                            ...unitData,
                            [page.id]: {
                                data: userData[page.id],
                                progress: {
                                    count, 
                                    total, 
                                    percent 
                                }
                            }
                        }
                    });
                    const count = Object.keys(unitData).reduce((acc, id) => acc + unitData[id].progress.count, 0);
                    const total = Object.keys(unitData).reduce((acc, id) => acc + unitData[id].progress.total, 0);
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
