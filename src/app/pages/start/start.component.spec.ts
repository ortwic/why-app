import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
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
