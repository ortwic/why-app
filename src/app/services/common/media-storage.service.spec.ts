import { TestBed } from '@angular/core/testing';

import { MediaStorageService } from './media-storage.service';

xdescribe('MediaStorageService', () => {
  let service: MediaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
