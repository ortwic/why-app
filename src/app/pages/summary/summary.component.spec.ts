import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { Unit } from '../../models/unit.model';
import { CommonService } from '../../services/common/common.service';
import { UnitService } from '../../services/pages/unit.service';

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
          provide: UnitService,
          useValue: { 
            dataPromise: Promise.resolve([] as Unit[]) 
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
