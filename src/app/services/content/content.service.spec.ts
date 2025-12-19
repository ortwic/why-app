import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { ContentService } from './content.service';

describe('ContentService', () => {
    let service: ContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [...firebaseProviders()]
        });
        service = TestBed.inject(ContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
