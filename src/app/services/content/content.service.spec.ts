import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { ContentService } from './content.service';
import { GuideService } from './guide.service';
import { signal } from '@angular/core';

describe('ContentService', () => {
    let service: ContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...firebaseProviders()],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: '',
                    }
                },
            ]
        });
        service = TestBed.inject(ContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
