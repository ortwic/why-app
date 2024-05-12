import { TestBed } from '@angular/core/testing';

import { PageFacadeService } from './page-facade.service';
import { PageService } from './page.service';
import { UnitService } from './unit.service';
import { UserDataService } from '../user/user-data.service';

describe('PageFacadeService', () => {
    let service: PageFacadeService;

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
        service = TestBed.inject(PageFacadeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
