import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { UserResultService } from './user-result.service';

describe('UserResultService', () => {
  let service: UserResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...firebaseProviders()]
    });
    service = TestBed.inject(UserResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
