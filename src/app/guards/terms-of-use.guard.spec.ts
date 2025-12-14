import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { termsOfUseGuard } from './terms-of-use.guard';

describe('termsOfUseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => termsOfUseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
