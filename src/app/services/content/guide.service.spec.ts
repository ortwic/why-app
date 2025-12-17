import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { GuideService } from './guide.service';

describe('GuideService', () => {
  let service: GuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...firebaseProviders()]
    });
    service = TestBed.inject(GuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
