import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { UnitPageService } from './unit-page.service';

describe('UnitPageService', () => {
  let service: UnitPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...firebaseProviders()]
    });
    service = TestBed.inject(UnitPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
