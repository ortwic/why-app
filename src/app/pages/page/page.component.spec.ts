import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PageComponent } from './page.component';
import { GuideService } from '../../services/guide.service';

const params = {
  unit: 0,
  page: 'a'
};

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            params: of(params),
            snapshot: { params }
          } 
        },
        {
          provide: GuideService,
          useValue: { 
            getPages: () => Promise.resolve([]) 
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
