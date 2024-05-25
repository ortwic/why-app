import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InputSectionComponent } from './input-section.component';
import { InputDefinition } from '../../models/content.model';

describe('InputSectionComponent', () => {
  let component: InputSectionComponent;
  let fixture: ComponentFixture<InputSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSectionComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSectionComponent);
    component = fixture.componentInstance;    
    component.item = {
      type: 'textarea',
      value: {}
    } as InputDefinition;
    component.value = 'foo';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
