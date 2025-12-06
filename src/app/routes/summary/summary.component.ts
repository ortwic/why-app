import { Component, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { derivedAsync } from 'ngxtension/derived-async';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { UnitService } from '../../services/content/unit.service';
import { Unit } from '../../models/unit.model';
import { Result, ResultValue } from '../../models/result.model';
import { InputDefinition, InputValue } from '../../models/content.model';
import { Page } from '../../models/page.model';
import { currentGuideId } from '../../services/common/common.service';
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
    
    private _units!: Unit[];
    private _results = derivedAsync(() => this._resultService.resultTree(currentGuideId()));
    readonly doneKey = pageReadTime;
    loading = true;

    async ngOnInit() {
        this._units = await this._unitService.dataPromise;

        this.loading = false;
    }

    get summary(): Result[] | undefined {
        return this._results();
    }

    title(index: number) {
        return this._units[index].title;
    }

    pages(index: number) {
        return this._units[index].pages;
    }
    
    data(result: ResultValue) {
        const data = (<Result>result).data;
        if (data && data[this.doneKey]) {
            return Object.keys(data).reduce((acc, key) => {
                acc[key] = data[key];
                return acc;
            }, {} as Record<string, InputValue>);
        }
        return null;
    }

    percent(result: ResultValue) {
        return (<Result>result).progress.percent;
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
