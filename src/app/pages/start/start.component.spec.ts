import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { StartComponent } from './start.component';
import { CommonService } from '../../services/common.service';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit.model';

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
          provide: UnitService,
          useValue: { 
            dataPromise: Promise.resolve([] as Unit[]) 
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
