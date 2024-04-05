import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { Guide } from '../../models/guide.model';
import { CommonService } from '../../services/common.service';
import { GuideService } from '../../services/guide.service';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryComponent],
      providers: [
        {
          provide: CommonService,
          useValue: { 
            getResources: () => Promise.resolve({}) 
          }
        },
        {
          provide: GuideService,
          useValue: { 
            dataPromise: Promise.resolve([] as Guide[]) 
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
