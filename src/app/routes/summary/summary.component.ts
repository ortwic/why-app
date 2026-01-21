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
import { isProgress, PageResults, Progress, ResultUnion, UnitResults } from '../../models/result.model';
import { InputDefinition, InputValue } from '../../models/content.model';
import { Page } from '../../models/page.model';
import { UserDataItems } from '../../models/user-data.model';
import { UserResultService } from '../../services/user/user-result.service';
import { PAGE_READ_TIME } from '../../services/user/user-data.service';
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
    
    private _unitViews = toSignal(this._unitService.getUnits()
        .pipe(
            tap(() => this.loading = false)), { initialValue: [] }
        );
    readonly doneKey = PAGE_READ_TIME;
    loading = true;

    get results(): UnitResults[] {
        return this._resultService.results();
    }

    title(index: number) {
        return this._unitViews()[index]?.title ?? '-';
    }

    pages(index: number): Page[] {
        return this._unitViews()[index]?.pages ?? [];
    }
    
    data(result: ResultUnion): Record<string, InputValue> | null {
        const items = result as UserDataItems<InputValue> | Progress;
        if (typeof items === 'object') {
            return Object.entries(items)
                .filter(([k, v]) => !isProgress(k, v))
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
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
