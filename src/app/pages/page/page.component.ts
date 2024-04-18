import { CommonModule } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, switchMap, tap } from 'rxjs';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ExpandComponent } from '../../components/ui/expand/expand.component';
import { IFrameComponent } from '../../components/ui/iframe/iframe.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ImageSliderComponent } from '../../components/image-slider/image-slider.component';
import { InputSectionComponent } from '../../components/input-section/input-section.component';
import { ContinueEventArgs, InputStepperComponent } from '../../components/input-stepper/input-stepper.component';
import { currentGuideId } from '../../services/common.service';
import { UnitService } from '../../services/unit.service';
import { PageService } from '../../services/page.service';
import { UserDataService, pageReadTime } from '../../services/user-data.service';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { Page } from '../../models/page.model';
import { InputValue } from '../../models/content.model';
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
        MarkedPipe
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

    private readonly _userDataService = inject(UserDataService);
    private readonly _unitService = inject(UnitService);
    private readonly _pageService = inject(PageService);
    readonly currentPage$ = this._route.params.pipe(
        map(params => ([params['unit'],  +(params['page'] ?? 0)] as [string, number])),
        switchMap(async ([unitIndex, pageIndex]) => {
            const [page, hasNext, storageKey] = await this.getPages(unitIndex, pageIndex);
            const unitData = this._userDataService.getEntry(unitIndex, storageKey);
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = hasNext ? pageIndex + 1 : undefined;
            return {
                ...page,
                data: unitData[page.id] ?? {},
                storageKey,
                unitIndex,
                prevIndex: prev,
                nextIndex: next,
                nextDisabled: () => this._step !== page.content.length
            };
        }),
        tap(page => this.continue = this.initBreakpoints(page, page.unitIndex, page.storageKey)),
        tap(page => document.title = page.title + " | Why App"),
        tap(page => {
            this._startTime = Date.now();
            this._minReadTime = !isDevMode() ? page.min_read_time : .1;
        })
    );

    private async getPages(unitIndex: string, pageIndex: number): Promise<[Page, boolean?, string?]> {
        if (isNaN(+unitIndex)) {
            const page = await this._pageService.getDocument<Page>(unitIndex);
            return [page ?? {} as Page];
        }
        const pages = await this._unitService.getPages(+unitIndex);
        return [pages[pageIndex], pageIndex + 1 < pages.length, currentGuideId()];
    }

    private initBreakpoints<T extends Page>(page: T, unitIndex: string, storageKey?: string) {
        const nextStep = () => this._step = breakpoints.shift() ?? page.content.length;
        const breakpoints = page.content.reduce((acc, item, index) => {
            if (item.type === 'stepper') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        nextStep();
        return (args: ContinueEventArgs) => {
            const data = isNaN(+unitIndex) ? args.data : { [page.id]: args.data };
            this._userDataService.save(unitIndex, data, storageKey);
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

    next(data: Record<string, InputValue>) {
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

    complete(data: Record<string, InputValue>) {
        this.next(data);
        this._router.navigate([this._returnPath]);
    }
}
