import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, from, of, switchMap, tap } from 'rxjs';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { GuideService } from '../../services/guide.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { PageContent } from '../../models/page.model';
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

    private step = 0;
    done = false;
    next!: () => void;

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
        tap(page => {
            this.initBreakpoints(page.content);
            document.title = page.title + " | Why App";
        })
    );

    private initBreakpoints(content: PageContent[]) {
        const breakpoints = content.reduce((acc, item, index) => {
            if (item.type === 'stepper') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);
        this.next = () => {
            this.step = breakpoints.shift() ?? content.length;
            this.done = this.step === content.length;
        }
        this.next();
    }
    
    show(index: number): 'expanded' | 'collapsed' {
        return index <= this.step ? 'expanded' : 'collapsed';
    }

    get disabled() {
        return !this.done;
    }
}
