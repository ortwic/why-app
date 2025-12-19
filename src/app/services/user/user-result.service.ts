import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GuideService } from '../content/guide.service';
import { UnitService } from '../content/unit.service';
import { FormContent } from '../../models/content.model';
import { UnitResults } from '../../models/result.model';
import { UnitView } from '../../models/unit.model';
import { Page } from '../../models/page.model';
import { UserDataService } from './user-data.service';
import { UserDataRecord } from '../../models/user-data.model';

@Injectable({
    providedIn: 'root',
})
export class UserResultService {
    private readonly _userDataService = inject(UserDataService);
    private readonly _storageKey: string;

    readonly results = toSignal(this.unitService.getUnits().pipe(
        map(units => units.map((unit, index) => this.calcUnitResult(unit, index)))
    ), { initialValue: [] });

    constructor(guideService: GuideService, private unitService: UnitService) {
        this._storageKey = guideService.currentId;
    }
    
    calcUnitResult(unit: UnitView, index: number): UnitResults {
        const userData = this._userDataService.getRecord(index, this._storageKey);
        const unitResults = unit.pages().reduce((acc, cur) => this.calcPageResult(acc, cur, userData), {} as UnitResults);
        const count = Object.keys(unitResults).reduce((acc, id) => acc + unitResults[id].progress.count, 0);
        const total = Object.keys(unitResults).reduce((acc, id) => acc + unitResults[id].progress.total, 0);
        const percent = Math.round(count / total * 100);
        return { 
            ...unitResults,
            progress: {
                count, 
                total, 
                percent
            }
        } as UnitResults;
    }

    private calcPageResult<T>(results: UnitResults, page: Page, userData: UserDataRecord<T>) {
        const count = userData[page.id] ? Object.keys(userData[page.id]).length : 0;
        const total = page.content
            .filter(content => content.type === 'stepper')
            .reduce((acc, content) => acc + (content as FormContent).value.length, 1);
        const percent = Math.round(count / total * 100);
        return {
            ...results,
            [page.id]: {
                data: userData[page.id],
                progress: {
                    count, 
                    total, 
                    percent 
                }
            }
        };
    }
}
