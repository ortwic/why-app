import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, from, of, switchMap, tap } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { GuideService } from '../../services/guide.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { expandTrigger } from '../../animations.helper';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        LoadingComponent,
        HeroSectionComponent,
        ImageSliderComponent,
        InputSectionComponent,
        StepperComponent,
        MarkedPipe,
        SafeUrlPipe,
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
    animations: [ expandTrigger('next') ],
})
export class PageComponent {
    private route = inject(ActivatedRoute);
    readonly unitIndex = +this.route.snapshot.params['unit'];

    readonly guideService = inject(GuideService);
    readonly currentPage$ = combineLatest([from(this.guideService.getPages(this.unitIndex)), this.route.params]).pipe(
        switchMap(([pages, params]) => {
            const pageIndex = +params['page'];
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = pageIndex + 1 < pages.length ? pageIndex + 1 : undefined;
            return of({
                ...pages[pageIndex],
                prevIndex: prev,
                nextIndex: next,
            });
        }),
        tap((page) => document.title = page.title + " | Why App")
    );
}
