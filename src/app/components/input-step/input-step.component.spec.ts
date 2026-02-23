import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InputStepComponent } from './input-step.component';

describe('InputStepComponent', () => {
  let component: InputStepComponent;
  let fixture: ComponentFixture<InputStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStepComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputStepComponent);
    fixture.componentRef.setInput('item', {
      type: 'textarea',
      value: {}
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
