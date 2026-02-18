import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ExpandComponent } from "../../components/ui/expand/expand.component";
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { initialPage, nameProp } from '../../guards/terms-of-use.guard';
import { Page, StartContent } from '../../models/page.model';
import { UnitView } from '../../models/unit.model';
import { CommonService } from '../../services/common/common.service';
import { GuideService } from '../../services/content/guide.service';
import { UnitService } from '../../services/content/unit.service';
import { UserDataService } from '../../services/user/user-data.service';
import { UserResultService } from '../../services/user/user-result.service';
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ExpandComponent,
    MarkdownComponent,
    LoadingComponent,
    ProgressSpinnerComponent,
    TranslatePipe
],
    templateUrl: './start.component.html',
    styleUrl: './start.component.scss',
})
export class StartComponent {
    private readonly _commonService = inject(CommonService);
    private readonly _guideService = inject(GuideService);
    private readonly _unitService = inject(UnitService);
    private readonly _resultService = inject(UserResultService);
    private readonly _dataService = inject(UserDataService);
    private readonly _unitViews = toSignal(this._unitService.getUnits().pipe(
        map(units => units.map((unit) => ({ 
            ...unit, 
            results: this._resultService.calcUnitResult(unit)
        } as UnitView))),
        tap(() => this.loading = false)
    ), { initialValue: [] });

    readonly randomName: Signal<string> = signal('');
    loading = true;

    constructor() {
        this.randomName = computed(() => {
            const defaultNames = this._commonService.getResource('start', 'user-names').split(',');
            return defaultNames ? defaultNames[Math.floor(Math.random() * defaultNames.length)] : '';
        });
    }

    get units(): Signal<UnitView[]> {
        return this._unitViews; //.sort((a, b) => a.order - b.order);
    }

    get greeting(): string {
        return this._commonService.getResourceByCurrentHour('start', 'greeting');
    }

    get userName(): string | undefined {
        const entry = this._dataService.getItems(initialPage);
        if (nameProp in entry && entry[nameProp]) {
            return entry[nameProp];
        }
        return undefined;
    }

    get content(): StartContent[] {
        return this._guideService.current()?.content ?? [];
    }

    unitProgressPercent(view: UnitView) {
        return view.results ? view.results.progress.percent || 0 : 0;
    }

    pageProgressPercent(view: UnitView, page: Page) {
        return view.results ? view.results[page.id]?.progress.percent || 0 : 0;
    }
}
