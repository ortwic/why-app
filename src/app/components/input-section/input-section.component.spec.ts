import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSectionComponent } from './input-section.component';
import { FormContent } from '../../models/content.model';

describe('InputSectionComponent', () => {
  let component: InputSectionComponent;
  let fixture: ComponentFixture<InputSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.item = {
      type: 'textarea',
      value: {}
    } as FormContent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
