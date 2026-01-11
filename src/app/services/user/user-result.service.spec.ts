import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { firebaseProviders } from '../../../tests/test.config';
import { GUIDE1_ID, UNIT1_ID, unitView1 } from '../../../tests/seed-data';
import { GuideService } from '../content/guide.service';
import { UserResultService } from './user-result.service';
import { UserDataService } from './user-data.service';

const demoSample: Record<string, { [key: string]: any }> = {
    "0-demo": {
        "last-lunch": "nudeln",
        "pants-hole-count": "2/3",
        "worst-present": "flöten",
        "fav-animal": [
            "Eichhörnchen",
            "Qualle",
            "Seestern"
        ],
        "useless-fact": "Schweine sehen den Himmel nicht",
        "useful-4-zombies": "Wie Schaf"
    }
};

describe('UserResultService', () => {
    let service: UserResultService;
    let getRecordSpy: jasmine.Spy;

    beforeEach(() => {
        getRecordSpy = jasmine.createSpy('getRecord');

        TestBed.configureTestingModule({
            imports: [...firebaseProviders()],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: GUIDE1_ID,
                    }
                },
                {
                    provide: UserDataService,
                    useValue: {
                        getRecord: getRecordSpy
                    }
                }
            ],
        });
        service = TestBed.inject(UserResultService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate unit result from demo sample', () => {
        const count = Object.keys(demoSample['0-demo']).length;
        getRecordSpy.and.returnValue(demoSample);

        const unitResult = service.calcUnitResult(unitView1, 0);

        expect(unitResult['0-demo']).toBeDefined();
        expect(unitResult['0-demo']['last-lunch']).toBeDefined();
        expect(unitResult['0-demo']['pants-hole-count']).toBeDefined();
        expect(unitResult['0-demo']['fav-animal']).toBeDefined();
        expect(unitResult['0-demo']['worst-present']).toBeDefined();
        expect(unitResult['0-demo']['useless-fact']).toBeDefined();
        expect(unitResult['0-demo']['useful-4-zombies']).toBeDefined();
        expect(unitResult['0-demo'].progress.count).toBe(count);
        expect(unitResult['0-demo'].progress.percent).toBe(100);
        expect(unitResult.progress.count).toBe(count);
        expect(unitResult.progress.percent).toBe(100);
    });

    xit('should have results from demo sample', () => {
        const results = service.results();

        expect(results.length).toBe(1);
        expect(results[0].progress.percent).toBe(100);
    });
});
