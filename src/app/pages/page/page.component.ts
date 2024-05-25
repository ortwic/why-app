import { CommonModule } from '@angular/common';
import { Component, computed, effect, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { derivedAsync } from 'ngxtension/derived-async';
import { injectParams } from 'ngxtension/inject-params';
import { injectQueryParams } from 'ngxtension/inject-query-params';
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
    private _params = injectParams((params) => ([params['unit'],  +(params['page'] ?? 0)] as [string, number]));
    private _returnPath = injectQueryParams('from', { initialValue: '/' });
    private _breakpoints = computed(() => this.initBreakpoints(this.pageView()));
    private _currentBreakpoint = 0;
    private _startTime!: number;
    private _minReadTime!: number;
    
    readonly pageView = derivedAsync(() => {
        const [unitIndex, pageIndex] = this._params();
        return isNaN(+unitIndex) 
            ? this._pageFacade.getSinglePageView(unitIndex) 
            : this._pageFacade.getUnitPageView(+unitIndex, pageIndex, currentGuideId())
    });

    constructor(private _router: Router, private _pageFacade: PageFacadeService) {
        effect(() => {
            const page = this.pageView();
            if (page) {
                document.title = `${page.title} | Why App`;

                this._startTime = Date.now();
                this._minReadTime = !isDevMode() ? page.min_read_time : .1;
                
                this.nextBreakpoint(page);
            }
        });
    } 

    private initBreakpoints(page?: PageView): number[] {
        if (page) {
            return page.content.reduce((acc, def, index) => {
                // consider input-stepper as a breakpoint only
                if (def.type === 'stepper') {
                    acc.push(index);
                }
                return acc;
            }, [] as number[]);
        }
        return [];
    }

    continue(args: ContinueEventArgs) {
        const page = this.pageView();
        if (page) {            
            this._pageFacade.saveUserInput(page, args.data);
            if (args.completed) {
                this.nextBreakpoint(page);
            }
        }
    }

    private nextBreakpoint(page: PageView) {
        this._currentBreakpoint = this._breakpoints()?.shift() ?? page.content.length;
    }
    
    show(index: number): 'expanded' | 'collapsed' {
        return index <= this._currentBreakpoint ? 'expanded' : 'collapsed';
    }

    complete(data: UserDataItems<InputValue>) {
        this.next(data);
        this._router.navigate([this._returnPath()]);
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
        return this._currentBreakpoint !== sectionCount;
    }
}
