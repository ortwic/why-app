import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, KeyValue } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { tap } from 'rxjs';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { UnitService } from '../../services/content/unit.service';
import { PageResults, ResultUnion, UnitResults } from '../../models/result.model';
import { InputDefinition, InputValue } from '../../models/content.model';
import { Page } from '../../models/page.model';
import { UserResultService } from '../../services/user/user-result.service';
import { pageReadTime } from '../../services/user/user-data.service';
import { UserDataComponent } from "../settings/user-data/user-data.component";
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
    selector: 'app-summary',
    standalone: true,
    imports: [
    CommonModule,
    MatAccordion,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    LoadingComponent,
    ProgressSpinnerComponent,
    UserDataComponent,
    TranslatePipe
],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
})
export class SummaryComponent {
    private readonly _unitService = inject(UnitService);
    private readonly _resultService = inject(UserResultService);
    
    private _unitViews = toSignal(this._unitService.viewData$.pipe(tap(() => this.loading = false)), { initialValue: [] });
    readonly doneKey = pageReadTime;
    loading = true;

    get results(): UnitResults[] {
        return this._resultService.results();
    }

    title(index: number) {
        return this._unitViews()[index]?.title ?? '-';
    }

    pages(index: number): Page[] {
        return this._unitViews()[index]?.pages() ?? [];
    }
    
    data(result: ResultUnion) {
        const items = (<PageResults>result)?.items;
        if (items && items[this.doneKey]) {
            return Object.keys(items).reduce((acc, key) => {
                acc[key] = items[key];
                return acc;
            }, {} as Record<string, InputValue>);
        }
        return null;
    }

    percent(result: ResultUnion) {
        return (<PageResults>result).progress.percent || 0;
    }

    caption(page: Page, id: string) {
        return page.content
            .filter(item => item.type === 'stepper')
            .flatMap(item => item.value as InputDefinition[])
            .find(item => item.value.id === id)?.value?.caption || id;
    }

    format(value: InputValue) {
        return Array.isArray(value)
            ? value.join(', ')
            : value;
    }

    doneAtLast(a: KeyValue<string, InputValue>) {
        return a.key.startsWith('__') ? 1 : -1;
    }
}
