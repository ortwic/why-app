import { TestBed } from '@angular/core/testing';

import { ConjunctionService } from './conjunction.service';
import { PageService } from './page.service';
import { UnitService } from './unit.service';
import { UserDataService } from '../user/user-data.service';

describe('ConjunctionService', () => {
    let service: ConjunctionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: UnitService,
                    useValue: {
                        getPages: () => Promise.resolve([]),
                    },
                },
                {
                    provide: PageService,
                    useValue: {
                        getSinglePageOrDefault: () => Promise.resolve({}),
                    },
                },
                {
                    provide: UserDataService,
                    useValue: {
                        getEntry: () => ({}),
                    },
                },
            ],
        });
        service = TestBed.inject(ConjunctionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
