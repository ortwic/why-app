import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';
import { StorageService } from '../../services/storage.service';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageSliderComponent],
      providers: [
        {
          provide: StorageService,
          useValue: { 
            downloadUrl: () => Promise.resolve('') 
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
