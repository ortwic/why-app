import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { StartComponent } from './start.component';
import { CommonService } from '../../services/common.service';
import { GuideService } from '../../services/guide.service';
import { Guide } from '../../models/guide.model';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {} 
        },
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
    
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
