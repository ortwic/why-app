import { TestBed } from '@angular/core/testing';

import { ContentService } from './content.service';
import { PageService } from './page.service';
import { UnitService } from './unit.service';
import { UserDataService } from '../user/user-data.service';

describe('ContentService', () => {
    let service: ContentService;

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
        service = TestBed.inject(ContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
