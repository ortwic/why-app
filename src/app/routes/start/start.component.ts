import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { MarkdownComponent } from '../../components/ui/markdown/markdown.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { termsOfUseKey } from '../../guards/terms-of-use.guard';
import { Page } from '../../models/page.model';
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
    private readonly _unitViews = toSignal(this._unitService.viewData$.pipe(
        map(units => units.map((unit, index) => ({ 
            ...unit, 
            results: this._resultService.calcUnitResult(unit, index)
        } as UnitView))),
        tap(() => this.loading = false)
    ), { initialValue: [] });

    readonly randomName: Signal<string> = signal('');
    loading = true;

    constructor() {
        this.randomName = computed(() => {
            const defaultNames = this._commonService.getResource<string[]>('start', 'user-names');
            return defaultNames ? defaultNames[Math.floor(Math.random() * defaultNames.length)] : '';
        });
    }

    get units(): Signal<UnitView[]> {
        return this._unitViews; //.sort((a, b) => a.order - b.order);
    }

    get greeting(): string {
        const greetings = this._commonService.getResource<Record<number, string>>('start', 'greetings');
        if (typeof greetings === 'object') {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                return greetings[5];
            } else if (currentHour >= 12 && currentHour < 18) {
                return greetings[12];
            } else if (currentHour >= 18 && currentHour < 21) {
                return greetings[18];
            } else if (currentHour >= 21 && currentHour < 24) {
                return greetings[21];
            } else {
                return greetings[0];
            }
        }

        return '';
    }

    get userName(): string | undefined {
        const entry = this._dataService.getItems(termsOfUseKey);
        if ('display-name' in entry && entry['display-name']) {
            return entry['display-name'];
        }
        return undefined;
    }

    get overview() {
        return this._guideService.current()?.overview;
    }

    unitProgressPercent(view: UnitView) {
        return view.results ? view.results.progress.percent || 0 : 0;
    }

    pageProgressPercent(view: UnitView, page: Page) {
        return view.results ? view.results[page.id]?.progress.percent || 0 : 0;
    }
}
