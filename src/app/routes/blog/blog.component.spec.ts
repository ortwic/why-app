import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { firebaseProviders } from '../../../tests/test.config';
import { BlogComponent } from './blog.component';
import { MediaStorageService } from '../../services/common/media-storage.service';
import { GuideService } from '../../services/content/guide.service';

const params = {
    tag: 'foo',
};

describe('BlogComponent', () => {
    let component: BlogComponent;
    let fixture: ComponentFixture<BlogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [...firebaseProviders(), BlogComponent],
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
                        fragment: of(),
                        snapshot: { params },
                    },
                },
                {
                    provide: MediaStorageService,
                    useValue: {
                        downloadUrl: () => Promise.resolve(['']),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BlogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
