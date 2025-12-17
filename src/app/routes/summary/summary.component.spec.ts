import { ComponentFixture, TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../tests/test.config';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...firebaseProviders(), SummaryComponent],
      providers: [
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
