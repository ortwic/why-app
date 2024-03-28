import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogPostComponent } from './blog-post.component';
import { BlogService } from '../../services/blog.service';

const params = {
  id: '0'
};

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostComponent],
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
            getDocument() {
              return Promise.resolve({});
            }
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
