import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from '../../components/ui/loading/loading.component';
import { ProgressSpinnerComponent } from '../../components/ui/progress-spinner/progress-spinner.component';
import { termsOfUseId } from '../../guards/terms-of-use.guard';
import { CommonService, currentGuideId } from '../../services/common.service';
import { UnitService } from '../../services/unit.service';
import { UserDataService } from '../../services/user-data.service';
import { UserResultService } from '../../services/user-result.service';
import { Unit } from '../../models/unit.model';
import { Result } from '../../models/result.model';

@Component({
    selector: 'app-start',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        LoadingComponent,
        ProgressSpinnerComponent,
    ],
    templateUrl: './start.component.html',
    styleUrl: './start.component.scss',
})
export class StartComponent {
    private readonly _commonService = inject(CommonService);
    private readonly _unitService = inject(UnitService);
    private readonly _resultService = inject(UserResultService);
    private readonly _dataService = inject(UserDataService);
    
    private _resources: Record<string, unknown> = {};
    private _units!: Unit[];
    private _results!: Result[];    
    private _greeting!: string;
    private _userName!: string;
    loading = true;

    async ngOnInit() {
        this._units = await this._unitService.dataPromise;
        this._results = await this._resultService.resultTree(currentGuideId());
        
        this._resources = await this._commonService.getResources('start');
        this._userName = this.getUserName(this._resources['user-names'] as string[]);
        this.setGreeting(this._resources['greetings'] as Record<number, string>);

        this.loading = false;
    }

    private getUserName(defaultNames: string[]): string {
        const entry = this._dataService.getEntry(termsOfUseId);
        if ('display-name' in entry && entry['display-name']) {
            return entry['display-name'];
        }
        const randomIndex = Math.floor(Math.random() * defaultNames.length);
        return defaultNames[randomIndex];        
    }
    
    private setGreeting(greetings: Record<number, string>) {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            this._greeting = greetings[5];
        } else if (currentHour >= 12 && currentHour < 18) {
            this._greeting = greetings[12];
        } else if (currentHour >= 18 && currentHour < 21) {
            this._greeting = greetings[18];
        } else if (currentHour >= 21 && currentHour < 24) {
            this._greeting = greetings[21];
        } else {
            this._greeting = greetings[0];
        }
    }

    get units(): Unit[] {
        return this._units;
    }

    get userName(): string {
        return this._userName;
    }

    get greeting() {
        return this._greeting;
    }

    resource(key: string) {
        return this._resources[key];
    }

    unitProgressPercent(unitIndex: number) {
        return this._results ? this._results[unitIndex].progress.percent : 0;
    }

    pageProgressPercent(unitIndex: number, pageId: string) {
        return this._results ? (<Result>this._results[unitIndex][pageId]).progress.percent : 0;
    }
}
