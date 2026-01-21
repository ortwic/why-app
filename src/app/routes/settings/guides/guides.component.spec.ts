import { ComponentFixture, TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../../tests/test.config';
import { GuidesComponent } from './guides.component';

describe('GuidesComponent', () => {
  let component: GuidesComponent;
  let fixture: ComponentFixture<GuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...firebaseProviders(), GuidesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
