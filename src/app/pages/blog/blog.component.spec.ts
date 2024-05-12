import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogComponent } from './blog.component';
import { BlogService } from '../../services/blog/blog.service';
import { MediaStorageService } from '../../services/common/media-storage.service';

const params = {
  tag: 'foo'
};

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            params: of(params),
            snapshot: { params }
          } 
        },
        {
          provide: BlogService,
          useValue: { 
            data$: of([])
          }
        },
        {
          provide: MediaStorageService,
          useValue: { 
            downloadUrl: () => Promise.resolve('') 
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
