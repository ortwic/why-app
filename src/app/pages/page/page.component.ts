import { CommonModule } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, from, of, switchMap, tap } from 'rxjs';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { ContinueEventArgs, InputStepperComponent } from '../../components/input-stepper/input-stepper.component';
import { GuideService } from '../../services/guide.service';
import { UserDataService, pageReadTime } from '../../services/user-data.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { PageContent } from '../../models/page.model';
import { expandTrigger } from '../../animations.helper';
import { InputValue } from '../../models/content.model';

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        LoadingComponent,
        HeroSectionComponent,
        ImageSliderComponent,
        InputSectionComponent,
        InputStepperComponent,
        MarkedPipe,
        SafeUrlPipe,
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
    animations: [ expandTrigger('next') ],
})
export class PageComponent {
    private _route = inject(ActivatedRoute);
    readonly unitIndex = +this._route.snapshot.params['unit'];
    private _startTime!: number;
    private _minReadTime!: number;

    private _step = 0;
    continue!: (args: ContinueEventArgs) => void;

    private readonly _userDataService = inject(UserDataService);
    private readonly _userData = this._userDataService.getEntry(this.unitIndex);

    private readonly _guideService = inject(GuideService);
    readonly currentPage$ = combineLatest([
        from(this._guideService.getPages(this.unitIndex)), 
        this._route.params
    ]).pipe(
        switchMap(([pages, params]) => {
            const pageIndex = +params['page'];
            const page = pages[pageIndex];
            const data = this._userData[page.slug] ?? {};
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = pageIndex + 1 < pages.length ? pageIndex + 1 : undefined;
            return of({
                ...page,
                data,
                prevIndex: prev,
                nextIndex: next,
                nextDisabled: () => this._step !== page.content.length
            });
        }),
        tap(page => this.continue = this.initBreakpoints(page.content, page.slug)),
        tap(page => document.title = page.title + " | Why App"),
        tap(page => {
            this._startTime = Date.now();
            this._minReadTime = !isDevMode() ? page.min_read_time : .1;
        })
    );

    private initBreakpoints(content: PageContent[], pageId: string) {
        const next = () => this._step = breakpoints.shift() ?? content.length;
        const breakpoints = content.reduce((acc, item, index) => {
            if (item.type === 'stepper') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        next();
        return (args: ContinueEventArgs) => {
            this._userDataService.save(this.unitIndex, {
                [pageId]: args.data 
            });
            if (args.completed) {
                next();
            }
        };
    }
    
    show(index: number): 'expanded' | 'collapsed' {
        return index <= this._step ? 'expanded' : 'collapsed';
    }

    complete(data: Record<string, InputValue>) {
        const elapsedTime = Date.now() - this._startTime;        
        if (elapsedTime > this._minReadTime * 60 * 1000) {
            this.continue({ 
                completed: true, 
                data: {
                    ...data,
                    [pageReadTime]: elapsedTime
                } 
            });
        }
    }
}
