import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { NavComponent } from './nav.component';
import { CommonService } from '../../services/common.service';
import { GuideService } from '../../services/guide.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {} 
        },
        {
          provide: CommonService,
          useValue: { 
            getNavigation: () => Promise.resolve([
              { path: '/', title: 'Start', icon: 'home' },
              { path: '/blog', title: 'Blog', icon: 'feed' },
              { path: '/imprint', title: 'Impressum', icon: 'info' },
              { path: '/privacy', title: 'Datenschutz', icon: 'security' },
              { path: '/settings', title: 'Einstellungen', icon: 'settings' }          
            ]),
            getResources: () => Promise.resolve({}) 
          }
        },
        { 
          provide: GuideService, 
          useValue: {} 
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
