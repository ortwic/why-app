import { TestBed } from '@angular/core/testing';

import { UserResultService } from './user-result.service';

xdescribe('UserResultService', () => {
  let service: UserResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
