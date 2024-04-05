import { Component, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SettingsComponent } from '../settings/settings.component';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { GuideService } from '../../services/guide.service';
import { Guide } from '../../models/guide.model';
import { Result, ResultValue } from '../../models/result.model';
import { InputDefinition, InputValue } from '../../models/content.model';
import { Page } from '../../models/page.model';
import { CommonService } from '../../services/common.service';
import { UserResultService } from '../../services/user-result.service';
import { pageReadTime } from '../../services/user-data.service';

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
        SettingsComponent
    ],
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
})
export class SummaryComponent {
    private readonly _commonService = inject(CommonService);
    private readonly _guideService = inject(GuideService);
    private readonly _resultService = inject(UserResultService);
    
    private _resources: Record<string, unknown> = {};
    private _units!: Guide[];
    private _results!: Result[];
    readonly doneKey = pageReadTime;
    loading = true;

    async ngOnInit() {
        this._units = await this._guideService.dataPromise;
        this._results = await this._resultService.resultTree;
        this._resources = await this._commonService.getResources('start');

        this.loading = false;
    }

    get summary() {
        return this._results;
    }
    
    resource(key: string) {
        return this._resources[key];
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
