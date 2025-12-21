import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { firebaseProviders } from '../../../tests/test.config';
import { GUIDE1_ID } from '../../../tests/seed-data';
import { GuideService } from '../content/guide.service';
import { UserResultService } from './user-result.service';

describe('UserResultService', () => {
    let service: UserResultService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...firebaseProviders()],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: GUIDE1_ID,
                    },
                },
            ],
        });
        service = TestBed.inject(UserResultService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
