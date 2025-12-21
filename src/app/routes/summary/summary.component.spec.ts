import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { firebaseProviders } from '../../../tests/test.config';
import { GUIDE1_ID } from '../../../tests/seed-data';
import { GuideService } from '../../services/content/guide.service';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
    let component: SummaryComponent;
    let fixture: ComponentFixture<SummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [...firebaseProviders(), SummaryComponent],
            providers: [
                {
                    provide: GuideService,
                    useValue: {
                        current: signal({}),
                        currentId: GUIDE1_ID,
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
