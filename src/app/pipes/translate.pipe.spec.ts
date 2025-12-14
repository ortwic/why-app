import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { CommonService } from '../services/common/common.service';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: CommonService;

  beforeEach(() => {
      TestBed.configureTestingModule({
      providers: [
          TranslatePipe,
          { 
              provide: CommonService, 
              useValue: {
                  getResource: (path: string) => path
              } 
          }
      ]
      });
      service = TestBed.inject(CommonService);
      pipe = TestBed.inject(TranslatePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
