import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IFrameComponent } from './iframe.component';

describe('IframeComponent', () => {
  let component: IFrameComponent;
  let fixture: ComponentFixture<IFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IFrameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IFrameComponent);
    fixture.componentRef.setInput('value', { type: 'youtube', src: 'test', title: '' });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
