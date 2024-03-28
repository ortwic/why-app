import { TestBed } from '@angular/core/testing';

import { UserProgressService } from './user-progress.service';

xdescribe('UserProgressService', () => {
  let service: UserProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
