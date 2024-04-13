import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PageComponent } from './page.component';
import { UnitService } from '../../services/unit.service';
import { PageService } from '../../services/page.service';

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
          provide: UnitService,
          useValue: { 
            getPages: () => Promise.resolve([]) 
          }
        },
        {
          provide: PageService,
          useValue: { 
            getDocument: () => Promise.resolve({}) 
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
