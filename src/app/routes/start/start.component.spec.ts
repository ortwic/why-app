import { ComponentFixture, TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { ActivatedRoute } from '@angular/router';
import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...firebaseProviders(), StartComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {} 
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
