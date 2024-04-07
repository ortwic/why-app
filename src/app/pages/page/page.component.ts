import { CommonModule } from '@angular/common';
import { Component, inject, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { GuideService } from '../../services/guide.service';
import { PageService } from '../../services/page.service';
import { UserDataService, pageReadTime } from '../../services/user-data.service';
import { MarkedPipe } from '../../pipes/marked.pipe';
import { Page, PageContent } from '../../models/page.model';
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
    private _route = inject(ActivatedRoute);
    private _startTime!: number;
    private _minReadTime!: number;

    private _step = 0;
    showFooter!: boolean;
    continue!: (args: ContinueEventArgs) => void;

    private readonly _userDataService = inject(UserDataService);

    private readonly _guideService = inject(GuideService);
    private readonly _pageService = inject(PageService);
    readonly currentPage$ = this._route.params.pipe(
        map(params => ([params['unit'],  +(params['page'] ?? 0)] as [string, number])),
        tap(([unitIndex]) => this.showFooter = !isNaN(+unitIndex)),
        switchMap(async ([unitIndex, pageIndex]) => {
            const unitData = this._userDataService.getEntry(unitIndex);
            const pages = await this.getPages(unitIndex);
            const page = pages[pageIndex];
            const prev = pageIndex > 0 ? pageIndex - 1 : undefined;
            const next = pageIndex + 1 < pages.length ? pageIndex + 1 : undefined;
            return {
                ...page,
                data: unitData[page.id] ?? {},
                unitIndex,
                prevIndex: prev,
                nextIndex: next,
                nextDisabled: () => this._step !== page.content.length
            };
        }),
        tap(page => this.continue = this.initBreakpoints(page.content, page.unitIndex, page.id)),
        tap(page => document.title = page.title + " | Why App"),
        tap(page => {
            this._startTime = Date.now();
            this._minReadTime = !isDevMode() ? page.min_read_time : .1;
        })
    );

    private async getPages(unitIndex: string) {
        return isNaN(+unitIndex)
            ? this._pageService.getDocument<Page>(unitIndex).then(p => p ? [p] : [])
            : this._guideService.getPages(+unitIndex);
    }

    private initBreakpoints(content: PageContent[], unitIndex: string, pageId: string) {
        const next = () => this._step = breakpoints.shift() ?? content.length;
        const breakpoints = content.reduce((acc, item, index) => {
            if (item.type === 'stepper') {
                acc.push(index);
            }
            return acc;
        }, [] as number[]);

        next();
        return (args: ContinueEventArgs) => {
            this._userDataService.save(unitIndex, {
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
                    [pageReadTime]: elapsedTime / 1000
                } 
            });
        }
    }
}
