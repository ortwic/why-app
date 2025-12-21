import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { firebaseProviders } from '../../../tests/test.config';
import { ActivatedRoute } from '@angular/router';
import { StartComponent } from './start.component';
import { GuideService } from '../../services/content/guide.service';
import { GUIDE1_ID } from '../../../tests/seed-data';

describe('StartComponent', () => {
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [...firebaseProviders(), StartComponent],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: GUIDE1_ID,
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
