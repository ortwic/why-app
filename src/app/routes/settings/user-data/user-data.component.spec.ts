import { ComponentFixture, TestBed } from '@angular/core/testing';

import { firebaseProviders } from '../../../../tests/test.config';
import { UserDataComponent } from './user-data.component';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...firebaseProviders(), UserDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
