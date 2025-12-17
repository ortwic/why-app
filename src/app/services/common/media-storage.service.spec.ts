import { TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { MediaStorageService } from './media-storage.service';

describe('MediaStorageService', () => {
  let service: MediaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...firebaseProviders()]
    });
    service = TestBed.inject(MediaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
