import { CommonModule } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ExpandComponent } from '../../components/ui/expand/expand.component';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { ContinueEventArgs, InputStepperComponent } from '../../components/input-stepper/input-stepper.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { currentGuideId } from '../../services/common/common.service';
import { PageFacadeService } from '../../services/pages/page-facade.service';
import { pageReadTime } from '../../services/user/user-data.service';
import { PageView } from '../../models/page.model';
import { InputValue } from '../../models/content.model';
import { UserDataItems } from '../../models/user-data.model';
import { expandTrigger } from '../../animations.helper';

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
        ExpandComponent,
        HeroSectionComponent,
        IFrameComponent,
        ImageSliderComponent,
        InputSectionComponent,
        InputStepperComponent,
        MarkdownComponent
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss',
    animations: [ expandTrigger('next') ],
})
export class PageComponent {
    private _router = inject(Router);
    private _route = inject(ActivatedRoute);
    private _startTime!: number;
    private _minReadTime!: number;

    private _returnPath = '/';
    private _step = 0;
    continue!: (args: ContinueEventArgs) => void;

    private readonly _pageFacade = inject(PageFacadeService);
    readonly currentPageView$ = combineLatest([
        toObservable(currentGuideId),
        this._route.params.pipe(
            map(params => ([params['unit'],  +(params['page'] ?? 0)] as [string, number]))
        )
    ]).pipe(
        switchMap(async ([guideId, [unitIndex, pageIndex]]) => (isNaN(+unitIndex) 
            ? await this._pageFacade.getSinglePageView(unitIndex) 
            : await this._pageFacade.getUnitPageView(+unitIndex, pageIndex, guideId)
        )),
        tap(page => this.continue = this.initBreakpoints(page)),
        tap(page => document.title = page.title + " | Why App"),
        tap(page => {
            this._startTime = Date.now();
            this._minReadTime = !isDevMode() ? page.min_read_time : .1;
        })
    );

    private initBreakpoints(page: PageView) {
        const nextStep = () => this._step = breakpoints.shift() ?? page.content.length;
        const breakpoints = page.content.reduce((acc, def, index) => {
            // consider input-stepper as a breakpoint only
            if (def.type === 'stepper') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        nextStep();
        return (args: ContinueEventArgs) => {
            this._pageFacade.saveUserInput(page, args.data);
            if (args.completed) {
                nextStep();
            }
        };
    }

    async ngOnInit() {
        this._route.queryParamMap.subscribe(params => {
            const from = params.get('from');
            if (from) {
                this._returnPath = from;
            } 
        });
    }
    
    show(index: number): 'expanded' | 'collapsed' {
        return index <= this._step ? 'expanded' : 'collapsed';
    }

    complete(data: UserDataItems<InputValue>) {
        this.next(data);
        this._router.navigate([this._returnPath]);
    }

    next(data: UserDataItems<InputValue>) {
        const elapsedTime = Date.now() - this._startTime;        
        if (elapsedTime > this._minReadTime * 60 * 1000) {
            this.continue({ 
                completed: true, 
                data: {
                    ...data,
                    [pageReadTime]: elapsedTime / 1000
                } 
            });
        }
    }

    nextDisabled(sectionCount: number): boolean {
        return this._step !== sectionCount;
    }
}
