import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { firebaseProviders } from '../../../tests/test.config';
import { NavComponent } from './nav.component';
import { NavigationService } from '../../services/common/navigation.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [...firebaseProviders(), NoopAnimationsModule],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {} 
        },
        {
          provide: NavigationService,
          useValue: { 
            getNavigation: () => of([
              { path: '/', title: 'Start', icon: 'home' },
              { path: '/blog', title: 'Blog', icon: 'feed' },
              { path: '/imprint', title: 'Impressum', icon: 'info' },
              { path: '/privacy', title: 'Datenschutz', icon: 'security' },
              { path: '/settings', title: 'Einstellungen', icon: 'settings' }          
            ])
          }
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
