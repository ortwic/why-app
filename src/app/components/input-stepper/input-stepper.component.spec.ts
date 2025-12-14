import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStepperComponent } from './input-stepper.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputStepperComponent', () => {
  let component: InputStepperComponent;
  let fixture: ComponentFixture<InputStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputStepperComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputStepperComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pageId', '0-test');
    fixture.componentRef.setInput('definitions', [
      {
        type: 'textarea',
        value: {
          id: 'name',
          caption: 'Name',
          placeholder: 'Your name',
          validation: ''
        }
      },
      {
        type: 'select',
        value: {
          id: 'country',
          caption: 'Country',
          options: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica'],
          multiple: false,
          multiline: true
        }
      }
    ]);
    fixture.componentRef.setInput('data', {});
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
