import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { firebaseProviders } from '../../../tests/test.config';
import { PageComponent } from './page.component';
import { GuideService } from '../../services/content/guide.service';

const params = {
    unit: 0,
    page: 'test-page',
};

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [...firebaseProviders(), PageComponent],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: '',
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of(params),
                        queryParams: of(),
                        snapshot: { params },
                    },
                }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
