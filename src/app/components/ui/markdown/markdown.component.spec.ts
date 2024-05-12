import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaStorageService } from '../../../services/common/media-storage.service';

import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
    let component: MarkdownComponent;
    let fixture: ComponentFixture<MarkdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MarkdownComponent],
            providers: [
                {
                    provide: MediaStorageService,
                    useValue: {
                        downloadUrl: () => Promise.resolve(''),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MarkdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
